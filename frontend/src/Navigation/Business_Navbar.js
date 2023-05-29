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
import {UserContext} from "../contexts/UserContextProvider";


export default function Business_Navbar() {
    const [user, setUser] = useState(null);
    const { userType,resetUserContext  } = useContext(UserContext)


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

    const routeToBusinessProfile = () => {
        console.log(localStorage.getItem("user_id"));
        navigate(`/business/${localStorage.getItem("business_id")}`)

    }

    const logOut = () => {
        setUser(null);
        localStorage.clear();
        resetUserContext();
        navigate("/");
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
                                <Link to="/"> <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor"
                                         className="bi bi-egg-fried" viewBox="0 0 16 16">
                                        <path fill="#e9831d" path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
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
                                    {/*TODO: Rakip analizi page */}
                                    {/*TODO: satış page i*/}
                                    {/*<li className="active"><Link to="/">Home</Link></li>*/}
                                    <li><Link to="/business">Dashboard</Link></li>

                                    <li onClick={() => routeToBusinessProfile()}>My Business</li>

                                    <li><Link to="/market">Market</Link></li>
                                    <li><Link to="/business-orders">Orders</Link></li>

                                    {/*<li><Link to="/blog">Blog</Link></li>*/}
                                    {/*<li><Link to="/contact">Contact</Link></li>*/}
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">


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