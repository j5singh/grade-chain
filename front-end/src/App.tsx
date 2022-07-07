import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import { ProtectedRoute } from './components/protectedroute/protectedroute';
import Register from './components/register';

function App() {
  const ROLES = {
    'dashboard': 'user',
    'admin': 'admin',
  }

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
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
  );
}

export default App;
