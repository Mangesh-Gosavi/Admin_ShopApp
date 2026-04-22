import Popup from './Popup';
import "../src/CSS/Popup.css"
import './CSS/Addprod.css'
import Loader from '../src/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
import API_BASE_URL from './config';

function Addprod() {
  const [brand, setBrand] = useState('')
  const [product, setProduct] = useState('')
  const [bought, setBought] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('0')
  const [stock, setstock] = useState('')
  const [size, setsize] = useState('')
  const [description, setDiscription] = useState('')
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.url) {
        setImage(data.url);
        setImageUploaded(true);
      } else {
        setPopupMessage(data.message || 'Upload failed');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setPopupMessage('Upload failed');
      setShowPopup(true);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price > 1000) {
      setPrice(price * (5 / 100))
    }
    else {
      setPrice(price)
    }
    const data = { "image": image, "brand": brand, "product": product, "bought": parseInt(bought), "price": parseInt(price), "discount": parseInt(discount), "size": size, "stock": parseInt(stock), "description": description }
    try {
      const token = localStorage.getItem('token');
      console.log("Token retrieved:", token);
      const response = await fetch(`${API_BASE_URL}/productdetail`, {
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
      setPopupMessage("Product Added to Database")

    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='productcontainer'>
          <div className='product'>
            <h3>Enter The Product Details</h3>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-align'>
                <label className='title'>Image</label>
                {imageUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' , width: '95%' }}>
                    <input className='input' type='text' value={image} readOnly />
                    <button type='button' onClick={() => setShowImagePreview(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }} title='Preview image'>👁</button>
                  </div>
                ) : (
                  <>
                    <input
                      id='imageUploadInput'
                      type='file'
                      accept='image/png, image/jpeg'
                      style={{ display: 'none' }}
                      disabled={uploading}
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor='imageUploadInput'
                      className='input'
                      style={{ cursor: uploading ? 'not-allowed' : 'pointer', display: 'inline-block', textAlign: 'center' }}
                    >
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                  </>
                )}
              </div>
              <div className='form-align'><label className='title'>Brand</label><input className='input' onChange={(e) => setBrand(e.target.value)} type='text' required /></div>
              <div className='form-align'><label className='title'>Product </label><input className='input' onChange={(e) => setProduct(e.target.value)} type='text' placeholder='Ex Shirt,Tshirt,Saree,Salwar etc' required /></div>
              <div className='form-align'><label className='title'>Purchase </label><input className='input' onChange={(e) => setBought(e.target.value)} type='number' placeholder='Enter purchased price' required /></div>
              <div className='form-align'><label className='title'>Price </label><input className='input' onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Enter selling price' required /></div>
              <div className='form-align'><label className='title'>Discount </label><input className='input' onChange={(e) => setDiscount(e.target.value)} type='number' placeholder='Enter number only' required /></div>
              <div className='form-align'><label className='title'>Size </label><input className='input' onChange={(e) => setsize(e.target.value)} type='text' placeholder='ex small,medium,large,xl or 28-42' required /></div>
              <div className='form-align'> <label className='title'>Stocks </label><input className='input' onChange={(e) => setstock(e.target.value)} type='number' placeholder='Enter quantity of product' required /></div>
              <div className='form-align'><label className='title'>Description </label><input className='input' onChange={(e) => setDiscription(e.target.value)} type='text' required /></div>
              <button className='submit' type='submit'>Submit</button>
              <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
              {showImagePreview && (
                <div onClick={() => setShowImagePreview(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                  <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: '8px', padding: '16px', width: '50vw', height: '50vh', position: 'relative' }}>
                    <button onClick={() => setShowImagePreview(false)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                    <img src={image} alt='Uploaded preview' style={{ width: '48vw', height: '48vh', borderRadius: '4px' }} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Addprod
