import { useContext } from "react";
import AuthContext from "../providers/authprovider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;