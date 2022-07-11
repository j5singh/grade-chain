import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import SkeletonCustom from "../../helpers/skeletoncustom";
import useAuth from "../../hooks/useAuth";

export function ProtectedRoute({allowedRoles, children} : {allowedRoles: {}, children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated
            ? children
            : isAuthenticated === null
                ? <SkeletonCustom />
                : <Navigate to="/login" />
    )
}