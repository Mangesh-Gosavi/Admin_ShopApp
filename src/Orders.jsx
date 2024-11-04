import { useEffect } from 'react'
import './CSS/Order.css'
import Loader from '../src/Loader';
import { useState } from 'react';


function Orders() {
    const [userdata,setUserdata] = useState([])
    const [id,setId] = useState('')
    const [loading, setLoading] = useState(true);
    const [status,setStatus] = useState('')

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch("http://localhost:3001/orders", {
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

const update = async(e) =>{
    e.preventDefault();

    const data = {"id":id,"status":"Delivered"}
    try{
        const token = localStorage.getItem('token');
        console.log("Token retrieved:", token);
        const response = await fetch("http://localhost:3001/orderstatus",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data) 
            })
            if(response.ok){
                location.reload()
            }
    }
    catch(error){
        console.log(error);
    }
    }

  return (
    <>
    {loading ? (
       <Loader/>
    ) : (<div className='order'>
        <h3>Orders</h3>
        <h4>Update Order Status<input className='input' placeholder='Enter OrderId' onChange={(e)=>setId(e.target.value)} type='text' required/>
        <button className='submit' onClick={update} type='submit'>Delivered</button></h4>
        <table className='detail'>
            <tr>
                <th>OrderID</th>
                <th>UserEmail</th>
                <th>TotalAmount</th>
                <th>Payment</th>
                <th>Address</th>
                <th>BookedDate</th>
                <th>Status</th>
            </tr>
            {userdata.map((item)=>{
                return(
                    <tr>
                    <td>{item.orderid}</td>
                    <td>{item.useremail}</td>
                    <td>{item.totalamount}</td>
                    <td>{item.payment}</td>
                    <td>{item.address}</td>
                    <td>{item.bookeddate}</td>
                    <td>{item.status}</td>
                </tr>
                )
           
            })}
        </table>
    </div>)}
    </>
  )
}

export default Orders
