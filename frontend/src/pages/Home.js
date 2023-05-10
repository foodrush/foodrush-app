import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar"
import Business_Navbar from "../Navigation/Business_Navbar"
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    // taken from context -- every time a product is added to the cart cartData state is updated via -->
    const { fetchCartData } = useContext(CartContext)
    const { userType } = useContext(UserContext)


    const Description = () => (
        <p>
            I like coding counters!
            Sum of all counters is now {}
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
            setData((prevData) => [prevData, ...response.data]);
            setHasMore(response.data.length > 0);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

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
    const routeToRestaurant = (path) =>{
        console.log(path);
        navigate(`/business/${path}`);
    }

    const product = () => {
        const backendURL = "http://127.0.0.1:8000";
        return(
            data.map((item)=>{
                const imageURL = `${backendURL}/static${item.image}`;
                console.log(imageURL);
                return (
                    <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 products" >
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${imageURL})` }}>
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#" ><i className="fa fa-heart" /></a></li>
                                    <li><a href="#"><i className="fa fa-retweet" /></a>   
                                    </li>   
                                    <li><a href="#"
                                        onClick={(e) => { handleAddToCart(e, item._id); }}>
                                        <i className="fa fa-shopping-cart" />
                                    </a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text" onClick={() => routeToRestaurant(item.business)}>
                                <h6><a href="#">{item.name}</a></h6>
                                <h5>{item.price}</h5>
                                <h5>{item.rating}</h5>
                            </div>
                        </div>
                    </div>
                )
            } )
        );
    }

    const handleAddToCart = async (e, product_id) => {
        e.preventDefault();
        console.log(localStorage.getItem("token"))

        const userToken = localStorage.getItem('token');

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
                    console.log(response);
                    if (response.status === 201) {
                        await fetchCartData();
                        routeCart();
                    }

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

    return (
        <div className="App">
            <Navbar />
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all">
                                    <i className="fa fa-bars"/>
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
                                            <span className="arrow_carrot-down"/>
                                        </div>
                                        <input type="text" placeholder="What do yo u need?"/>
                                        <button type="submit" className="site-btn">SEARCH</button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"/>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hero__item set-bg" style={{backgroundImage: `url(${banner})`}}>
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
                            <div className="featured__controls">
                                <ul>
                                    <li className="active" data-filter="*">All</li>
                                    <li data-filter=".oranges">Oranges</li>
                                    <li data-filter=".fresh-meat">Fresh Meat</li>
                                    <li data-filter=".vegetables">Vegetables</li>
                                    <li data-filter=".fastfood">Fastfood</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {product()}
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
            {/* Latest Product Section Begin */}
            <section className="latest-product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Latest Products</h4>
                                <div className="latest-product__slider owl-carousel">
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Top Rated Products</h4>
                                <div className="latest-product__slider owl-carousel">
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Review Products</h4>
                                <div className="latest-product__slider owl-carousel">
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-2.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a href="#" className="latest-product__item">
                                            <div className="latest-product__item__pic">
                                                <img src="img/latest-product/lp-3.jpg" alt="" />
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Product Section End */}
            {/* Blog Section Begin */}
            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>From The Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="img/blog/blog-1.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                        <li><i className="fa fa-comment-o" /> 5</li>
                                    </ul>
                                    <h5><a href="#">Cooking tips make cooking simple</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                        quaerat </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="img/blog/blog-2.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                        <li><i className="fa fa-comment-o" /> 5</li>
                                    </ul>
                                    <h5><a href="#">6 ways to prepare breakfast for 30</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                        quaerat </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="img/blog/blog-3.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                        <li><i className="fa fa-comment-o" /> 5</li>
                                    </ul>
                                    <h5><a href="#">Visit the clean farm in the US</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                        quaerat </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Section End */}
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