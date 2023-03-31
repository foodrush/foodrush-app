import React from "react";
import Navbar from "../Navigation/Navbar";
import { Routes, Route, Link} from "react-router-dom";
import '../style/css/style.css';
import banner from "../style/img/hero/banner.jpg";
import '../style/css/bootstrap.min.css';
import '../style/css/slicknav.min.css';
import '../style/css/nice-select.css';
import '../style/css/font-awesome.min.css';
//import '../style/css/jquery-ui.min.css';
import '../style/css/elegant-icons.css';


export default function Market(){
    return (
        <div>

            {/* Humberger Begin */}
            <div className="humberger__menu__overlay" />
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <a href="#"><img src="img/logo.png" alt="" /></a>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li><a href="#"><i className="fa fa-heart" /> <span>1</span></a></li>
                        <li><a href="#"><i className="fa fa-shopping-bag" /> <span>3</span></a></li>
                    </ul>
                    <div className="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__language">
                        <img src="img/language.png" alt="" />
                        <div>English</div>
                        <span className="arrow_carrot-down" />
                        <ul>
                            <li><a href="#">Spanis</a></li>
                            <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div className="header__top__right__auth">
                        <a href="#"><i className="fa fa-user" /> Login</a>
                    </div>
                </div>
                <nav className="humberger__menu__nav mobile-menu">
                    <ul>
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/market">Shop</Link></li>
                        <li><a href="#">Pages</a>
                            <ul className="header__menu__dropdown">
                                <li><a href="./shop-details.html">Shop Details</a></li>
                                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                <li><a href="./checkout.html">Check Out</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap" />
                <div className="header__top__right__social">
                    <a href="#"><i className="fa fa-facebook" /></a>
                    <a href="#"><i className="fa fa-twitter" /></a>
                    <a href="#"><i className="fa fa-linkedin" /></a>
                    <a href="#"><i className="fa fa-pinterest-p" /></a>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li><i className="fa fa-envelope" /> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>
            {/* Humberger End */}
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
                                <h2>Organi Shop</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb Section End */}
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
                                        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min={10} data-max={540}>
                                            <div className="ui-slider-range ui-corner-all ui-widget-header" />
                                            <span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" />
                                            <span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" />
                                        </div>
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <input type="text" id="minamount" />
                                                <input type="text" id="maxamount" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar__item sidebar__item__color--option">
                                    <h4>Colors</h4>
                                    <div className="sidebar__item__color sidebar__item__color--white">
                                        <label htmlFor="white">
                                            White
                                            <input type="radio" id="white" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--gray">
                                        <label htmlFor="gray">
                                            Gray
                                            <input type="radio" id="gray" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--red">
                                        <label htmlFor="red">
                                            Red
                                            <input type="radio" id="red" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--black">
                                        <label htmlFor="black">
                                            Black
                                            <input type="radio" id="black" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--blue">
                                        <label htmlFor="blue">
                                            Blue
                                            <input type="radio" id="blue" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__color sidebar__item__color--green">
                                        <label htmlFor="green">
                                            Green
                                            <input type="radio" id="green" />
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Popular Size</h4>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="large">
                                            Large
                                            <input type="radio" id="large" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="medium">
                                            Medium
                                            <input type="radio" id="medium" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="small">
                                            Small
                                            <input type="radio" id="small" />
                                        </label>
                                    </div>
                                    <div className="sidebar__item__size">
                                        <label htmlFor="tiny">
                                            Tiny
                                            <input type="radio" id="tiny" />
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
                        <div className="col-lg-9 col-md-7">
                            <div className="product__discount">
                                <div className="section-title product__discount__title">
                                    <h2>Sale Off</h2>
                                </div>
                                <div className="row">
                                    <div className="product__discount__slider owl-carousel">
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-1.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Dried Fruit</span>
                                                    <h5><a href="#">Raisin’n’nuts</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-2.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Vegetables</span>
                                                    <h5><a href="#">Vegetables’package</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-3.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Dried Fruit</span>
                                                    <h5><a href="#">Mixed Fruitss</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-4.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Dried Fruit</span>
                                                    <h5><a href="#">Raisin’n’nuts</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-5.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Dried Fruit</span>
                                                    <h5><a href="#">Raisin’n’nuts</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg" data-setbg="img/product/discount/pd-6.jpg">
                                                    <div className="product__discount__percent">-20%</div>
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                        <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <span>Dried Fruit</span>
                                                    <h5><a href="#">Raisin’n’nuts</a></h5>
                                                    <div className="product__item__price">$30.00 <span>$36.00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                            <h6><span>16</span> Products found</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2" />
                                            <span className="icon_ul" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-5.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-9.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-10.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-11.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6">
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg="img/product/product-12.jpg">
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart" /></a></li>
                                                <li><a href="#"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart" /></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__pagination">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#"><i className="fa fa-long-arrow-right" /></a>
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