import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import { Grades } from './components/grades';
import Login from './components/login';
import { ProtectedRoute } from './components/protectedroute/protectedroute';
import Register from './components/register';
import useAuth from './hooks/useAuth';

function App() {
  const ROLES = {
    'dashboard': 'user',
    'admin': 'admin',
  }

  const { verifyToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doVerifyToken = async () => {
      const result = await verifyToken();
      if(result.status === "ERROR") {
        navigate("/login")
      } else {
        navigate("/dashboard", { replace: true })
      }
    }

    doVerifyToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <Routes>
        <Route
          path="/dashboard"
          element={
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
        } />
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
  );
}

export default App;
