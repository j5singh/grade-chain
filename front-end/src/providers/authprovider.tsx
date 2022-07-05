import { createContext, ReactNode, useState } from "react";

const AuthContext = createContext({});

interface ChildProps {
    children?: ReactNode,
}

interface AuthProps {
    name: string,
    surname: string,
    email: string,
    roles: string,
    token: string,
    password: string
}

export const AuthProvider = ({ children }: ChildProps) => {
    const [auth, setAuth] = useState<AuthProps>();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;