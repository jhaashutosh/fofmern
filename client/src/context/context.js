import { createContext, useContext, useState } from "react";

export const FOFContext = createContext({});

export const useFOFContext = () => {
    return useContext(FOFContext);
}

const initialClassmates = {
    LKG: [], UKG: [], I: [], II: [], III: [], IV: [], V: [], VI: [], VII: [], VIII: [], IX: [], X: [], XI: [], XII: [],
};

export const FOFContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Variable isHomePage Loaded from Home.js
    const [isHomePageLoaded, setIsHomePageLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [classmates, setClassmates] = useState(initialClassmates);
    const [currentPath, setCurrentPath] = useState("");

    const values = {
        // state --------------
        isLoggedIn, setIsLoggedIn,
        isHomePageLoaded, setIsHomePageLoaded,
        userInfo, setUserInfo,
        classmates, setClassmates,
        currentPath, setCurrentPath,

        // functions-----------
    }

    return <FOFContext.Provider value={values}> {children} </FOFContext.Provider>
}