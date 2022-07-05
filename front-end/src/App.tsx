import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import AuthenticationService from './services/authentication.service';

function App() {
  const [isLoggedIn, setLogIn] = React.useState<string | null>(null);

  useEffect(() => {
    const user = AuthenticationService.getCurrentUser();
    setLogIn(user);
  }, [isLoggedIn])

  return ( isLoggedIn ?
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
    </>
    :
    <>
      <Navigate to="/login" replace />
    </>
  );
}

export default App;
