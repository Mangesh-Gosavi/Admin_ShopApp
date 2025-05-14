import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CSS/Navigation.css";
import API_BASE_URL from './config';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    console.log("Token retrieved:", token);
    await fetch(`${API_BASE_URL}/logout`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    localStorage.removeItem('token');
    closeNav();
    navigate("/");
  };

  return (
    <>
      <div className="nav-toggle-btn" onClick={toggleNav}>
        ☰
      </div>
      <div className={`navigation ${isOpen ? "active" : ""}`}>
        <ul className="list">
          <Link className="link" to="/home/dashboard" onClick={closeNav}><li>Dashboard</li></Link>
          <Link className="link" to="/home/users" onClick={closeNav}><li>Users</li></Link>
          <Link className="link" to="/home/addProduct" onClick={closeNav}><li>Add Product</li></Link>
          <Link className="link" to="/home/product" onClick={closeNav}><li>Display Product</li></Link>
          <Link className="link" to="/home/review" onClick={closeNav}><li>Product Reviews</li></Link>
          <Link className="link" to="/home/updatestock" onClick={closeNav}><li>Update Product Stock</li></Link>
          <Link className="link" to="/home/orderitem" onClick={closeNav}><li>Ordered Items</li></Link>
          <Link className="link" to="/home/orderdetails" onClick={closeNav}><li>Orders Details</li></Link>
          <Link className="link"  onClick={closeNav}><li onClick={handleLogout}>Logout</li></Link>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
