import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
    const { auth, setAuth } = useAuth()
    
    return (
        <>
            <h1>Welcome {auth.name} {auth.surname} to the dashboard</h1>
        </>
    );
}

export default Dashboard;