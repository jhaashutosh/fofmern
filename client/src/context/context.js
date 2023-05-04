import { createContext, useContext, useState, useEffect } from "react";

export const FOFContext = createContext({});

export const useFOFContext = () => {
    return useContext(FOFContext);
}

export const FOFContextProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);

    const values = {
        // state --------------
        isLogin,
        setIsLogin,

        // functions-----------
    }

    return <FOFContext.Provider value={values}> {children} </FOFContext.Provider>
}