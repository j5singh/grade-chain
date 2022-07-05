import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import AuthenticationService from './services/authentication.service';

function App() {
  const [isLoggedIn, setLogIn] = React.useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const user = AuthenticationService.getCurrentUser();
    setLogIn(user);
    
    if (isLoggedIn) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
  );
}

export default App;
