import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function ProtectedRoute({allowedRoles, children} : {allowedRoles: {}, children: ReactElement}) {
    const { auth } = useAuth();

    return auth?.token ? children : <Navigate to="/login" />
}