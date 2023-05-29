import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar"
import Business_Navbar from "../Navigation/Business_Navbar"
import { Link, useNavigate } from "react-router-dom";
import '../style/css/style.css';
import banner from "../style/img/hero/banner.jpg";
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';


import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContextProvider";

import PopUp from "../modal/PopUp"

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [isMenuVisible, setMenuVisible] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");

    // taken from context -- every time a product is added to the cart cartData state is updated via -->
    const { fetchCartData } = useContext(CartContext)
    const { userType } = useContext(UserContext)

    const handleClose = () => {
        setIsOpen(false);
    };

    const Description = () => (
        <p>
            I like coding counters!
            Sum of all counters is now { }
        </p>
    );


    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`http://127.0.0.1:8000/api/products/`);
            setData(response.data);
            setHasMore(response.data.length > 0);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const backendURL = 'http://127.0.0.1:8000';

    const product = () => {
        return (
            data.map((item) => {
                var imageUrlWithPrefix;
                if (item.image !== null) {
                    imageUrlWithPrefix= `${backendURL}/static${item.image}`;
                }
                return (
                    <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 products">
                        <div className="featured__item" >
                            <div className="featured__item__pic">
                                {imageUrlWithPrefix && (
                                    <img
                                        src={imageUrlWithPrefix}
                                        alt={item.name}
                                        onLoad={() => console.log('Image loaded successfully')}
                                        className="featured__item__pic__image rounded-4"
                                        onClick={() => routeToRestaurant(item.business)}
                                    />
                                )}
                                <ul className="featured__item__pic__hover">
                                    <li>
                                        <a href="#"
                                            onClick={(e) => {
                                                handleAddToFavorites(e, item._id);

                                            }}><i className="fa fa-heart" /></a></li>
                                    <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                    <li><a href="#"
                                        onClick={(e) => {
                                            handleAddToCart(e, item._id);

                                        }}>
                                        <i className="fa fa-shopping-cart" />
                                    </a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text" onClick={() => routeToRestaurant(item.business)}>
                                <h6><a href="#">{item.name}</a></h6>
                                <h6><a href="#">{item.business_name}</a></h6>
                                <h5>{item.price}</h5>
                                <h5>{item.rating}</h5>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }

    const productRender = useMemo(() => product(), [data]);

    const handleScroll = (event) => {
        const target = event.target.documentElement;
        if (target.scrollTop + target.clientHeight === target.scrollHeight && !loading && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let navigate = useNavigate();
    const routeToRestaurant = (path) => {
        console.log(path);
        navigate(`/business/${path}`);
    }
    const handleSearch = () => {
        navigate(`/market?search=${searchText}`);
    };

    const handleAddToCart = async (e, product_id) => {
        e.preventDefault();
        console.log(localStorage.getItem("token"))
        console.log("CART OPERATİONN")

        const userToken = localStorage.getItem('token');
        if (userToken === null || userToken === "") {
            setIsOpen(true);
            setPopUpType(0);
            setPopUpContent(
                <>
                    <h5>To add products to your cart you must login.</h5>
                    <Link to="/login">Login Page</Link>
                </>
            );
        }
        if (userToken && product_id) {
            await axios.post('http://127.0.0.1:8000/api/orders/add-to-cart/',
                {
                    product_id: product_id,
                    qty: 1
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }).then(async (response) => {
                    if (response.status === 201) {
                        await fetchCartData();
                        routeCart();
                    }

                }).catch((error) => {
                    console.error(error);
                    if (error.response.status) {
                        setIsOpen(true);
                        setPopUpType(0);
                        setPopUpContent(error.response.data.detail)
                    }
                })
        }
    };

    const handleAddToFavorites = async (e, product_id) => {
        e.preventDefault();
        const userToken = localStorage.getItem('token');
        if (userToken === null || userToken === "") {
            setIsOpen(true);
            setPopUpType(0);
            setPopUpContent(<>
                <h5>To add products to your favorites you must login.</h5>
                <Link to="/login">Login Page</Link></>)
        }
        if (userToken && product_id) {
            await axios.post('http://127.0.0.1:8000/api/users/customer-profile/favorites/add/',
                {
                    _id: product_id,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }).then(async (response) => {
                    console.log(response);
                    setIsOpen(true);
                    setPopUpType(1);
                    setPopUpContent(<>
                        <h5>Product added to your favorites!</h5>
                        <Link to="/favorites" className="d-flex flex-column align-items-center">
                            <i className="fa fa-heart primary-btn favs-btn" data-tooltip-id="my-tooltip"
                                style={{ fontSize: "45px" }}
                            />
                        </Link></>)
                }).catch((error) => {
                    console.error(error);
                })
        }
    };


    const routeCart = () => {
        navigate("/shopping-cart"); // navigate satkes to the bottom of the page without setTimeout
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top of the page
        }, 1);
        // window.location.href = "/shopping-cart"; // re-renders the whole page
    };

    const handleSetSearchText = (newSearchText) => (event) => {
        event.preventDefault();
        setSearchText(newSearchText);
    };


    const handleMenuClick = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <div className="App">
            {/* returns null if isOpen is false */}
            <PopUp isOpen={isOpen} onClose={handleClose} popUpType={popUpType}>
                {popUpContent}
            </PopUp>

            {userType === 2 ?
                (<Business_Navbar />) :
                (<Navbar />)}
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={handleMenuClick}>
                                    <i className="fa fa-bars" />
                                    <span>All departments</span>
                                </div>
                                <ul className={isMenuVisible ? '' : 'hidden'}>
                                    <li><a href="#" onClick={handleSetSearchText("Fresh Meat")}>Fresh Meat</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Vegetables")}>Vegetables</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Fruit")}>Fruit &amp; Nut Gifts</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Fresh Berries")}>Fresh Berries</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Ocean Foods")}>Ocean Foods</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Eggs")}>Butter &amp; Eggs</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Fastfood")}>Fastfood</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Fresh Onion")}>Fresh Onion</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Papayaya")}>Papayaya &amp; Crisps</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Oatmeal")}>Oatmeal</a></li>
                                    <li><a href="#" onClick={handleSetSearchText("Fresh Bananas")}>Fresh Bananas</a></li>
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
                                        <input type="text" placeholder="What do yo u need?" value={searchText}
                                               onChange={event => setSearchText(event.target.value)} />
                                        <button type="submit" className="site-btn" onClick={handleSearch}>SEARCH</button>
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
                            <div className="hero__item set-bg" style={{ backgroundImage: `url(${banner})` }}>
                                <div className="hero__text">
                                    <span>FRUIT FRESH</span>
                                    <h2>Vegetable <br />100% Organic</h2>
                                    <p>Free Pickup and Delivery Available</p>
                                    <a href="#" className="primary-btn">SHOP NOW</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section End */}
            {/* Categories Section Begin */}
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <div className="categories__slider owl-carousel">
                            <div className="col-lg-3">
                                <div className="categories__item set-bg" data-setbg="img/categories/cat-1.jpg">
                                    <h5><a href="#">Fresh Fruit</a></h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="categories__item set-bg" data-setbg="img/categories/cat-2.jpg">
                                    <h5><a href="#">Dried Fruit</a></h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="categories__item set-bg" data-setbg="img/categories/cat-3.jpg">
                                    <h5><a href="#">Vegetables</a></h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="categories__item set-bg" data-setbg="img/categories/cat-4.jpg">
                                    <h5><a href="#">drink fruits</a></h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="categories__item set-bg" data-setbg="img/categories/cat-5.jpg">
                                    <h5><a href="#">drink fruits</a></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Categories Section End */}
            {/* Featured Section Begin */}
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>

                        </div>
                    </div>
                    <div className="row featured__filter">
                        {productRender}
                        {loading && <div>Loading...</div>}
                        {error && <div>Error fetching data.</div>}
                    </div>
                </div>
            </section>
            {/* Featured Section End */}
            {/* Banner Begin */}
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="img/banner/banner-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img src="img/banner/banner-2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}
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
                                    <li>Address: TEDU</li>
                                    <li>Phone: +90 534 510 3978</li>
                                    <li>Email: gokmen.caglar@tedu.edu.tr</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                            <div className="footer__widget">
                                <h6>Contributors</h6>
                                <ul>
                                    <li>Gökmen ÇAĞLAR</li>
                                    <li>Sude ŞAHİN</li>
                                    <li>S. Dora AÇIK</li>
                                    <li>Anes MEMISEVIC</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="footer__widget">
                                <h6>Join Our Newsletter Now</h6>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                                <p>Reach out to</p> <h5>gokmen.caglar@tedu.edu.tr</h5>
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
                                        Copyright © All rights reserved by FOODRUSH <i
                                            className="fa fa-heart" aria-hidden="true" />
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p></div>
                                <div className="footer__copyright__payment"><img src="img/payment-item.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Footer Section End */}

        </div>

    );
}