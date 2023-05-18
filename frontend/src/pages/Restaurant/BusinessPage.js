import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import "jquery-nice-select/css/nice-select.css";
import Business_Navbar from "../../Navigation/Business_Navbar"
import Navbar from "../../Navigation/Navbar";
import {UserContext} from "../../contexts/UserContextProvider";
import banner2 from "./banner2.jpg";
import banner from "../../style/img/hero/banner.jpg";
import Alert from "react-bootstrap/Alert";


function BusinessPage() {
    const [businessData, setBusinessData] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    let businessId = useParams();
    const {userType} = useContext(UserContext)


    useEffect(() => {
        console.log(businessId);

        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/users/businesses/${businessId.id}/`),
                    axios.get(`http://127.0.0.1:8000/api/products/businesses/${businessId.id}/`)
                ]);
                setBusinessData(businessResponse.data);
                setproductResponse(productResponse.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [businessId]);

    if (!businessData || !productResponse) {
        return <div>Loading...</div>;
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
                    setShowAlert(true);
                }

            }).catch((error) => {
                console.error(error);
            })
        }
    };

    const product = () => {
        console.log("askdahjshjd")
        return (
            productResponse.map((product) => {

                var imageUrlWithPrefix;
                if (product.image !== null) {
                    imageUrlWithPrefix = `http://127.0.0.1:8000${product.image}`;
                    console.log(imageUrlWithPrefix);
                }
                return (
                    <div key={product.id} className="col-sm-6 col-lg-4 all pizza">
                        <div className="box">
                            <div>
                                <div className="img-box">
                                    <img src={imageUrlWithPrefix} alt=""/>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        {product.name}
                                    </h5>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Rating:{product.rating} & Review Num:{product.review_num}
                                    </p>
                                    <div className="options">
                                        <h6>
                                            ${product.price}
                                        </h6>
                                        <a href onClick={(e) => {
                                            handleAddToCart(e, product._id);
                                        }}>
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                                 xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 viewBox="0 0 456.029 456.029"
                                                 style={{enableBackground: 'new 0 0 456.029 456.029'}}
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
            {userType === 2 ?
                (<Business_Navbar/>) :
                (<Navbar/>)}
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
                        <li className="active" data-filter="*">All</li>
                        <li data-filter=".burger">Burger</li>
                        <li data-filter=".pizza">Pizza</li>
                        <li data-filter=".pasta">Pasta</li>
                        <li data-filter=".fries">Fries</li>
                    </ul>
                    {showAlert && (
                        <Alert
                            variant="success"
                            style={{ width: "100% "}}
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            <Alert.Heading>
                                This is a success alert which has green background
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
            {/* about section */}
            <section className="about_section layout_padding">
                <div className="container  ">
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="img-box">
                                <img src="images/about-img.png" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        We Are Feane
                                    </h2>
                                </div>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration
                                    in some form, by injected humour, or randomised words which don't look even slightly
                                    believable. If you
                                    are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                                    embarrassing hidden in
                                    the middle of text. All
                                </p>
                                <a href>
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end about section */}

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
                                        <i className="fa fa-map-marker" aria-hidden="true"/>
                                        <span>
                        Location
                      </span>
                                    </a>
                                    <a href>
                                        <i className="fa fa-phone" aria-hidden="true"/>
                                        <span>
                        Call +01 1234567890
                      </span>
                                    </a>
                                    <a href>
                                        <i className="fa fa-envelope" aria-hidden="true"/>
                                        <span>
                        demo@gmail.com
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
                                    Necessary, making this the first true generator on the Internet. It uses a
                                    dictionary of over 200 Latin words, combined with
                                </p>
                                <div className="footer_social">
                                    <a href>
                                        <i className="fa fa-facebook" aria-hidden="true"/>
                                    </a>
                                    <a href>
                                        <i className="fa fa-twitter" aria-hidden="true"/>
                                    </a>
                                    <a href>
                                        <i className="fa fa-linkedin" aria-hidden="true"/>
                                    </a>
                                    <a href>
                                        <i className="fa fa-instagram" aria-hidden="true"/>
                                    </a>
                                    <a href>
                                        <i className="fa fa-pinterest" aria-hidden="true"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <h4>
                                Opening Hours
                            </h4>
                            <p>
                                Everyday
                            </p>
                            <p>
                                10.00 Am -10.00 Pm
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
