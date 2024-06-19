import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import genAI from "../utils/geminiAi";
import { addGptMovieResult } from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";


const useHandleGptSearchClick = (searchText) => {
    const dispatch = useDispatch();

    // search a movie in tmdb
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query=' +
                movie + 
            '&include_adult=false&language=en-US&page=1', 
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    };

    const getHandleGptSearch = useCallback(async () => {
            const query = searchText?.current?.value?.trim();
            if (!query) {
                console.log("No search text provided");
                return;
            }
            console.log(query);
            // Make an API call to GPT API and get recommendations
        
            const safetySettings = [
                {
                  category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                  threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                  threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                  threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                  threshold: HarmBlockThreshold.BLOCK_NONE,
                },
              ];
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safetySettings });
            
            const gemQuery =
              "Act as a Movie Recommendation system and suggest some movies for the query : " +
              query +
              ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
         
            const result = await model.generateContent(gemQuery);
            const movies = result.response.text().split(",");
            const geminiMovies = movies.map(movie => movie.trim());
            console.log(geminiMovies);
        
            // for each movie we will now search the tmdb api and find the movie
            const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));
            // [Promise, Promise, Promise, Promise]
        
            const tmdbResults = await Promise.all(promiseArray);
            console.log(tmdbResults);
        
            dispatch(addGptMovieResult({movieNames: movies, movieResults: tmdbResults}));
          }, [dispatch, searchText]);

          return { getHandleGptSearch };
};

export default useHandleGptSearchClick; 

    