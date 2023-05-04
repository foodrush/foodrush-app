import React, { useState, useEffect, useContext } from 'react';
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
import '../style/css/style.css';
import { Tooltip } from 'react-tooltip'


//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContextProvider';



export default function Navbar() {
    const [user, setUser] = useState(null);

    const { totalPrice, totalQuantity } = useContext(CartContext);
    const { userType,resetUserContext  } = useContext(UserContext)

    const {cartState, setToken, cartData} = useContext(CartContext);

    useEffect(() => {
        const token = localStorage.getItem('token')
        // console.log(JSON.parse(localStorage.getItem('name')));

        console.log(localStorage.getItem('name'));
        if (token == null || token == 'undefined') {
            console.log("no token")

        } else {
            // console.log(JSON.parse(localStorage.getItem('token')));

            setUser(localStorage.getItem('name'))

        }
    }, []);


    let navigate = useNavigate();
    const routeToProfile = () => {
        navigate("/profile");
    }

    const logOut = async() => {
        setUser(null);
        localStorage.clear()
        navigate("/");
        setToken(null);
    }

    return (
        <div>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <Link to="/">FoodRush<img src="style/img/logo.png" alt="" /> </Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#"><i className="fa fa-facebook" /></a>
                                        <a href="#"><i className="fa fa-twitter" /></a>
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                        <a href="#"><i className="fa fa-pinterest-p" /></a>
                                    </div>
                                    <div className="header__top__right__language">
                                        <img src="styletyle/img/language.png" alt="" />
                                        <div>English</div>
                                        <span className="arrow_carrot-down" />
                                        <ul>
                                            <li><a href="#">Turkish</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                    <div className="header__top__right__auth">
                                        {user ? (
                                            // <Link to="/profile">Welcome {localStorage.getItem("name")}<i className="fa fa-user"/> </Link>

                                            <div>

                                                <div className="header__top__right__auth"
                                                    // data-tooltip-id="my-tooltip"
                                                    // data-tooltip-content={user}
                                                    onClick={() => routeToProfile()}><i
                                                        className="fa fa-user" /> Profile
                                                    <Tooltip id="my-tooltip" />
                                                </div>

                                                <div className="header__top__right__auth"
                                                    // data-tooltip-id="my-tooltip"
                                                    // data-tooltip-content="Logout"
                                                    onClick={() => logOut()}>


                                                    <i className="fa fa-times" /> Logout
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to="/login"><i className="fa fa-user" /> Login</Link>
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
                                <Link to="/">FoodRush<img src="style/img/logo.png" alt="" /> </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li><Link to="/market">Market</Link></li>
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
                                    <li><a href="#">
                                        <i className="fa fa-heart" data-tooltip-id="my-tooltip"
                                            // data-tooltip-content="Favorites
                                             />
                                        {/*<span></span>*/}
                                    </a>
                                    </li>
                                    <li>
                                        <Link to="/shopping-cart">
                                            <i className="fa fa-shopping-bag"
                                               // data-tooltip-id="my-tooltip"
                                                // data-tooltip-content="Cart"
                                            />
                                            {/*TODO: Total quantity is remains after login with another account*/}

                                                <span>{cartState.totalQuantity}</span>
                                        </Link>
                                    </li>
                                </ul>
                                {/*TODO: Total quantity is remains after login with another account*/}

                                <div className="header__cart__price">item: <span>${cartState.totalPrice}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars" />
                    </div>
                </div>
            </header>
        </div>
    );

}