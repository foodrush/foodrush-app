import React, {useContext, useEffect, useMemo, useState} from "react";
import Navbar from "../Navigation/Navbar";
import {Routes, Route, Link, useNavigate, useSearchParams} from "react-router-dom";
import '../style/css/style.css';
import banner from "../style/img/hero/banner.jpg";
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';
import axios from "axios";
import Business_Navbar from "../Navigation/Business_Navbar";
import {UserContext} from "../contexts/UserContextProvider";
import {CartContext} from "../contexts/CartContext";
import Fuse from 'fuse.js';


export default function Market() {
    const [completeData, setCompleteData] = useState([]);
    const [desiredData, setDesiredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const {userType} = useContext(UserContext)
    const {fetchCartData} = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');

    useEffect(() => {
        console.log("akjdsjkas")
        fetchData();
        if(searchText !== null){
            setSearchQuery(searchText);
            fuseSearchresults();
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`http://127.0.0.1:8000/api/products/`);
            setCompleteData((prevData) => [prevData, ...response.data]);
            setDesiredData((prevData) => [prevData, ...response.data]);
            setHasMore(response.data.length > 0);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };


    let navigate = useNavigate();
    const routeToRestaurant = (path) => {
        console.log(path);
        navigate(path);
    }

    const handleAddToCart = async (e, product_id) => {
        e.preventDefault();
        console.log(localStorage.getItem("token"))
        console.log("CART OPERATİONN")

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

    const fuse = new Fuse(completeData, {
        keys: ['business_name', 'name', 'cuisine','category'], // Specify the fields you want to search on
        threshold: 0.4, // Adjust the similarity threshold as per your preference
    });

    const handleSearch = (event) => {
        event.preventDefault();
        fuseSearchresults();
    };

    const fuseSearchresults =()=> {
        const results = fuse.search(searchQuery);
        setDesiredData(results.map((result) => result.item));
    }

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const routeCart = () => {
        navigate("/shopping-cart"); // navigate satkes to the bottom of the page without setTimeout
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top of the page
        }, 1);
        // window.location.href = "/shopping-cart"; // re-renders the whole page
    };

    const product = () => {
        //console.log(desiredData);
        return (
            desiredData.map((item) => {
                console.log("----------------------");
                console.log(item.name)
                var imageUrlWithPrefix;
                if (item.image !== null) {
                    imageUrlWithPrefix = `http://127.0.0.1:8000${item.image}`;
                    console.log(imageUrlWithPrefix);
                }
                return (
                    <div key={item._id} className="col-lg-4 col-md-6 col-sm-6 products">
                        <div className="product__item">
                            <div className="product__item__pic set-bg">
                                {imageUrlWithPrefix && (
                                    <img
                                        src={imageUrlWithPrefix}
                                        alt={item.name}
                                        onLoad={() => console.log('Image loaded successfully')}
                                        className="featured__item__pic__image rounded-4"
                                    />
                                )}
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart" /></a></li>
                                    <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                    <li><a href="#" onClick={(e) => { handleAddToCart(e, item._id); }}>
                                        <i className="fa fa-shopping-cart" />
                                    </a></li>
                                </ul>
                            </div>
                            <div className="product__item__text" onClick={() => routeToRestaurant(item.business)}>
                                <h6><a href="#">{item.name}</a></h6>
                                <h5>{item.price}</h5>
                                <h5>{item.rating}</h5>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    const productRender = useMemo(() => product(), [desiredData]);


    return (
        <div>
            {userType === 2 ?
                (<Business_Navbar/>) :
                (<Navbar/>)}
            {/* Header Section End */}
            {/* Hero Section Begin */}
            <section className="hero hero-normal">
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
                                        <input type="text" placeholder="What do yo u need?" value={searchQuery}
                                               onChange={handleSearchQueryChange}/>
                                        <button type="submit" className="site-btn" onClick={handleSearch}>SEARCH
                                        </button>
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
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section End */}
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item">
                                    <h4>Department</h4>
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
                                    </ul>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Price</h4>
                                    <div className="price-range-wrap">
                                        <div
                                            className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                            data-min={10} data-max={540}>
                                            <div className="ui-slider-range ui-corner-all ui-widget-header"/>
                                            <span tabIndex={0}
                                                  className="ui-slider-handle ui-corner-all ui-state-default"/>
                                            <span tabIndex={0}
                                                  className="ui-slider-handle ui-corner-all ui-state-default"/>
                                        </div>
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <input type="text" id="minamount"/>
                                                <input type="text" id="maxamount"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar__item sidebar__item__color--option">
                                    <h4>Colors</h4>
                                    <div className="sidebar__item__color sidebar__item__color--white">
                                        <label htmlFor="white">
                                            White
                                            <input type="radio" id="white"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--gray">
                                        <label htmlFor="gray">
                                            Gray
                                            <input type="radio" id="gray"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--red">
                                        <label htmlFor="red">
                                            Red
                                            <input type="radio" id="red"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--black">
                                        <label htmlFor="black">
                                            Black
                                            <input type="radio" id="black"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--blue">
                                        <label htmlFor="blue">
                                            Blue
                                            <input type="radio" id="blue"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--green">
                                        <label htmlFor="green">
                                            Green
                                            <input type="radio" id="green"/>
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Popular Size</h4>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="large">
                                            Large
                                            <input type="radio" id="large"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="medium">
                                            Medium
                                            <input type="radio" id="medium"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="small">
                                            Small
                                            <input type="radio" id="small"/>
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="tiny">
                                            Tiny
                                            <input type="radio" id="tiny"/>
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__item">
                                    <div className="latest-product__text">
                                        <h4>Latest Products</h4>
                                        <div className="latest-product__slider owl-carousel">
                                            <div className="latest-prdouct__slider__item">
                                                <a href="#" className="latest-product__item">
                                                    <div className="latest-product__item__pic">
                                                        <img src="img/latest-product/lp-1.jpg" alt=""/>
                                                    </div>
                                                    <div className="latest-product__item__text">
                                                        <h6>Crab Pool Security</h6>
                                                        <span>$30.00</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="latest-product__item">
                                                    <div className="latest-product__item__pic">
                                                        <img src="img/latest-product/lp-2.jpg" alt=""/>
                                                    </div>
                                                    <div className="latest-product__item__text">
                                                        <h6>Crab Pool Security</h6>
                                                        <span>$30.00</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="latest-product__item">
                                                    <div className="latest-product__item__pic">
                                                        <img src="img/latest-product/lp-3.jpg" alt=""/>
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
                                                        <img src="img/latest-product/lp-1.jpg" alt=""/>
                                                    </div>
                                                    <div className="latest-product__item__text">
                                                        <h6>Crab Pool Security</h6>
                                                        <span>$30.00</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="latest-product__item">
                                                    <div className="latest-product__item__pic">
                                                        <img src="img/latest-product/lp-2.jpg" alt=""/>
                                                    </div>
                                                    <div className="latest-product__item__text">
                                                        <h6>Crab Pool Security</h6>
                                                        <span>$30.00</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="latest-product__item">
                                                    <div className="latest-product__item__pic">
                                                        <img src="img/latest-product/lp-3.jpg" alt=""/>
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
                        <div className="col-lg-9 col-md-7">
                            <div className="row">
                                {productRender}
                                {loading && <div>Loading...</div>}
                                {error && <div>Error fetching data.</div>}
                            </div>
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-5">
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="filter__found">
                                            <h6><span>{desiredData.length}</span> Products found</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2"/>
                                            <span className="icon_ul"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__pagination">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#"><i className="fa fa-long-arrow-right"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Section End */}
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
                                <div className="footer__copyright__payment"><img src="img/payment-item.png" alt=""/>
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