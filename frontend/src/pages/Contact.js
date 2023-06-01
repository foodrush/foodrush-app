import React, {useContext} from "react";

import '../style/css/style.css';
import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import '../style/css/elegant-icons.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

import Navbar from "../Navigation/Navbar";
import Business_Navbar from "../Navigation/Business_Navbar";
import {UserContext} from "../contexts/UserContextProvider";


export default function Contact(){
    const {userType} = useContext(UserContext)


    return (
        <div>
            {userType === 2 ?
                (<Business_Navbar/>) :
                (<Navbar/>)}

            {/* Contact Section Begin */}
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone" />
                                <h4>Phone</h4>
                                <p>+90 534 510 3978</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt" />
                                <h4>Address</h4>
                                <p>TEDU ANKARA</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt" />
                                <h4>Open time</h4>
                                <p>7/24</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt" />
                                <h4>Email</h4>
                                <p>gokmen.caglar@tedu.edu.tr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section End */}
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