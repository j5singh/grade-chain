import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
                ?
                    <Box padding='6' boxShadow='lg'>
                        <SkeletonCircle size='10' />
                        <SkeletonText mt='4' noOfLines={4} spacing='4' />
                    </Box>
                : <Navigate to="/login" />
    )
}