import { useEffect } from 'react'
import './CSS/Users.css'
import Loader from '../src/Loader';
import { useState } from 'react';
import API_BASE_URL from './config';

function Users() {
    const [loading, setLoading] = useState(true);
    const [userdata, setUserdata] = useState([])

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token);
                const response = await fetch(`${API_BASE_URL}/users`, {
                    method: "GET",
                    headers:
                    {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json()
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
                <div className="user">
                    <h3>Users</h3>
                    <div className="user-cards">
                        {userdata.map((item) => {
                            return (
                                <div className="user-card" key={item.id}>
                                    <div className="user-card-content">
                                        <h4><strong>Name:</strong>{item.name}</h4>
                                        <p><strong>ID:</strong> {item.id}</p>
                                        <p><strong>Phone:</strong> {item.phone}</p>
                                        <p><strong>Email:</strong> {item.email}</p>
                                        <p><strong>Date:</strong> {item.date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>

    )
}

export default Users
