import Popup from './Popup';
import "../src/CSS/Popup.css"
import './CSS/Stock.css'
import Loader from '../src/Loader';
import { useState, useEffect } from 'react';
import API_BASE_URL from './config';

function Updatestock() {
  const [id, setId] = useState('')
  const [size, setsize] = useState('')
  const [stock, setstock] = useState('')
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { "productid": id, "size": size, "stock": parseInt(stock) }
    try {
      const token = localStorage.getItem('token');
      console.log("Token retrieved:", token);
      const response = await fetch(`${API_BASE_URL}/updatestock`, {
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
      setPopupMessage("Product Stock updated")

    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='stock-container'>
          <div className='stock-product'>
            <h3>Add Product Stock</h3>
            <form className='stock-form' onSubmit={handleSubmit}>
              <label className='stock-data'>ID:<input className='stock-input' onChange={(e) => setId(e.target.value)} type='text' placeholder='Enter product ID' required /></label><br />
              <label className='stock-data'>Size:<input className='stock-input' onChange={(e) => setsize(e.target.value)} type='text' placeholder='ex small medium large xl or 28-42' required /></label><br />
              <label className='stock-data'>Stocks:<input className='stock-input' onChange={(e) => setstock(e.target.value)} type='number' required /></label><br />
              <button className='stock-submit' type='submit'>Update</button>
              <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Updatestock
