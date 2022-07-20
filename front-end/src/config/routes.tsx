import { Navigate, Route, Routes } from "react-router-dom";
import Booking from "../components/booking/booking";
import Dashboard from "../components/dashboard";
import { Grades } from "../components/grades";
import Login from "../components/login";
import { ProtectedRoute } from "../components/protectedroute/protectedroute";
import Register from "../components/register";
import { Results } from "../components/results/results";
import TeacherDashboard from "../components/teacherdash";
import TeacherExams from "../components/teacherexams/teacherexams";
import Verbalisation from "../components/verbalisation/verbalisation";
import NotFound from "../helpers/pagenotfound";

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
                <Route path="booking" element={
                    <ProtectedRoute allowedRoles={ROLES.student}>
                        <Booking />
                    </ProtectedRoute>
                }/>
            </Route>
            {/* Teacher Routes */}
            <Route path="/teacher">
                <Route path="dashboard" element={
                    <ProtectedRoute allowedRoles={ROLES.teacher}>
                        <TeacherDashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="yourexams" element={
                    <ProtectedRoute allowedRoles={ROLES.teacher}>
                        <TeacherExams />
                    </ProtectedRoute>
                }/>
                <Route path="verbalisation" element={
                    <ProtectedRoute allowedRoles={ROLES.teacher}>
                        <Verbalisation />
                    </ProtectedRoute>
                }/>
            </Route>
            <Route path="notfound" element={<NotFound />}/>
            <Route path="*" element={<Navigate to={"/notfound"} />}></Route>
        </Routes>
    )
}

export default RoutesConfig;