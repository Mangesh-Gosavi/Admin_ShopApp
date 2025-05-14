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

    useEffect(() => {
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
            setShowPopup(true);
            setPopupMessage("Product deleted from Database");

            setProductdata(productdata);
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
                    <div className="product-cards">
                        {productdata.map((item) => {
                            return (
                                <div className="product-card" key={item.id}>
                                    <div className="product-card-content">
                                        <h4><strong>ID:</strong> {item._id}</h4>
                                        <p><strong>Brand:</strong> {item.brand}</p>
                                        <p><strong>Product:</strong> {item.product}</p>
                                        <p><strong>Price:</strong> ₹{item.price}</p>
                                        <p><strong>Size:</strong> {item.size}</p>
                                        <p><strong>Stock:</strong> {item.stocks}</p>
                                        <p><strong>Discount:</strong> {item.discount}%</p>
                                    </div>
                                    <button className="button" type="button" onClick={() => deleteproduct(item._id)}>Delete</button>
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
