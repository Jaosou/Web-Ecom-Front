import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/register"
import LayoutAdmin from "../layouts/LayoutAdmin";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser"
import ProtectRouterUser from "./ProtectRouterUser";
import ProtectRouterAdmin from "./ProtectRouterAdmin";
import Manage from "../pages/admin/Manage";
import EditProduct from "../pages/admin/EditProduct";
import Payment from "../pages/user/Payment";
import History from "../pages/user/History";
import ManageOrder from "../pages/admin/ManageOrder";

const router = createBrowserRouter([
    {
        path: '/'
        , element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouterAdmin element={<LayoutAdmin/>} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'product/:id', element: <EditProduct /> },
            {path : 'manage',element : <Manage/>},
            {path : 'order',element : <ManageOrder/>},
        ]
    }
    ,
    {
        path: '/user',
        element: <ProtectRouterUser element={<LayoutUser/>} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: 'payment', element: <Payment /> },
            { path: 'history', element: <History /> },
        ]
    }

])

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes
