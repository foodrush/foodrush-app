import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import "jquery-nice-select/css/nice-select.css";
import './style/css/style.css';
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



function App() {
        return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
        </Routes>
    );


}

export default App;
