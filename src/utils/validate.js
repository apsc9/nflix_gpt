
export const validateData = (email, password) => {
    //const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    //if(!isNameValid) return "Please enter a valid name";
    if (!isEmailValid) return "Email isn't valid" ;
    if (!isPasswordValid) return "Password isn't valid";

    return null ;
};

