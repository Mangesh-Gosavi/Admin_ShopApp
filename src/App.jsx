import { useEffect, useState } from 'react';
import './CSS/App.css'
import Header from './Header'
import Loader from '../src/Loader';
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000); 

  }, []);

  return (
    <>
    <div className='header'><Header/></div>
    {loading ? (
        <Loader/>
      ) : (<div><div className='center'>
       <div className='display'><Navigation/></div>
        <div className='right'><Outlet/></div>
    </div>
    <div className='left'>
       <div className='display'><Navigation/></div>
        <div className='right'><Outlet/></div>
    </div></div>)}
    </>
  )
}

export default App
