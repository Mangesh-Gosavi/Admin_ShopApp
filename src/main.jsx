import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Users from './Users';
import Addprod from './Addprod';
import Product from './Product';
import Orderitem from './Items';
import Updatestock from './Stock';
import Login from './Login';
import Dashboard from './Chart';
import Ordersdetail from './Orders';
import Review from './Review';
import Signup from './Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/Users", element: <Users /> },
      { path: "/AddProduct", element: <Addprod /> },
      { path: "/Product", element: <Product /> },
      { path: "/Review", element: <Review /> },
      { path: "/Orderitem", element: <Orderitem /> },
      { path: "/Orderdetails", element: <Ordersdetail /> },
      { path: "/Updatestock", element: <Updatestock /> },
      { path: "/Dashboard", element: <Dashboard /> },
    ],

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
