import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard";
import { Grades } from "../components/grades";
import Login from "../components/login";
import { ProtectedRoute } from "../components/protectedroute/protectedroute";
import Register from "../components/register";
import { Results } from "../components/results/results";


function RoutesConfig() {
    const ROLES = {
        'dashboard': 'user',
        'admin': 'admin',
    }

    return (
        <Routes>
            <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={[ROLES.dashboard]}>
                    <Dashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/grades" element={
                <ProtectedRoute allowedRoles={[ROLES.dashboard]}>
                    <Grades />
                </ProtectedRoute>
            }/>
            <Route path="/results" element={
                <ProtectedRoute allowedRoles={[ROLES.dashboard]}>
                    <Results />
                </ProtectedRoute>
            }/>
            <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
        </Routes>
    )
}

export default RoutesConfig;