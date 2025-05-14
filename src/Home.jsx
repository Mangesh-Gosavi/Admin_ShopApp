import { useEffect, useState } from 'react';
import './CSS/Home.css';
import Loader from '../src/Loader';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="left">
            <Navigation />
          </div>
          <div className="right">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
