import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<><h1>Page Not Found</h1></>}></Route>
      </Routes>
  );
}

export default App;
