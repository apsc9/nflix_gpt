import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useEffect, useRef } from "react";
import useHandleGptSearchClick from "../hooks/useHandleGPTSearchClick";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const { getHandleGptSearch } = useHandleGptSearchClick(searchText);

  useEffect(() => {
    const query = searchText.current?.value?.trim();
    if (query) {
      getHandleGptSearch();
    }
  }, [getHandleGptSearch]);

  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center">
        <form 
            className="w-full md:w-1/2 bg-black grid grid-cols-12"
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                ref={searchText}
                type="text"
                className="p-4 m-4 col-span-9 rounded-lg"
                placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button 
                className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
                onClick={getHandleGptSearch}
            >
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar;