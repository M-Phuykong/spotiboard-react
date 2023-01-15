import React, { createContext, useContext, useState, ReactNode} from "react";

interface Props {
    children ?: ReactNode
}

interface AuthContextInterface{
    access_token: string | null;
    // refresh_token: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}


const AuthContextState = {
    access_token: null,
    setAccessToken: () => {}
}



const AuthContext = createContext<AuthContextInterface>(AuthContextState);

export function AuthProvider ({ children } : Props){

    const [access_token, setAccessToken] = useState<string | null>(null)
    // const [refresh_token, setRefreshToken] = useState("")

    return (
        <AuthContext.Provider
        value={{access_token, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext)
}
