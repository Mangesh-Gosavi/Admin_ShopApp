import Popup from './Popup'; 
import "../src/CSS/Popup.css"
import { Link } from 'react-router-dom'
import '../src/CSS/Login.css'
import Loader from '../src/Loader';
import { CircleUser } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

  const[email,setEmail]  = useState('');
  const[password,setPassword]  = useState('');
  const data ={"email" : email,"password" : password}
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(data);

    const token = localStorage.getItem('token');
    console.log("Token retrieved:", token);
    const url = new URL("http://localhost:3001/Adminlogin");
    url.searchParams.append("data", jsonData);

    if(email.length != 0 &&  password.length != 0){
      try {

          const response = await fetch(url, {
              method: "GET",
              headers: 
              {                        
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
              }
          })

          if (!response.ok) {
            const error = await response.json()
            console.error(error);
            setShowPopup(true);
            setPopupMessage(error.message)
            return;
          }
        
          const data = await response.json();
          console.log(data);
          localStorage.setItem('token', data.token); 
          navigate("/Dashboard");
      } catch (error) {
          console.error("Error:", error);
      }
    }
    else{
       alert("Please Fill All The Details!")
    }
};

useEffect(() => {
  setTimeout(() => {
    setLoading(false); 
  }, 2000); 

  const handleBackButton = (event) => {
    event.preventDefault();
    window.history.forward(); 
  };

  window.history.pushState(null, null, window.location.pathname);
  window.addEventListener('popstate', handleBackButton);

  return () => {
    window.removeEventListener('popstate', handleBackButton);
  };
  
}, []);

const closePopup = () => {
  setShowPopup(false);
  setPopupMessage('');
};

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (<div  className='center-body'>
          <form className='form' onSubmit={(e)=>{handleSubmit(e)}}>
            <h1>Pooja Collection</h1>
            <h1>Admin Login</h1><br/>
            <div className='content'><CircleUser/><input id='name' className="uinput" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} require/></div><br/>
            <div className='content'><KeyRound/><input id='password' className="uinput" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} require/></div><br/>
            <button className='loginbtn' type="submit">Submit</button><br/>
            <Link className='link' to=''><h5>Forgot Password </h5></Link>
            <h5>Create a admin acoount? <Link className='link' to="/Signup">Signup</Link></h5>
            <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
          </form>
        </div>)
     }
    </>
        )
}

export default Login
