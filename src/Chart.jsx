import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList }  from 'recharts';
import Loader from '../src/Loader';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await fetch("http://localhost:3001/data", {
                method: "GET",
                headers: 
                {                        
                  "Accept": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json()
            console.log(data);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();

    setTimeout(() => {
      setLoading(false); 
    }, 2000); 
  }, []);

  return (
    <>
    {loading ? (
      <Loader/>
    ) : (<div style={{ textAlign:"center"}}>
      <div style={{ color: "#1f285e",width:"max-content", display: "flex",justifyContent: "center", alignItems: "center" }}>
      </div>
      <h2>Product Profit/Loss</h2>
      <BarChart width={500} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productid" />
        <YAxis />
        <Legend />
        <Bar dataKey="total_boughtprice" stackId="a" fill="#514adb" name="Total Bought Price">
          <LabelList dataKey="total_boughtprice" position="top" fontSize={14} />
        </Bar>
        <Bar dataKey="total_price" stackId="a" fill="#2ed16d" name="Total Profit">
          <LabelList dataKey="total_price" position="top" fontSize={14} />
        </Bar>
      </BarChart>
    </div>)}
    </>
  );
};

export default Dashboard;
