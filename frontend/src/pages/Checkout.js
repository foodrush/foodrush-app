import React from "react";

import '../style/css/style.css';
import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import '../style/css/elegant-icons.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

import Navbar from "../Navigation/Navbar";
import {Helmet} from "react-helmet";
import BreadcrumbImage from "../style/img/breadcrumb.jpg";
import {Link} from "react-router-dom";

export default function Checkout() {
    return (
        <>

            <div>
                <Navbar/>
                {/* Breadcrumb Section Begin */}
                <section className="breadcrumb-section set-bg" style={{
                    backgroundImage: `url(${BreadcrumbImage})`,
                }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="breadcrumb__text">
                                    <h2>Shopping Cart</h2>
                                    <div className="breadcrumb__option">
                                        <Link to="/">Home</Link>
                                        <span>Shopping Cart</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Breadcrumb Section End */}
                    {/* Checkout Section Begin */}
                    <section className="checkout spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h6><span className="icon_tag_alt"/> Have a coupon? <a href="#">Click here</a> to
                                        enter your code
                                    </h6>
                                </div>
                            </div>
                            <div className="checkout__form">
                                <h4>Billing Details</h4>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-6">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Fist Name<span>*</span></p>
                                                        <input type="text"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Last Name<span>*</span></p>
                                                        <input type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Country<span>*</span></p>
                                                <input type="text"/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Address<span>*</span></p>
                                                <input type="text" placeholder="Street Address"
                                                       className="checkout__input__add"/>
                                                <input type="text" placeholder="Apartment, suite, unite ect (optinal)"/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Town/City<span>*</span></p>
                                                <input type="text"/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Country/State<span>*</span></p>
                                                <input type="text"/>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Postcode / ZIP<span>*</span></p>
                                                <input type="text"/>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Phone<span>*</span></p>
                                                        <input type="text"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <p>Email<span>*</span></p>
                                                        <input type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="checkout__input__checkbox">
                                                <label htmlFor="acc">
                                                    Create an account?
                                                    <input type="checkbox" id="acc"/>
                                                    <span className="checkmark"/>
                                                </label>
                                            </div>
                                            <p>Create an account by entering the information below. If you are a
                                                returning customer
                                                please login at the top of the page</p>
                                            <div className="checkout__input">
                                                <p>Account Password<span>*</span></p>
                                                <input type="text"/>
                                            </div>
                                            <div className="checkout__input__checkbox">
                                                <label htmlFor="diff-acc">
                                                    Ship to a different address?
                                                    <input type="checkbox" id="diff-acc"/>
                                                    <span className="checkmark"/>
                                                </label>
                                            </div>
                                            <div className="checkout__input">
                                                <p>Order notes<span>*</span></p>
                                                <input type="text"
                                                       placeholder="Notes about your order, e.g. special notes for delivery."/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="checkout__order">
                                                <h4>Your Order</h4>
                                                <div className="checkout__order__products">Products <span>Total</span>
                                                </div>
                                                <ul>
                                                    <li>Vegetable’s Package <span>$75.99</span></li>
                                                    <li>Fresh Vegetable <span>$151.99</span></li>
                                                    <li>Organic Bananas <span>$53.99</span></li>
                                                </ul>
                                                <div className="checkout__order__subtotal">Subtotal <span>$750.99</span>
                                                </div>
                                                <div className="checkout__order__total">Total <span>$750.99</span></div>
                                                <div className="checkout__input__checkbox">
                                                    <label htmlFor="acc-or">
                                                        Create an account?
                                                        <input type="checkbox" id="acc-or"/>
                                                        <span className="checkmark"/>
                                                    </label>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod
                                                    tempor incididunt
                                                    ut labore et dolore magna aliqua.</p>
                                                <div className="checkout__input__checkbox">
                                                    <label htmlFor="payment">
                                                        Check Payment
                                                        <input type="checkbox" id="payment"/>
                                                        <span className="checkmark"/>
                                                    </label>
                                                </div>
                                                <div className="checkout__input__checkbox">
                                                    <label htmlFor="paypal">
                                                        Paypal
                                                        <input type="checkbox" id="paypal"/>
                                                        <span className="checkmark"/>
                                                    </label>
                                                </div>
                                                <button type="submit" className="site-btn">PLACE ORDER</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    {/* Checkout Section End */}
                    {/* Footer Section Begin */}
                    <footer className="footer spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="footer__about">
                                        <div className="footer__about__logo">
                                            <a href="./index.html"><img src="img/logo.png" alt=""/></a>
                                        </div>
                                        <ul>
                                            <li>Address: 60-49 Road 11378 New York</li>
                                            <li>Phone: +65 11.188.888</li>
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
                                            <input type="text" placeholder="Enter your mail"/>
                                            <button type="submit" className="site-btn">Subscribe</button>
                                        </form>
                                        <div className="footer__widget__social">
                                            <a href="#"><i className="fa fa-facebook"/></a>
                                            <a href="#"><i className="fa fa-instagram"/></a>
                                            <a href="#"><i className="fa fa-twitter"/></a>
                                            <a href="#"><i className="fa fa-pinterest"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="footer__copyright">
                                        <div className="footer__copyright__text">
                                            <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                                Copyright © All rights reserved | This template is made with <i
                                                    className="fa fa-heart" aria-hidden="true"/> by <a
                                                    href="https://colorlib.com" target="_blank">Colorlib</a>
                                                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            </p></div>
                                        <div className="footer__copyright__payment"><img src="img/payment-item.png"
                                                                                         alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* Footer Section End */}
                    {/* Js Plugins */}
            </div>
        </>
        );
}