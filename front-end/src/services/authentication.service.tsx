import { Constants } from "../config/constants";

const getCurrentUser = () => {
    return localStorage.getItem(Constants.COMPANY_KEY + '-userinfo');
}

const setUserInfo = (info: string) => {
    localStorage.setItem(Constants.COMPANY_KEY + '-userinfo', info);
}

const AuthenticationService = {
    getCurrentUser,
    setUserInfo
}

export default AuthenticationService;