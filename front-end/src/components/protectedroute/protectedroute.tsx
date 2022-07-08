import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SkeletonCustom from "../../helpers/skeletoncustom";
import useAuth from "../../hooks/useAuth";

export function ProtectedRoute({allowedRoles, children} : {allowedRoles: {}, children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log(isAuthenticated, "im run once!")
    })

    return (
        isAuthenticated
            ? children
            : isAuthenticated === null
                ? <SkeletonCustom />
                : <Navigate to="/login" />
    )
}