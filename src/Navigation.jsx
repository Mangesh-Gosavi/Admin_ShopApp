import { Link } from "react-router-dom"
import "./CSS/Navigation.css"

function Navigation(){

    return (
      <div className="navigation">
        <ul className="list">
          <Link className='link' to="/Dashboard"><li>Dashboard</li></Link>
          <Link className='link' to="/Users"><li>Users</li></Link>
          <Link className='link' to="/AddProduct"><li>Add Product</li></Link>
          <Link className='link' to="/Product"><li>Display Product</li></Link>
          <Link className='link' to="/Review"><li>Product Reviews</li></Link>
          <Link className='link' to="/Updatestock"><li>Update Product Stock</li></Link>
          <Link className='link' to="/Orderitem"><li>Ordered Items</li></Link>
          <Link className='link' to="/Orderdetails"><li>Orders Details</li></Link>
        </ul>
      </div>
    )
}

export default Navigation