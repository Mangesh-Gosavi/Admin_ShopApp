import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Home";
import Users from "../src/Users";
import Addprod from "../src/Addprod";
import Product from "../src/Product";
import Orderitem from "../src/Items";
import Updatestock from "../src/Stock";
import Login from "../src/Login";
import Dashboard from "../src/Chart";
import Ordersdetail from "../src/Orders";
import Review from "../src/Review";
import Signup from "../src/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Home Route with Nested Routes */}
        <Route path="/home" element={<Home />}>
          <Route path="users" element={<Users />} />
          <Route path="addproduct" element={<Addprod />} />
          <Route path="product" element={<Product />} />
          <Route path="review" element={<Review />} />
          <Route path="orderitem" element={<Orderitem />} />
          <Route path="orderdetails" element={<Ordersdetail />} />
          <Route path="updatestock" element={<Updatestock />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
