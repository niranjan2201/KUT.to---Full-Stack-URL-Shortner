import React from 'react'

export const ContextApi = React.createContext();

export const ContextProvider = ({children}) => {
    const getToken = localStorage.getItem("token") || null;
    const getUserData = localStorage.getItem("user");
    const getUser = getUserData && getUserData !== "undefined" ? JSON.parse(getUserData) : null;
    
    const [token, setToken] = React.useState(getToken);
    const [user, setUser] = React.useState(getUser);
    
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    
    const sendData = {token, setToken, user, setUser, logout};

    return <ContextApi.Provider value={sendData}>
                {children}
           </ContextApi.Provider>
    
}

export const useStoreContext = () => {
    const context = React.useContext(ContextApi);
    return context;
}

export default ContextApi;
