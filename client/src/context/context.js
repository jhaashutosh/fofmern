import { createContext, useContext, useState } from "react";

export const FOFContext = createContext({});

export const useFOFContext = () => {
    return useContext(FOFContext);
}

export const FOFContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentPath, setCurrentPath] = useState("");

    const values = {
        // state --------------
        isLoggedIn, setIsLoggedIn,
        currentPath, setCurrentPath,

        // functions-----------
    }

    return <FOFContext.Provider value={values}> {children} </FOFContext.Provider>
}