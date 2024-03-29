import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";
import { Constants } from "../config/constants";
import User from "../models/user";

interface ChildProps {
    children?: ReactNode,
}

interface IResponse {
    status: string,
    result_msg: string,
    result_data: User
}

interface IAuthContext {
    isAuthenticated: boolean | null,
    auth: User,
    verifyToken: () => Promise<IResponse>,
    doRegister: (name: string, surname: string, email: string, password: string) => Promise<IResponse>
    doLogin: (email: string, password: string) => Promise<IResponse>,
    doLogout: () => void
}

const DefaultAuth: User = {
    serialNumber: "",
    name: "",
    surname: "",
    email: "",
    roles: "",
    token: "",
    password: ""
}

const DefaultResponse: IResponse = {
    status: "",
    result_msg: "",
    result_data: DefaultAuth
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: null,
    auth: DefaultAuth,
    verifyToken: async () => DefaultResponse,
    doRegister: async () => DefaultResponse,
    doLogin: async () => DefaultResponse,
    doLogout: () => {}
});

export const AuthProvider = ({ children }: ChildProps) => {
    const [auth, setAuth] = useState<User>(DefaultAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    const toast = useToast()

    const verifyToken = async () => {
        const token = localStorage.getItem(Constants.COMPANY_KEY + '-token');
        if (!token) return {status: "ERROR", result_msg: "Token not found!", result_data: {}};

        const response = await fetch('/api/verifytoken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token
            }),
        })
        const data = await response.json()
        if(data.status !== "ERROR") {
            let parseObj: User = data.result_data
            setAuth(parseObj)
            setIsAuthenticated(true);
        } else {
            // Means that the token is expired
            toast({
                title: 'Login expired.',
                description: "Please proceed by relogging in!",
                status: 'error',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        return data;
    }

    const doRegister = async (name: string, surname: string, email: string, password: string) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password,
            }),
        })
        const data = await response.json();
        if (data.status !== "ERROR") {
            toast({
                title: 'Registered successfully. Please proceed by logging in!',
                status: 'info',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        return data;
    }

    const doLogin = async (email: string, password: string) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        const data = await response.json();
        if (data.status !== "ERROR") {
            let parseObj: User = data.result_data
            setAuth(parseObj)
            setIsAuthenticated(true);
            localStorage.setItem(Constants.COMPANY_KEY + '-token', parseObj.token);

            toast({
                title: 'Logged in successfully.',
                status: 'info',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        return data;
    }

    const doLogout = () => {
        setAuth(DefaultAuth);
        setIsAuthenticated(false);
        localStorage.removeItem(Constants.COMPANY_KEY + '-token')

        toast({
            title: 'Logged out successfully.',
            status: 'info',
            duration: 4500,
            isClosable: true,
            position: 'bottom-right'
        })
    }

    const values = { isAuthenticated, auth, verifyToken, doRegister, doLogin, doLogout };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;