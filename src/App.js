import React from "react";
import { Routes, Route, Link} from "react-router-dom";
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
import Market from "./pages/Market";



function App() {
        return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/market" element={<Market />} />
        </Routes>
    );


}

export default App;
