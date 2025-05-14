import { useEffect } from 'react'
import Loader from '../src/Loader';
import './CSS/Items.css'
import { useState } from 'react';
import API_BASE_URL from './config';

function Orders() {
    const [userdata, setUserdata] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch(`${API_BASE_URL}/items`, {
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
                <Loader />
            ) : (
                <div className="item-page">
                    <h3>Ordered Items</h3>
                    <div className="item-cards">
                        {userdata.map((item, index) => (
                            <div className="item-card" key={index}>
                                <div className="item-card-content">
                                    <h4><strong>Order ID:</strong> {item.orderid}</h4>
                                    <p><strong>User Email:</strong> {item.useremail}</p>
                                    <p><strong>Product ID:</strong> {item.productid}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>

    )
}

export default Orders
