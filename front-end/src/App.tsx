import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import { Constants } from './config/constants';
import RoutesConfig from './config/routes';
import useAuth from './hooks/useAuth';

function App() {
  const { auth, verifyToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doVerifyToken = async () => {
      const result = await verifyToken();
      if(result.status === "ERROR") {
        navigate(Constants.AUTH_ROUTES.login)
      } else {
        if (auth.roles.includes("student"))
          navigate(Constants.STUDENT_ROUTES.dashboard, { replace: true })
        else
          navigate(Constants.TEACHER_ROUTES.dashboard, { replace: true })
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
