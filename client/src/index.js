import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from 'react-router-dom';
import './index.css';
import RegisterPage from './RegisterPage';
import PushDataPage from './PushDataPage';
import ResetPassword from './ResetPassword';
import RetrieveDataPage from './RetrieveDataPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPage from './MenuPage';


function Layout() {
    return (
        <div>
            <Outlet /> {/* Child routes will render here */}
        </div>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<RegisterPage />} />
            <Route path="PushDataPage" element={<PushDataPage />} />
            <Route path="MenuPage" element={<MenuPage />} />
            <Route path="RetrieveDataPage" element={<RetrieveDataPage />} />
            <Route path="ResetPassword/:userId/:token" element={<ResetPassword />} />
        </Route>
    )
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

