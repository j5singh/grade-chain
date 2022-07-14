import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Constants } from "../../config/constants";
import SkeletonCustom from "../../helpers/skeletoncustom";
import useAuth from "../../hooks/useAuth";

export function ProtectedRoute({allowedRoles, children} : {allowedRoles: string, children: ReactElement}) {
    const { isAuthenticated, auth } = useAuth();

    return (
        isAuthenticated && auth.roles.includes(allowedRoles)
            ? children
            : isAuthenticated === null
                ? <SkeletonCustom />
                : <Navigate to={Constants.AUTH_ROUTES.login} />
    )
}