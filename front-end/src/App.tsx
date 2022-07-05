import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import AuthenticationService from './services/authentication.service';

interface Response {
  result_data: any,
  result_msg: string,
  status: string
}

function App() {
  const [isLoggedIn, setLogIn] = React.useState<Response | null>(null);
  const navigate = useNavigate()

  const user: Response = AuthenticationService.getCurrentUser();
  setLogIn(user);

  useEffect(() => {   
    if (isLoggedIn?.status == "ERROR") {
      navigate("/login")
    } else {
      navigate("/")
    }
  }, [isLoggedIn])

  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
  );
}

export default App;
