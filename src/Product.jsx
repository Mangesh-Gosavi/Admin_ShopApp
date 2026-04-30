import Popup from './Popup';
import "../src/CSS/Popup.css"
import { useEffect } from 'react'
import './CSS/Product.css'
import Loader from '../src/Loader';
import { useState } from 'react';
import API_BASE_URL from './config';

function Product() {
    const [productdata, setProductdata] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState('');


    const init = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await fetch(`${API_BASE_URL}/allproducts`, {
                method: "GET",
                headers:
                {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            const list = Array.isArray(data) ? data : (data?.products || data?.data || []);
            setProductdata(list);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        init();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const deleteproduct = async (id) => {
        const data = { "id": id };
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await fetch(`${API_BASE_URL}/deleteproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(error);
                setShowPopup(true);
                setPopupMessage(error.message);
                return;
            }
            await init();
            setShowPopup(true);
            setPopupMessage("Product deleted from Database");
        } catch (error) {
            console.error("Error:", error);
        }
    };



    return (
        <>
            {loading ? (
                <Loader />
            ) : (

                <div className="product-page" >
                    <h3 >All Products</h3>
                    {productdata.length === 0 && (
                        <p style={{ color: '#6b7184', marginTop: '40px' }}>No products to display.</p>
                    )}
                    <div className="product-cards">
                        {productdata.map((item) => {
                            return (
                                <div className="product-card" key={item.productid}>
                                    <div className="product-card-image">
                                        <img src={item.image} alt={item.product} loading="lazy" />
                                        {item.discount > 0 && (
                                            <span className="product-card-badge">{item.discount}% OFF</span>
                                        )}
                                    </div>
                                    <div className="product-card-content">
                                        <span className="product-card-id">#{item.productid}</span>
                                        <p className="product-card-brand">{item.brand}</p>
                                        <h4 className="product-card-title">{item.description}</h4>
                                        <div className="product-card-price-row">
                                            <span className="product-card-price">₹{item.price}</span>
                                        </div>
                                        <div className="product-card-meta">
                                            <span><strong>Size:</strong> {item.size}</span>
                                            <span><strong>Stock:</strong> {item.stock}</span>
                                        </div>
                                    </div>
                                    <button className="button" type="button" onClick={() => deleteproduct(item.productid)}>Delete</button>
                                </div>
                            );
                        })}
                    </div>
                    <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
                </div>
            )}
        </>

    )
}

export default Product
