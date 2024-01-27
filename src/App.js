import React,{useEffect} from 'react';
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom";

import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import Privatefunc from "./components/route/private"
import Forgotpassword from './pages/auth/Forgotpassword';
import AdminRoute from './components/route/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Createcategory from './pages/admin/Createcategory';
import Createproduct from './pages/admin/Createproduct';
import AdminUsers from './pages/admin/AdminUsers';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import CategoryProduct from './pages/categoryProduct';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/admin/AdminOrder';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />

        <Route path="/dashboard" element={<Privatefunc />}>
          <Route index element={<Dashboard />} />

          <Route path="user" element={<Profile />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admin/orders" element={<AdminOrder />} />
          <Route path="admin/create-category" element={<Createcategory />} />
          <Route path="admin/create-product" element={<Createproduct />} />
          <Route path="admin/products/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<AdminUsers />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;

