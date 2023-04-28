import { useLoaderData, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { useEffect } from 'react';

function LoginPage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (sessionInfo.valid) {
      navigate("/home");
    }
  }, [sessionInfo, navigate]);

  return (
    <div className="login-page">
      <h1 className="login-title">Drømtorp Aktiviteter</h1>

      <div className="login-content">
        <h2 className="login-title">Logg inn!</h2>
        
      </div>
    </div>
  );
}

export default LoginPage;
