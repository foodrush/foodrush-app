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
import { Helmet } from "react-helmet";
import BreadcrumbImage from "../style/img/breadcrumb.jpg";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import PopUp from "../modal/PopUp";
import { UserContext } from "../contexts/UserContextProvider";


export default function Checkout() {
    const { cartData, cartState, fetchCartData, calculateDiscount } = useContext(CartContext)

    const { SDGPoints, setSDGPoints  } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const [popUpContent, setPopUpContent] = useState("");
    const [popUpType, setPopUpType] = useState(3);
    const cartDataDiscounted = calculateDiscount(cartData);

    const [succesfulCheckout,setSuccessfulCheckout] = useState(false);

    useEffect(() => {
        if(succesfulCheckout){
            let currentPoints = SDGPoints;
            currentPoints += Math.ceil((cartState.totalPrice-cartState.totalPriceDiscounted) * 10)
            setSDGPoints(currentPoints);
            localStorage.setItem("SDGPoints",currentPoints) 
        }
    },[succesfulCheckout]);

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const orderItems = cartDataDiscounted.map(({item, discPrice}) => {
            let { product, qty } = item;
            return ({
                product: product._id,
                qty: qty,
                price: discPrice
            })
        });

        try {
            await axios.post(`http://127.0.0.1:8000/api/orders/add/`, {
                payment_method: "cash",
                tax_price: 3,
                shipping_price: 5,
                total_price: cartState.totalPriceDiscounted,
                order_items: orderItems,
                shipping_address: {
                    address: formData.get("address_street"),
                    city: formData.get("city"),
                    postal_code: formData.get("zip"),
                    country: formData.get("country_state")
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            ).then(async response => {
                if (response.status === 201) {
                    await fetchCartData();
                    setIsOpen(true);
                    setPopUpContent("Your order has been placed!")
                    setPopUpType(1);
                    setSuccessfulCheckout(true);
                }
            })
        }
        catch (error) {
            console.log(error)
            console.log(error.response.data)
        }
    };

    const displayOrderInfo = () => {
        return (cartDataDiscounted.map(({item, discPrice}) => {
            return (
                <li key={item.id}>{item.product.name}<span>${(discPrice * item.qty).toFixed(2)}</span></li>
            )
        }));
    }

    let navigate = useNavigate();
    const routeToHome = () => {
        navigate("/");
    };

    return (
        <>
            <PopUp
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    routeToHome();
                }}
                popUpType={popUpType}>
                {popUpContent}
            </PopUp>
            <div>
                <Navbar />
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
                                <h6><span className="icon_tag_alt" /> Have a coupon? <a href="#">Click here</a> to
                                    enter your code
                                </h6>
                            </div>
                        </div>
                        <div className="checkout__form">
                            <h4>Billing Details</h4>
                            <form action="#"
                                onSubmit={handleCheckoutSubmit}>
                                <div className="row">
                                    <div className="col-lg-8 col-md-6">
                                        <h5><strong> Address information </strong></h5>
                                        <hr />
                                        <div className="checkout__input">
                                            <p>Country<span>*</span></p>
                                            <input type="text"
                                                name="country" />
                                        </div>
                                        <div className="checkout__input">
                                            <p>Address<span>*</span></p>
                                            <input type="text" placeholder="Street Address"
                                                className="checkout__input__add"
                                                name="address_street" />
                                            <input type="text" placeholder="Apartment, suite, unite ect (optinal)"
                                                name="address_opt" />
                                        </div>
                                        <div className="checkout__input">
                                            <p>Town/City<span>*</span></p>
                                            <input type="text"
                                                name="city" />
                                        </div>
                                        <div className="checkout__input">
                                            <p>Country/State<span>*</span></p>
                                            <input type="text"
                                                name="country_state" />
                                        </div>
                                        <div className="checkout__input">
                                            <p>Postcode / ZIP<span>*</span></p>
                                            <input type="text"
                                                name="zip" />
                                        </div>
                                        <div className="checkout__input">
                                            <p>Order notes<span>*</span></p>
                                            <input type="text"
                                                placeholder="Notes about your order, e.g. special notes for delivery."
                                                name="orderNotes" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="checkout__order">
                                            <h4>Your Order</h4>
                                            <div className="checkout__order__products">Products <span>Total</span>
                                            </div>
                                            <ul>
                                                {displayOrderInfo()}
                                            </ul>
                                            <div className="checkout__order__subtotal">Subtotal <span>${cartState.totalPrice}</span>
                                            </div>
                                            <div className="checkout__order__total">Total Disount <span>${(cartState.totalPrice-cartState.totalPriceDiscounted).toFixed(2)}</span>
                                            </div>
                                            <div className="checkout__order__total">Total <span>${cartState.totalPriceDiscounted}</span></div>
                                            <button
                                                type="submit" className="site-btn">PLACE ORDER</button>
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
                                    <div className="footer__copyright__text">
                                        <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            Copyright © All rights reserved | This template is made with <i
                                                className="fa fa-heart" aria-hidden="true" /> by <a
                                                    href="https://colorlib.com" target="_blank">Colorlib</a>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        </p></div>
                                    <div className="footer__copyright__payment"><img src="img/payment-item.png"
                                        alt="" /></div>
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