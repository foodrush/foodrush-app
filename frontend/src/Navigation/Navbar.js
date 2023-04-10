import React, { useState, useEffect } from 'react';
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
import '../style/css/style.css';

//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';
import {Link, useNavigate} from "react-router-dom";

export default function Navbar(){
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token')

        console.log(JSON.parse(localStorage.getItem('name')));
        if (!token) {
            console.log("no token")

        } else {
            console.log(JSON.parse(localStorage.getItem('token')));

            setUser(localStorage.getItem("name"))

        }
    }, []);


    let navigate = useNavigate();
    const routeToProfile = () =>{
        navigate("/profile");
    }

    return (
        <div>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    FOODRUSH
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#"><i className="fa fa-facebook"/></a>
                                        <a href="#"><i className="fa fa-twitter"/></a>
                                        <a href="#"><i className="fa fa-linkedin"/></a>
                                        <a href="#"><i className="fa fa-pinterest-p"/></a>
                                    </div>
                                    <div className="header__top__right__language">
                                        <img src="styletyle/img/language.png" alt=""/>
                                        <div>English</div>
                                        <span className="arrow_carrot-down"/>
                                        <ul>
                                            <li><a href="#">Turkish</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                    <div className="header__top__right__auth">
                                        { user ? (
                                                // <Link to="/profile">Welcome {localStorage.getItem("name")}<i className="fa fa-user"/> </Link>
                                            //TODO: ON HOVER or LINK property
                                            <div className="header__top__right__auth"
                                                  onClick={() => routeToProfile()}> <i className="fa fa-user"/> Welcome {localStorage.getItem("name")}

                                            </div>
                                            ) : (
                                            <Link to="/login"><i className="fa fa-user"/> Login</Link>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <Link to="/">FoodRush<img src="style/img/logo.png" alt=""/> </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li><Link to="/market">Shop</Link></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="header__menu__dropdown">
                                            <li><a href="./shop-details.html">Shop Details</a></li>
                                            <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                            <li><a href="./checkout.html">Check Out</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li><a href="#"><i className="fa fa-heart"/> <span>1</span></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-bag"/> <span>3</span></a></li>
                                </ul>
                                <div className="header__cart__price">item: <span>$150.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars"/>
                    </div>
                </div>
            </header>
        </div>
    );

}