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

import Orders from "./pages/Orders";

import Market from "./pages/Market";
import Restaurant from "./pages/Restaurant/Restaurant";

import UserProfile from "./pages/Profile/UserProfile";

import EditProfile from "./pages/Profile/EditProfile";
import BusinessDashboard from "./pages/BusinessMenu/BusinessDashboard";

import EditMenu from "./pages/BusinessMenu/EditMenu"

import AddProduct from "./pages/BusinessMenu/AddProduct";
import BusinessPage from "./pages/Restaurant/BusinessPage";

import ShoppingCart from "./pages/Cart/ShoppingCart";

import { CartProvider } from "./contexts/CartContext";
import { UserContextProvider } from "./contexts/UserContextProvider";

import { useState } from "react";
import EditProduct from "./pages/BusinessMenu/EditProduct";

import { ProductProvider } from "./contexts/ProductFormContext";
import Checkout from "./pages/Checkout";
import BusinessOrders from "./pages/BusinessMenu/BusinessOrders";
import Favorites from "./pages/Favorites";

import Error from "./pages/Error";
function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    return (
        <UserContextProvider>
            <CartProvider token={token}
                setToken={setToken}>
                <ProductProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="/login-business" element={<LoginBusiness />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/register-business" element={<RegisterBusiness />} />
                        <Route path="/market" element={<Market />} />
                        <Route path="/restaurant" element={<Restaurant />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/profile/edit" element={<EditProfile />} />

                        <Route path="/editmenu" element={<EditMenu />} />

                        <Route path="/editmenu/add-product" element={<AddProduct />} />
                        <Route path="/business-orders" element={<BusinessOrders />} />
                        <Route path="/orders" element={<Orders />} />

                        <Route path="/shopping-cart" element={<ShoppingCart token={token} />} />
                        <Route path="/business" element={<BusinessDashboard />} />
                        <Route path="/business/:id" element={<BusinessPage />} exact />
                        <Route path="/edit-product/:productId" element={<EditProduct />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path='*' element={<Error>
                            <h5>The page you are trying to reach does not exist.</h5>
                            <Link to="/">Go back to home page.</Link>
                        </Error>} />
                    </Routes>
                </ProductProvider>
            </CartProvider>
        </UserContextProvider>
    );


}

export default App;
