import React, {useState, useEffect, useContext} from 'react';
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
import '../style/css/style.css';
import foodrush from '../style/img/FoodRush.PNG';
import {Tooltip} from 'react-tooltip';

//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';
import {Link, useNavigate} from "react-router-dom";

import {CartContext} from '../contexts/CartContext';
import {UserContext} from '../contexts/UserContextProvider';


export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(-1);

    const {totalPrice, totalQuantity} = useContext(CartContext);
    const {userType, resetUserContext} = useContext(UserContext)

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

    const handleMenuClick = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    const handleMenuUnclick = () => {
        setMenuVisible(false);
    };

    let navigate = useNavigate();
    const routeToProfile = () => {
        navigate("/profile");
    }

    const logOut = async () => {
        setUser(null);
        localStorage.clear()
        navigate("/");
        setToken(null);
    }
    return (
        <div>
            {/* Humberger Begin */}
            <div className={!isMenuVisible ? 'humberger__menu__overlay' : 'humberger__menu__overlay active'}/>
            <div
                className={!isMenuVisible ? 'humberger__menu__wrapper' : 'humberger__menu__wrapper show__humberger__menu__wrapper'}
                onMouseDown={handleMenuUnclick}
            >
                <div className="humberger__menu__logo">
                    <a href="#"><img src="img/logo.png" alt=""/></a>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li><a href="#"><i className="fa fa-heart"/> <span>1</span></a></li>
                        <li><a href="#"><i className="fa fa-shopping-bag"/> <span>3</span></a></li>
                    </ul>
                    <div className="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__language">
                        <img src="img/language.png" alt=""/>
                        <div>English</div>
                        <span className="arrow_carrot-down"/>
                        <ul>
                            <li><a href="#">Spanis</a></li>
                            <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div className="header__top__right__auth">
                        <a href="#"><i className="fa fa-user"/> Login</a>
                    </div>
                </div>
                <nav className="humberger__menu__navs mobile-menus">
                    <ul>
                        <li className="active"><a href="./index.html">Home</a></li>
                        <li><a href="./shop-grid.html">Shop</a></li>
                        <li><a href="#">Pages</a>
                            <ul className="header__menu__dropdown">
                                <li><a href="./shop-details.html">Shop Details</a></li>
                                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                <li><a href="./checkout.html">Check Out</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="./blog.html">Blog</a></li>
                        <li><a href="./contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"/>
                <div className="header__top__right__social">
                    <a href="#"><i className="fa fa-facebook"/></a>
                    <a href="#"><i className="fa fa-twitter"/></a>
                    <a href="#"><i className="fa fa-linkedin"/></a>
                    <a href="#"><i className="fa fa-pinterest-p"/></a>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li><i className="fa fa-envelope"/> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>
            {/* Humberger End */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <Link to="/">
                                        <h4>FoodRush</h4>
                                    </Link>
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
                                        {user ? (
                                            // <Link to="/profile">Welcome {localStorage.getItem("name")}<i className="fa fa-user"/> </Link>

                                            <div>

                                                <div className="header__top__right__auth"
                                                    // data-tooltip-id="my-tooltip"
                                                    // data-tooltip-content={user}
                                                     onClick={() => routeToProfile()}><i
                                                    className="fa fa-user"/> Profile
                                                    <Tooltip id="my-tooltip"/>
                                                </div>

                                                <div className="header__top__right__auth"
                                                    // data-tooltip-id="my-tooltip"
                                                    // data-tooltip-content="Logout"
                                                     onClick={() => logOut()}>


                                                    <i className="fa fa-times"/> Logout
                                                </div>
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
                                <Link to="/"> <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor"
                                         className="bi bi-egg-fried" viewBox="0 0 16 16">
                                        <path fill="#e9831d" path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill="#e9831d" path
                                              d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z">
                                        </path>
                                    </svg>
                                </Link> </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className={activeItem === -1 ? 'active' : ''}>
                                        <Link to="/" onClick={() => handleItemClick(-1)}>Home</Link>
                                    </li>
                                    <li className={activeItem === 0 ? 'active' : ''}>
                                        <Link to="/market" onClick={() => handleItemClick(0)}>Market</Link>
                                    </li>
                                    <li className={activeItem === 1 ? 'active' : ''}>
                                        <a href="#">Pages</a>
                                        <ul className="header__menu__dropdown">
                                            <li><a href="./shop-details.html">Shop Details</a></li>
                                            <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                            <li><a href="./checkout.html">Check Out</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li className={activeItem === 2 ? 'active' : ''}>
                                        <Link to="/blog" onClick={() => handleItemClick(2)}>Blog</Link>
                                    </li>
                                    <li className={activeItem === 3 ? 'active' : ''}>
                                        <Link to="/contact" onClick={() => handleItemClick(3)}>Contact</Link>
                                    </li>
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
                    <div className="humberger__open" onClick={handleMenuClick}>
                        <i className="fa fa-bars"/>
                    </div>
                </div>
            </header>
        </div>
    );

}