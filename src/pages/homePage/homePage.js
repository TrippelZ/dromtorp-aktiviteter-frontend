import { useLoaderData, useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './homePage.css';
import { useEffect } from 'react';

function HomePage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (!sessionInfo.valid) {
      navigate("/login");
    }
  }, [sessionInfo, navigate]);

  return (
    <>
    <Menu />

    <div className="content default-sidebar-margin">
      <h2 className="content-title">Drømtorp Aktiviteter!</h2>
    </div>
    </>
  );
}

export default HomePage;
