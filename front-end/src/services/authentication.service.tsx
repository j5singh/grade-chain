import { json } from "stream/consumers";
import { Constants } from "../config/constants";

const getCurrentUser = () => {
    const token = localStorage.getItem(Constants.COMPANY_KEY + '-token');
    if (token) {
        fetch('/api/verifytoken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token
            }),
        })
        .then(response => response.json())
        .then(data => {
            return JSON.stringify(data);
        });
    }
    return {status: "ERROR", result_msg: "Token not found!", result_data: {}};
}

const setUserInfo = (info: string) => {
    localStorage.setItem(Constants.COMPANY_KEY + '-token', info);
}

const AuthenticationService = {
    getCurrentUser,
    setUserInfo
}

export default AuthenticationService;