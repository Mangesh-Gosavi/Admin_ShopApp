import { useEffect, useState } from 'react';
import './CSS/Order.css';
import Loader from '../src/Loader';
import API_BASE_URL from './config';
import Popup from './Popup'; 


function Orders() {
    const [userdata, setUserdata] = useState([]);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const init = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: "GET",
                headers: {
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
    };

    useEffect(() => {
        const fetchData = async () => {
            await init();
            setTimeout(() => setLoading(false), 2000);
        };
        fetchData();
    }, []);

    const update = async (e) => {
        e.preventDefault();
        const data = { id: id, status: "Delivered" };
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/orderstatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setShowPopup(true);
                setPopupMessage("Marked as Delivered");
                await init(); // reload data
            } else {
                const errorData = await response.json();
                console.error("Error updating order:", errorData.message);
                alert("Error: " + errorData.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

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
    );
}

export default Orders;
