import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let User = window.sessionStorage.getItem("asd");

    const [auth, setAuth] = useState(User ? JSON.parse(User) : "");
    const [codeList, setCodeList] = useState();

    return (
        <AppContext.Provider value={{ auth, setAuth, codeList, setCodeList }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;