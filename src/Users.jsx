import { useEffect } from 'react'
import './CSS/Users.css'
import Loader from '../src/Loader';
import { useState } from 'react';


function Users() {
    const [loading, setLoading] = useState(true);
    const [userdata,setUserdata] = useState([])

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch("http://localhost:3001/users", {
                    method: "GET",
                    headers: 
                    {                        
                      "Accept": "application/json",
                      "Authorization": `Bearer ${token}`
                    }
                });
    
                const data = await response.json()
                console.log(data);
                setUserdata(data);
            } catch (error) {
                console.error(error);
            }
        }
        init();

        setTimeout(() => {
            setLoading(false); 
          }, 2000); 

    }, []);


  return (
    <>
    {loading ? (
        <Loader/>
      ) : (<div className='user'>
        <h3>Users</h3>
        <table className='customers'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
            </tr>
            {userdata.map((item)=>{
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.date}</td>
                </tr>
                )
           
            })}
        </table>
    </div>)}
    </>
  )
}

export default Users
