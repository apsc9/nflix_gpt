import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Browse from "./Browse";
import LogIn from "./LogIn";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/browse",
        element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ 
          uid: uid, 
          email: email, 
          displayName: displayName, 
          photoURL: photoURL, 
        }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
    
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>)
};

export default Body;