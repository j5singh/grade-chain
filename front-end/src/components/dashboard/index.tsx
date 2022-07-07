import useAuth from "../../hooks/useAuth";

function Dashboard() {
    const { auth } = useAuth()
    
    return (
        <>
            <h1>Welcome {auth.name} {auth.surname} to the dashboard</h1>
        </>
    );
}

export default Dashboard;