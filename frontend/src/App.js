import React from "react";
import { Routes, Route, Link, } from "react-router-dom";
import './style/css/style.css';
import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import './style/css/elegant-icons.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import banner from "./style/img/hero/banner.jpg";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login-Register/Login";
import Register from "./pages/Login-Register/Register";
import RegisterBusiness from "./pages/Login-Register/RegisterBusiness";
import LoginBusiness from "./pages/Login-Register/LoginBusiness";


import Market from "./pages/Market";
import Restaurant from "./pages/Restaurant/Restaurant";

import UserProfile from "./pages/Profile/UserProfile";

import EditProfile from "./pages/Profile/EditProfile";
import BusinessDashboard from "./pages/BusinessMenu/BusinessDashboard";

import EditMenu from "./pages/BusinessMenu/EditMenu"

import AddProduct from "./pages/BusinessMenu/AddProduct";
import BusinessPage from "./pages/BusinessPage";

import ShoppingCart from "./pages/Cart/ShoppingCart";

import { CartProvider } from "./contexts/CartContext";

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-business" element={<LoginBusiness />} />

                <Route path="/register" element={<Register />} />
                <Route path="/register-business" element={<RegisterBusiness />} />
                <Route path="/market" element={<Market />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/editmenu" element={<EditMenu />} />
                <Route path="/editmenu/add-product" element={<AddProduct />} />

                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/:id" element={<BusinessPage/>} exact />
        </Routes>
        </CartProvider>
    );


}

export default App;
