import Header from "./Header";

const LogIn = () => {
  return (
    <div>
        <Header />
        <div className="absolute">
            <img 
                src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_small.jpg"
                alt="logo"
            />
        </div>
        <form className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-36 mx-auto text-white right-0 left-0 rounded-lg">
            <h1 className="font-bold text-3xl py-4">Sign In</h1>
            <input 
                type="text" 
                placeholder="Email Address" 
                className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
            />
            <button className="p-4 my-6 bg-red-600 w-full rounded-lg" >
                Sign In
            </button>
        </form>
    </div>
  )};

export default LogIn