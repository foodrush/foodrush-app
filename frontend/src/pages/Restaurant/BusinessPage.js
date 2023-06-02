import axios from 'axios';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import "jquery-nice-select/css/nice-select.css";
import Business_Navbar from "../../Navigation/Business_Navbar"
import Navbar from "../../Navigation/Navbar";
import { UserContext } from "../../contexts/UserContextProvider";
import banner from "../../style/img/hero/banner.jpg";
import Alert from "react-bootstrap/Alert";
import {CartContext} from "../../contexts/CartContext";
import Fuse from 'fuse.js';
import {Backdrop, CircularProgress} from "@mui/material";

import PopUp from '../../modal/PopUp';
import { Link } from "react-router-dom";

function BusinessPage() {
    const [businessData, setBusinessData] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const { cartData, fetchCartData, cartState, calculateDiscount } = useContext(CartContext);
    // pop-up states
    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [completeData, setCompleteData] = useState([]);

    let businessId = useParams();
    const { userType } = useContext(UserContext)

    let navigate = useNavigate();

    useEffect(() => {

        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`/api/users/businesses/${businessId.id}/`),
                    axios.get(`/api/products/businesses/${businessId.id}/`)
                ]);
                setBusinessData(businessResponse.data);
                setproductResponse(productResponse.data);
                setFilteredProducts(productResponse.data)
                setCompleteData(productResponse.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [businessId]);

    if (!businessData || !productResponse) {
        return <div>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop></div>;
    }

    const handleAddToCart = async (e, product_id) => {
        e.preventDefault();

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
            await axios.post('api/orders/add-to-cart/',
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

    const routeCart = () => {
        navigate("/shopping-cart"); // navigate satkes to the bottom of the page without setTimeout
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top of the page
        }, 1);
        // window.location.href = "/shopping-cart"; // re-renders the whole page
    };

    const backendURL = 'http://127.0.0.1:8000';


    const handleSearch= (text) => {


        // Perform the search when the search query changes
        const fuse = new Fuse(completeData, {
            keys: ['name', 'cuisine','category'], // Specify the fields you want to search on
            threshold: 0.4, // Adjust the similarity threshold as per your preference
        });

        const searchResults = fuse.search(text);
        setFilteredProducts(searchResults.map((result) => result.item));
    };

    const product = () => {
        const discArr = calculateDiscount(filteredProducts);
        return (
            discArr.map(({ item, discPrice }) => {

                var imageUrlWithPrefix;
                if (item.image !== null) {
                    imageUrlWithPrefix = `${item.image}`;
                }
                return (
                    <div key={item.id} className="col-sm-6 col-lg-4 all pizza">
                        <div className="box">
                            <div>
                                <div className="img-box">
                                    {imageUrlWithPrefix && (
                                        <img
                                            src={imageUrlWithPrefix}
                                            alt={item.name}
                                        />
                                    )}
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        {item.name}
                                    </h5>
                                    <p>
                                        {item.description}
                                    </p>
                                    <p>
                                        Rating:{item.rating} & Review Num:{item.review_num}
                                    </p>
                                    <div className="options align-items-center">
                                        <div>
                                            <h6 className='old-information'>
                                                ${item.price}
                                            </h6>
                                            <h6>
                                                ${discPrice}
                                            </h6>
                                        </div>
                                        {userType === 1 &&
                                            <a href onClick={(e) => {
                                                handleAddToCart(e, item._id);
                                            }}>
                                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 456.029 456.029"
                                                    style={{ enableBackground: 'new 0 0 456.029 456.029' }}
                                                    xmlSpace="preserve">
                                                    <g>
                                                        <g>
                                                            <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                         c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"/>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                         C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                         c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                         C457.728,97.71,450.56,86.958,439.296,84.91z"/>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                         c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"/>
                                                        </g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                    <g>
                                                    </g>
                                                </svg>
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }


    return (
        <div>
            <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} popUpType={popUpType}>
                {popUpContent}
            </PopUp>
            {userType === 2 ?
                (<Business_Navbar />) :
                (<Navbar />)}
            <div className="hero_area">
                {/*<div className="bg-box">*/}
                {/*    <img src="images/hero-bg.jpg" alt="" />*/}
                {/*</div>*/}


                {/* slider section */}
                <section className="slider_section"
                    style={{
                        backgroundImage: `url(${banner})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: "contain",
                        backgroundPosition: "right"
                    }}
                >

                    <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>
                                                    {businessData.restaurant_name}
                                                </h1>
                                                <p>
                                                    Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                                                    sapiente ad mollitia laborum quam quisquam esse error unde. Tempora
                                                    ex doloremque, labore, sunt repellat dolore, iste magni quos nihil
                                                    ducimus libero ipsam.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* end slider section */}
            </div>

            {/* food section */}
            <section className="food_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Our Menu
                        </h2>
                    </div>
                    <ul className="filters_menu">
                        <li className="active" data-filter="*" onClick={() => setFilteredProducts(productResponse)}>
                            All
                        </li>
                        <li
                            onClick={() => handleSearch("Burger")}
                        >
                            Burger
                        </li>
                        <li
                            onClick={() => handleSearch("Pizza")}
                            >
                            Pizza
                        </li>
                        <li
                            onClick={() => handleSearch("Pasta")}
                        >
                            Pasta
                        </li>
                        <li
                            onClick={() => handleSearch("Fries")}
                        >
                            Fries
                        </li>
                        <li
                            onClick={() => handleSearch("Veggies")}
                        >
                            Veggies
                        </li>
                        <li
                            onClick={() => handleSearch("Fruits")}
                        >
                            Fruits
                        </li>
                    </ul>
                    {showAlert && (
                        <Alert
                            variant="success"
                            style={{ width: "100% " }}
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            <Alert.Heading>
                                Successfully Added To Cart
                            </Alert.Heading>
                        </Alert>
                    )}
                    <div className="filters-content">
                        <div className="row grid">
                            {product()}
                        </div>
                    </div>
                    <div className="btn-box">
                        <a href>
                            View More
                        </a>
                    </div>
                </div>
            </section>
            {/* end food section */}
            {/* footer section */}
            <footer className="footer_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 footer-col">
                            <div className="footer_contact">
                                <h4>
                                    Contact Us
                                </h4>
                                <div className="contact_link_box">
                                    <a href>
                                        <i className="fa fa-map-marker" aria-hidden="true" />
                                        <span>
                                            Ankara, TEDU
                                        </span>
                                    </a>
                                    <a href>
                                        <i className="fa fa-phone" aria-hidden="true" />
                                        <span>
                                            Call +90 534 5103978
                                        </span>
                                    </a>
                                    <a href>
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                        <span>
                                            gokmen.caglar@tedu.edu.tr
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <div className="footer_detail">
                                <a href className="footer-logo">
                                    FoodRush
                                </a>
                                <p>
                                    Rush for your Food
                                </p>
                                <div className="footer_social">
                                    <a href>
                                        <i className="fa fa-facebook" aria-hidden="true" />
                                    </a>
                                    <a href>
                                        <i className="fa fa-twitter" aria-hidden="true" />
                                    </a>
                                    <a href>
                                        <i className="fa fa-linkedin" aria-hidden="true" />
                                    </a>
                                    <a href>
                                        <i className="fa fa-instagram" aria-hidden="true" />
                                    </a>
                                    <a href>
                                        <i className="fa fa-pinterest" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <h4>
                                Order Any Time
                            </h4>
                            <p>
                                Everyday
                            </p>
                            <p>
                                7 / 24
                            </p>
                        </div>
                    </div>
                    <div className="footer-info">

                    </div>
                </div>
            </footer>
            {/* footer section */}

        </div>

    );
}

export default BusinessPage;
