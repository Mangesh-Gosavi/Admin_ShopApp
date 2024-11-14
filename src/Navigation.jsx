import { Link } from "react-router-dom"
import "./CSS/Navigation.css"

function Navigation(){

    return (
      <div className="navigation">
        <ul className="list">
          <Link className='link' to="/Home/dashboard"><li>Dashboard</li></Link>
          <Link className='link' to="/Home/users"><li>Users</li></Link>
          <Link className='link' to="/Home/addProduct"><li>Add Product</li></Link>
          <Link className='link' to="/Home/product"><li>Display Product</li></Link>
          <Link className='link' to="/Home/review"><li>Product Reviews</li></Link>
          <Link className='link' to="/Home/updatestock"><li>Update Product Stock</li></Link>
          <Link className='link' to="/Home/orderitem"><li>Ordered Items</li></Link>
          <Link className='link' to="/Home/orderdetails"><li>Orders Details</li></Link>
        </ul>
      </div>
    )
}

export default Navigation
