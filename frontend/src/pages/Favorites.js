import React from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../Navigation/Navbar';
import BreadcrumbImage from '../style/img/breadcrumb.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Favorites() {
    const token = localStorage.getItem("token")
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        fetchFavorites()
    }, [])
    const [favoritesData, setFavoritesData] = useState([]);

    const fetchFavorites = async () => {
        try {
            axios.get("http://127.0.0.1:8000/api/users/customer-profile/favorites/", headers)
                .then(response => {
                    setFavoritesData(response.data)
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (productID) => {
        if (token) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/users/customer-profile/favorites/delete/${productID}/`, headers)
                .then(async (response) => {
                    if(response.status === 200)
                        await fetchFavorites();
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const displayFavorites = () => {
        return (favoritesData.map((product) => {
            let imageUrlWithPrefix = `http://127.0.0.1:8000${product.image}`;
            return (
                <tr key={product._id}>
                    <td className="shoping__cart__item">
                        <img src={imageUrlWithPrefix} alt="" className='square-image' />
                        <h5>{product.name}</h5>
                    </td>
                    <td className="shoping__cart__price">
                        ${product.price}
                    </td>
                    <td className="shoping__cart__quantity">
                        <div className="quantity d-flex justify-content-center">
                            <div className="pro-qty d-flex flex-row justify-content-around align-items-center">
                                <span>{product.count_in_stock}</span>
                            </div>
                        </div>
                    </td>
                    <td className="shoping__cart__item__close">
                        <span className="icon_close" onClick={(() => deleteProduct(product._id))} />
                    </td>
                </tr>
            );
        }
        ));
    }

    if (token)
        return (
            <>
                <Helmet>
                    <link rel="stylesheet" href="../../style/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="../../style/css/style.css" />
                    <link rel="stylesheet" href="../../style/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="../../style/css/elegant-icons.css" />
                    <link rel="stylesheet" href="../../style/css/nice-select.css" />
                    <link rel="stylesheet" href='https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;900&display=swap' />
                </Helmet>

                <div>
                    {/* Navbar Begin */}
                    <Navbar />
                    {/* Hero Section Begin */}
                    <section className="hero hero-normal">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="hero__categories">
                                        <div className="hero__categories__all">
                                            <i className="fa fa-bars" />
                                            <span>All departments</span>
                                        </div>
                                        <ul>
                                            <li><a href="#">Fresh Meat</a></li>
                                            <li><a href="#">Vegetables</a></li>
                                            <li><a href="#">Fruit &amp; Nut Gifts</a></li>
                                            <li><a href="#">Fresh Berries</a></li>
                                            <li><a href="#">Ocean Foods</a></li>
                                            <li><a href="#">Butter &amp; Eggs</a></li>
                                            <li><a href="#">Fastfood</a></li>
                                            <li><a href="#">Fresh Onion</a></li>
                                            <li><a href="#">Papayaya &amp; Crisps</a></li>
                                            <li><a href="#">Oatmeal</a></li>
                                            <li><a href="#">Fresh Bananas</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="hero__search">
                                        <div className="hero__search__form">
                                            <form action="#">
                                                <div className="hero__search__categories">
                                                    All Categories
                                                    <span className="arrow_carrot-down" />
                                                </div>
                                                <input type="text" placeholder="What do yo u need?" />
                                                <button type="submit" className="site-btn">SEARCH</button>
                                            </form>
                                        </div>
                                        <div className="hero__search__phone">
                                            <div className="hero__search__phone__icon">
                                                <i className="fa fa-phone" />
                                            </div>
                                            <div className="hero__search__phone__text">
                                                <h5>+90 534 510 3978</h5>
                                                <span>support 24/7 time</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Hero Section End */}
                    {/* Breadcrumb Section Begin */}
                    <section className="breadcrumb-section set-bg" style={{
                        backgroundImage: `url(${BreadcrumbImage})`,
                    }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <div className="breadcrumb__text">
                                        <h2>Favorites</h2>
                                        <div className="breadcrumb__option">
                                            <Link to="/">Home</Link>
                                            <span>Favorites</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Breadcrumb Section End */}

                    {/* Shoping Cart Section Begin */}
                    <section className="shoping-cart spad">
                        <div className="container">
                            {/* shopping cart data table */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="shoping__product">Products</th>
                                                    <th>Price</th>
                                                    <th>Current Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* iteams on the shopping cart */}
                                                {displayFavorites()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* shopping cart data table end */}

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__btns d-flex justify-content-center align-items-center">
                                        <Link to="/">
                                            <div className="primary-btn cart-btn">CONTINUE SHOPPING</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Shoping Cart Section End */}
                    {/* Footer Section Begin */}
                    <footer className="footer spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="footer__about">
                                        <div className="footer__about__logo">
                                            <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                                        </div>
                                        <ul>
                                            <li>Address: 60-49 Road 11378 New York</li>
                                            <li>Phone: +90 534 510 3978</li>
                                            <li>Email: hello@colorlib.com</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                                    <div className="footer__widget">
                                        <h6>Useful Links</h6>
                                        <ul>
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">About Our Shop</a></li>
                                            <li><a href="#">Secure Shopping</a></li>
                                            <li><a href="#">Delivery infomation</a></li>
                                            <li><a href="#">Privacy Policy</a></li>
                                            <li><a href="#">Our Sitemap</a></li>
                                        </ul>
                                        <ul>
                                            <li><a href="#">Who We Are</a></li>
                                            <li><a href="#">Our Services</a></li>
                                            <li><a href="#">Projects</a></li>
                                            <li><a href="#">Contact</a></li>
                                            <li><a href="#">Innovation</a></li>
                                            <li><a href="#">Testimonials</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="footer__widget">
                                        <h6>Join Our Newsletter Now</h6>
                                        <p>Get E-mail updates about our latest shop and special offers.</p>
                                        <form action="#">
                                            <input type="text" placeholder="Enter your mail" />
                                            <button type="submit" className="site-btn">Subscribe</button>
                                        </form>
                                        <div className="footer__widget__social">
                                            <a href="#"><i className="fa fa-facebook" /></a>
                                            <a href="#"><i className="fa fa-instagram" /></a>
                                            <a href="#"><i className="fa fa-twitter" /></a>
                                            <a href="#"><i className="fa fa-pinterest" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="footer__copyright">
                                        <div className="footer__copyright__text"><p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            Copyright © All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p></div>
                                        <div className="footer__copyright__payment"><img src="img/payment-item.png" alt="" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* Footer Section End */}
                </div>

            </>
        )
    else {
        return (<Error>
            Access Denied, Login First
            <br /><br />
            <Link to="/login">Login Page</Link>
        </Error>)
    }



}

export default Favorites