import { createContext, ReactNode, useState } from "react";

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

interface IAuthContext {
    auth: AuthProps;
    setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
}

const DefaultAuth: AuthProps = {
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
    const [auth, setAuth] = useState<AuthProps>(DefaultAuth);
    const values = { auth, setAuth };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;