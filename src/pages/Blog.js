import React from "react";
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';
import Navbar from "../Navigation/Navbar";

export default function Blog(){
    return (
        <div>
            {/* Header Section Begin */}
            <Navbar />
            {/* Header Section End */}
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
            {/* Breadcrumb Section Begin */}
            <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Blog</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Blog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb Section End */}
            {/* Blog Section Begin */}
            <section className="blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="blog__sidebar">
                                <div className="blog__sidebar__search">
                                    <form action="#">
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit"><span className="icon_search" /></button>
                                    </form>
                                </div>
                                <div className="blog__sidebar__item">
                                    <h4>Categories</h4>
                                    <ul>
                                        <li><a href="#">All</a></li>
                                        <li><a href="#">Beauty (20)</a></li>
                                        <li><a href="#">Food (5)</a></li>
                                        <li><a href="#">Life Style (9)</a></li>
                                        <li><a href="#">Travel (10)</a></li>
                                    </ul>
                                </div>
                                <div className="blog__sidebar__item">
                                    <h4>Recent News</h4>
                                    <div className="blog__sidebar__recent">
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-1.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>09 Kinds Of Vegetables<br /> Protect The Liver</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </a>
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-2.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>Tips You To Balance<br /> Nutrition Meal Day</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </a>
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-3.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>4 Principles Help You Lose <br />Weight With Vegetables</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="blog__sidebar__item">
                                    <h4>Search By</h4>
                                    <div className="blog__sidebar__item__tags">
                                        <a href="#">Apple</a>
                                        <a href="#">Beauty</a>
                                        <a href="#">Vegetables</a>
                                        <a href="#">Fruit</a>
                                        <a href="#">Healthy Food</a>
                                        <a href="#">Lifestyle</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
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
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
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
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
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
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="blog__item">
                                        <div className="blog__item__pic">
                                            <img src="img/blog/blog-4.jpg" alt="" />
                                        </div>
                                        <div className="blog__item__text">
                                            <ul>
                                                <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                                <li><i className="fa fa-comment-o" /> 5</li>
                                            </ul>
                                            <h5><a href="#">Cooking tips make cooking simple</a></h5>
                                            <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                                quaerat </p>
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="blog__item">
                                        <div className="blog__item__pic">
                                            <img src="img/blog/blog-4.jpg" alt="" />
                                        </div>
                                        <div className="blog__item__text">
                                            <ul>
                                                <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                                <li><i className="fa fa-comment-o" /> 5</li>
                                            </ul>
                                            <h5><a href="#">The Moment You Need To Remove Garlic From The Menu</a></h5>
                                            <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                                quaerat </p>
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="blog__item">
                                        <div className="blog__item__pic">
                                            <img src="img/blog/blog-6.jpg" alt="" />
                                        </div>
                                        <div className="blog__item__text">
                                            <ul>
                                                <li><i className="fa fa-calendar-o" /> May 4,2019</li>
                                                <li><i className="fa fa-comment-o" /> 5</li>
                                            </ul>
                                            <h5><a href="#">Cooking tips make cooking simple</a></h5>
                                            <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam
                                                quaerat </p>
                                            <a href="#" className="blog__btn">READ MORE <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="product__pagination blog__pagination">
                                        <a href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#"><i className="fa fa-long-arrow-right" /></a>
                                    </div>
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
    );

}