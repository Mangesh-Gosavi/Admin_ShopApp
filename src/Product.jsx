import Popup from './Popup'; 
import "../src/CSS/Popup.css"
import { useEffect } from 'react'
import './CSS/Product.css'
import Loader from '../src/Loader';
import { useState } from 'react';


function Product() {
    const [productdata,setProductdata] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch("http://localhost:3001/allproducts", {
                    method: "GET",
                    headers: 
                    {                        
                      "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
                console.log(data);
                setProductdata(data);
            } catch (error) {
                console.error(error);
            }
        }
        init();

        setTimeout(() => {
            setLoading(false); 
          }, 2000); 
    }, []);

    const deleteproduct = async (id) => {
        const data = {"productid":parseInt(id)}
                try {
                    const token = localStorage.getItem('token');
                    console.log("Token retrieved:", token);
                    const response = await fetch("http://localhost:3001/deleteproduct", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    });
                    
                  if (!response.ok) {
                    const error = await response.json()
                    console.error(error);
                    setShowPopup(true);
                    setPopupMessage(error.message)
                    return;
                  }
                  setShowPopup(true);
                  setPopupMessage("Product deleted from Database")
                  
                } catch (error) {
                    console.error("Error:", error);
                }
              }


  return (
    <>
    {loading ? (
        <Loader/>
    ) : (<div className='product'>
        <h3>All Products</h3>
        <table className='productdata'>
            <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Product</th>
                <th>Price</th>
                <th>Size</th>
                <th>Stock</th>
                <th>Discount</th>
            </tr>
            {productdata.map((item)=>{
                return(
                    <tr>
                    <td setId>{item.productid}</td>
                    <td>{item.brand}</td>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.size}</td>
                    <td>{item.stock}</td>
                    <td>{item.discount}</td>
                    <button class="button" type='button' onClick={()=>{deleteproduct(item.productid)}}>Delete</button>
                </tr>
                )
           
            })}
        </table>
        <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
    </div>)}
    </>
  )
}

export default Product
