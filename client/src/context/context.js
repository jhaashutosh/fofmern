import { createContext, useContext, useState} from "react";

export const FOFContext = createContext({});

export const useFOFContext = () => {
    return useContext(FOFContext);
}

export const FOFContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const values = {
        // state --------------
        isLoggedIn, setIsLoggedIn,

        // functions-----------
    }

    return <FOFContext.Provider value={values}> {children} </FOFContext.Provider>
}