import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import LogIn from "./LogIn";

const Body = () => {

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
    
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>)
};

export default Body;