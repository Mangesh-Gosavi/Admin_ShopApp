import Popup from './Popup'; 
import "../src/CSS/Popup.css"
import './CSS/Addprod.css'
import Loader from '../src/Loader';
import { useState } from 'react';
import { useEffect } from 'react';


function Addprod() {
    const [brand,setBrand] = useState('')
    const [product,setProduct] = useState('')
    const [bought,setBought] = useState('')
    const [price,setPrice] = useState('')
    const [discount,setDiscount] = useState('0')
    const [stock,setstock] = useState('')
    const [size,setsize] = useState('')
    const [description,setDiscription] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');

    useEffect(()=>{
      setTimeout(() => {
        setLoading(false); 
      }, 2000); 
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(price > 1000){
          setPrice(price*(5/100)) 
        }
        else{
          setPrice(price)
        }
        const data = {"image":image,"brand":brand,"product":product,"bought":parseInt(bought),"price":parseInt(price),"discount":parseInt(discount),"size":size,"stock":parseInt(stock),"description":description}
                try {
                    const response = await fetch("http://localhost:3000/productdetail", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
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
                  setPopupMessage("Product Added to Database")
                  location.reload()
                  
                } catch (error) {
                    console.error("Error:", error);
                }
              }


  return (
    <>
    {loading ? (
        <Loader/>
    ) : (<div className='product'>
        <h3>Enter The Product Details</h3>
        <form className='form' onSubmit={handleSubmit}>
                <label className='data'>Image:<input className='input' onChange={(e)=>setImage(e.target.value)} type='text' placeholder='Enter image url' required/></label><br/>
                <label className='data'>Brand:<input className='input' onChange={(e)=>setBrand(e.target.value)} type='text' required/></label><br/>
                <label className='data'>Product:<input className='input' onChange={(e)=>setProduct(e.target.value)} type='text' placeholder='Ex Shirt,Tshirt,Saree,Salwar etc' required/></label><br/>
                <label className='data'>Purchase:<input className='input' onChange={(e)=>setBought(e.target.value)} type='number' required/></label><br/>
                <label className='data'>Price:<input className='input' onChange={(e)=>setPrice(e.target.value)} type='number' required/></label><br/>
                <label className='data'>Discount:<input className='input' onChange={(e)=>setDiscount(e.target.value)} type='number' placeholder='Enter number only' required/></label><br/>
                <label className='data'>Size:<input className='input' onChange={(e)=>setsize(e.target.value)} type='text' placeholder='ex small,medium,large,xl or 28-42' required/></label><br/>
                <label className='data'>Stocks:<input className='input' onChange={(e)=>setstock(e.target.value)} type='number' required/></label><br/>
                <label className='data'>Description:<input className='input' onChange={(e)=>setDiscription(e.target.value)} type='text' required/></label><br/>
                <button className='submit' type='submit'>Submit</button>
                <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
        </form>         
    </div>)}
    </>
  )
}

export default Addprod
