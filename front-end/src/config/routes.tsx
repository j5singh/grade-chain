import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard";
import { Grades } from "../components/grades";
import Login from "../components/login";
import { ProtectedRoute } from "../components/protectedroute/protectedroute";
import Register from "../components/register";
import { Results } from "../components/results/results";

function RoutesConfig() {
    const ROLES = {
        'student': 'student',
        'admin': 'admin',
        'teacher': 'teacher'
    }

    return (
        <Routes>
            {/* Authentication Routes */}
            <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register/>} />
            </Route>
            {/* Student Routes */}
            <Route path="/student">
                <Route path="dashboard" element={
                    <ProtectedRoute allowedRoles={ROLES.student}>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="grades" element={
                    <ProtectedRoute allowedRoles={ROLES.student}>
                        <Grades />
                    </ProtectedRoute>
                }/>
                <Route path="results" element={
                    <ProtectedRoute allowedRoles={ROLES.student}>
                        <Results />
                    </ProtectedRoute>
                }/>
            </Route>
            {/* Teacher Routes */}
            <Route path="/teacher">
                <Route path="dashboard" element={
                    <ProtectedRoute allowedRoles={ROLES.teacher}>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="exambooking" element={
                    <ProtectedRoute allowedRoles={ROLES.teacher}>
                        <Grades />
                    </ProtectedRoute>
                }/>
            </Route>
            <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
        </Routes>
    )
}

export default RoutesConfig;