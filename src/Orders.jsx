import { useEffect } from 'react'
import './CSS/Order.css'
import Loader from '../src/Loader';
import { useState } from 'react';
import API_BASE_URL from './config';

function Orders() {
    const [userdata, setUserdata] = useState([])
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch(`${API_BASE_URL}/orders`, {
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

    const update = async (e) => {
        e.preventDefault();

        const data = { "id": id, "status": "Delivered" };
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await fetch(`${API_BASE_URL}/orderstatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                location.reload();
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="order-page">
                    <h3>Orders Details</h3>
                    <div className="order-input-section">
                        <h4>Update Order Status</h4>
                        <input
                            className="order-input"
                            placeholder="Enter OrderId"
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            required
                        />
                        <button className="order-button" onClick={update} type="submit">Delivered</button>
                    </div>

                    <div className="order-cards">
                        {userdata.map((item, index) => (
                            <div className="order-card" key={index}>
                                <div className="order-card-content">
                                    <h4><strong>Order ID:</strong> {item.orderid}</h4>
                                    <p><strong>User Email:</strong> {item.useremail}</p>
                                    <p><strong>Total Amount:</strong> ₹{item.totalamount}</p>
                                    <p><strong>Payment:</strong> {item.payment}</p>
                                    <p><strong>Address:</strong> {item.address}</p>
                                    <p><strong>Booked Date:</strong> {item.bookeddate}</p>
                                    <p><strong>Status:</strong> {item.status}</p>
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
