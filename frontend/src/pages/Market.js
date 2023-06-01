import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
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
import PopUp from "../modal/PopUp";
import {Backdrop, CircularProgress} from "@mui/material";


export default function Market() {
    const [completeData, setCompleteData] = useState([]);
    const [desiredData, setDesiredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const {userType} = useContext(UserContext)
    const {fetchCartData} = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuVisible, setMenuVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");
    const [initQuery, setInitQuery] = useState(null);

    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');

    useEffect(() => {
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
            setCompleteData(response.data);
            setDesiredData(response.data);
            setHasMore(response.data.length > 0);
            setLoading(false);
            setSearchQuery('');
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };


    let navigate = useNavigate();
    const routeToRestaurant = (path) => {
        console.log(path);
        navigate(`/business/${path}`);
    }

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

    const handleAddToCart = async (e, product_id) => {
        e.preventDefault();
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

    const fuseSearchresultsInitial =(searchQuery)=> {
        console.log("made2")
        const results = fuse.search(searchQuery);
        setDesiredData(results.map((result) => result.item));
    }

    const fuseSearchresults =()=> {
        console.log("made")
        const results = fuse.search(searchQuery);
        setDesiredData(results.map((result) => result.item));
    }
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSearchQueryChange = (newSearchText) => {
        setSearchQuery(newSearchText);
    };

    const routeCart = () => {
        navigate("/shopping-cart"); // navigate satkes to the bottom of the page without setTimeout
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top of the page
        }, 1);
        // window.location.href = "/shopping-cart"; // re-renders the whole page
    };

    const backendURL = 'http://127.0.0.1:8000';

    const product = () => {
        //console.log(desiredData);
        return (
            desiredData.map((item) => {
                var imageUrlWithPrefix;
                if (item.image !== null) {
                    imageUrlWithPrefix= `${backendURL}/static${item.image}`;
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
                                        onClick={() => routeToRestaurant(item.business)}
                                    />
                                )}
                                <ul className="product__item__pic__hover">
                                    <li><a href="#" onClick={(e) => { handleAddToFavorites(e, item._id);}}>
                                        <i className="fa fa-heart" /></a></li>
                                    <li><a href="#" onClick={(e) => { handleAddToCart(e, item._id); }}>
                                        <i className="fa fa-shopping-cart" />
                                    </a></li>
                                </ul>
                            </div>
                            <div className="product__item__text" onClick={() => routeToRestaurant(item.business)}>
                                <h6><a href="#">{item.name}</a></h6>
                                <h6><a href="#">{item.business_name}</a></h6>

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

    const handleMenuClick = () => {
        setMenuVisible(!isMenuVisible);
    };


    return (
        <div className="App">
            <PopUp isOpen={isOpen} onClose={handleClose} popUpType={popUpType}>
            {popUpContent}
        </PopUp>

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
                                <div className="hidden" >

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        <a className="hero__search__categories" onClick={fetchData}>
                                            Reset Filters
                                        </a>
                                        <input type="text" placeholder="What do yo u need?" value={searchQuery}
                                               onChange={event => setSearchQuery(event.target.value)}/>
                                        <button type="submit" className="site-btn" onClick={handleSearch}>SEARCH
                                        </button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"/>
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
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item">
                                    <h4>Department</h4>
                                    <ul className={isMenuVisible ? '' : 'hidden'}>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fresh Meat")}>Fresh Meat</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Vegetables")}>Vegetables</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fruit")}>Fruit &amp; Nut Gifts</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fresh Berries")}>Fresh Berries</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Ocean Foods")}>Ocean Foods</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Eggs")}>Butter &amp; Eggs</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fastfood")}>Fastfood</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fresh Onion")}>Fresh Onion</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Papayaya")}>Papayaya &amp; Crisps</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Oatmeal")}>Oatmeal</a></li>
                                        <li><a href="#" onClick={() => handleSearchQueryChange("Fresh Bananas")}>Fresh Bananas</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            <div className="row">
                                {productRender}
                                {loading && <div>
                                    <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop></div>}
                                {error && <div>Error fetching data.</div>}
                            </div>
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-5">
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="filter__found">
                                            <h6><span>{desiredData.length}</span> Products found</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                        </div>
                                    </div>
                                </div>
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