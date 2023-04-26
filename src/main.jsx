import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './component/Shop/Shop';
import Home from './component/Layout/Home';
import Order from './component/Order/Order';
import Inventory from './component/Inventory/Inventory';
import Login from './component/Login/Login';
import cartProductsLoader from './Loaders/cartProductsLoader';
import Checkout from './component/Checkout/Checkout';
import SignUp from './component/SignUp/signUp';
import AuthProviders from './component/Providers/AuthProviders';
import PrivateRoute from './Routes/PrivateRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: 'orders',
        element: <Order></Order>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
)
