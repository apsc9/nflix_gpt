import Header from "./Header";
import { useState, useRef } from "react";
import { validateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const LogIn = () => {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleButtonClick = () => {
    const msg = validateData(email.current.value, password.current.value);
    setErrMessage(msg);
    if(msg) return;

    // Sign Up/ Sign In Logic
    if (!isSignedIn){
        // SignUp Logic
        createUserWithEmailAndPassword(
            auth, 
            email.current.value, 
            password.current.value
        )
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value, 
                photoURL: "https://as2.ftcdn.net/v2/jpg/01/75/59/71/1000_F_175597149_OQqkWaHHMhFq1Z05zJOKLDLPFPBQGyNV.jpg"
              })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                    addUser({ 
                        uid: uid, 
                        email: email, 
                        displayName: displayName, 
                        photoURL: photoURL, 
                    })
                );
                navigate("/browse");
              })
              .catch((error) => {
                setErrMessage(error.message)
              });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMessage(errorCode + " : " + errorMessage);
        });
    }
    else {
        // Sign In Logic 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value )
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            navigate("/browse");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMessage(errorCode + " : " + errorMessage);
        });
    }
  };

  return (
    <div>
        <Header />
        <div className="absolute">
            <img 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_small.jpg"
                alt="logo"
            />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-36 mx-auto text-white right-0 left-0 rounded-lg">
            <h1 className="font-bold text-3xl py-4">
                {isSignedIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignedIn && <input 
                ref={name}
                type="text" 
                placeholder="Name" 
                className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
            />}
            <input 
                ref={email}
                type="text" 
                placeholder="Email Address" 
                className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
            />
            <input 
                ref={password}
                type="password" 
                placeholder="Password" 
                className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
            />
            <p className="text-red-500 text-lg py-2">{errMessage}</p>
            <button className="p-4 my-6 bg-red-600 w-full rounded-lg" 
            onClick={handleButtonClick}>
                {isSignedIn ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-6 cursor-pointer" >
                {!isSignedIn ? (
                    <span>
                        Already a User?{" "}
                        <span className="hover:underline hover:text-gray-700" onClick={toggleSignIn}>
                            Sign In Now
                        </span>
                    </span>
                    ) : (
                    <span>
                        New to Netflix?{" "}
                        <span className="hover:underline hover:text-gray-500" onClick={toggleSignIn}>
                            Sign Up Now
                        </span>
                    </span>
                )} 
            </p>
        </form>
    </div>
  )};

export default LogIn