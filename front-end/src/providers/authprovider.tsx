import { createContext, ReactNode, useState } from "react";
import User from "../models/user";

interface ChildProps {
    children?: ReactNode,
}

interface IAuthContext {
    auth: User;
    setAuth: React.Dispatch<React.SetStateAction<User>>;
}

const DefaultAuth: User = {
    name: "",
    surname: "",
    email: "",
    roles: "",
    token: "",
    password: ""
}

const AuthContext = createContext<IAuthContext>({
    auth: DefaultAuth,
    setAuth: () => {}
});

export const AuthProvider = ({ children }: ChildProps) => {
    const [auth, setAuth] = useState<User>(DefaultAuth);
    const values = { auth, setAuth };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;