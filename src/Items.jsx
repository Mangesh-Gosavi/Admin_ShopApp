import { useEffect } from 'react'
import Loader from '../src/Loader';
import './CSS/Items.css'
import { useState } from 'react';


function Orders() {
    const [userdata,setUserdata] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch("http://localhost:3001/items", {
                    method: "GET",
                    headers: 
                    {                        
                      "Accept": "application/json",
                      "Authorization": `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
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
    ) : (<div className='item'>
        <h3>Ordered Items</h3>
        <table className='detail'>
            <tr>
                <th>OrderID</th>
                <th>UserEmail</th>
                <th>ProductId</th>
                <th>Quantity</th>
            </tr>
            {userdata.map((item)=>{
                return(
                    <tr>
                    <td>{item.orderid}</td>
                    <td>{item.useremail}</td>
                    <td>{item.productid}</td>
                    <td>{item.quantity}</td>
                </tr>
                )
           
            })}
        </table>
    </div>)}
    </>
  )
}

export default Orders
