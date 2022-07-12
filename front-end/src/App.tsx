import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import RoutesConfig from './config/routes';
import useAuth from './hooks/useAuth';

function App() {
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
    <Layout>
      <RoutesConfig />
    </Layout>
  );
}

export default App;
