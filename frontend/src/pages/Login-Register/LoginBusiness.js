import React, { useState, useContext } from 'react';
import './css/style.css';

// ON HoVER
import '../../style/css/style.css';

import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import axios from 'axios';
import { wait } from "@testing-library/user-event/dist/utils";
import { UserContext } from "../../contexts/UserContextProvider";

import PopUp from '../../modal/PopUp';

export default function LoginBusiness() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [accsesstoken, setAccsessToken] = useState('');
    const { setUserId, setIsBusiness, setUserName, setUserType } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const [popUpContent, setPopUpContent] = useState("");
    const [popUpType, setPopUpType] = useState(0);



    let navigate = useNavigate();
    const routeToDashboard = (path) => {

        navigate(path);
    }



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login/', {
                username: email,
                password: password
            });
            if (response.status === 200) {
                const responseSecond = await axios.get('/api/users/business-profile/', {
                    headers: {
                        Authorization: `Bearer ${response.data.access}`
                    }
                });
                if (responseSecond.status === 200) {

                    setAccsessToken(response.data.access)
                    localStorage.setItem('token', (response.data.access));
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem("user_id", response.data.id);
                    localStorage.setItem("userType", 2);

                    localStorage.setItem("business_id", responseSecond.data.id);
                    setUserId(responseSecond.data.id);
                    setIsBusiness(false);
                    setUserName(response.data.name);
                    setUserType(2);
                    routeToDashboard('/business');

                }
                // Clear the email and password fields
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error(error);
            if (error.response.status == 401) {
                setIsOpen(true);
                setPopUpContent(`${error.response.data.detail}.
                \nCheck your username and password please.`);
                setPopUpType(0);
            }
            if (error.response.status == 400) {
                setIsOpen(true);
                setPopUpType(0);
                let popUpMess = "";
                if (error.response.data.password)
                    popUpMess += "The password field cannot be blank. \n"
                if (error.response.data.username)
                    popUpMess += "The email field cannot be blank.\n"
                if (error.response.data.password && error.response.data.username)
                    popUpMess = "The password and email fields cannot be blank"
                if(error.response.data.detail)
                    popUpMess = <>
                    <h5>This is the business login page. Are you trying to login with customer credentials?</h5>
                    <Link to="/login">Login Page</Link>
                    </>
                setPopUpContent(popUpMess)
            }
        }
    };

    return (
        <div>
            <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} popUpType={popUpType}>
                {popUpContent}
            </PopUp>

            <div className="d-lg-flex half justify-content-center">
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-8 offset-xl-1">
                                <h3 className="mb-4 mt-4">Business Login to <strong>FoodRush</strong></h3>
                                <hr />
                                {/* login form */}
                                <form onSubmit={handleLogin}>
                                    <div className="form-group first">
                                        {/* Email input */}
                                        <label htmlFor="username">Email</label>
                                        <input type="text" value={email} className="form-control" placeholder="your-email@gmail.com" id="username" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    {/* Password input */}
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" value={password} className="form-control" placeholder="Your Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="d-flex mb-5 align-items-center">
                                        {/* Checkbox */}
                                        <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                            <input type="checkbox" defaultChecked="checked" />
                                            <div className="control__indicator" />
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <p className="lead fw-normal ml-0 mr-3 mb-0"> <Link to="/register-business">Want to Register as Business? </Link></p>
                                        <br/>
                                        <br/>
                                    </div>
                                    {/* Log in Button */}
                                    <input type="submit" defaultValue="Login" className="btn btn-block btn-primary" />
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom">
                                    </div>
                                </form>
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                {/* log in with socials */}
                                <div className="d-flex flex-row align-items-center justify-content-center  mt-4">
                                    <div className="text-center">
                                        <p className="lead fw-normal ml-0 mr-3 mb-0"> <Link to="/login">Login as Customer? </Link></p>
                                        <br/>
                                        <p className="lead fw-normal ml-0 mr-3 mb-0"> <Link to="/register">Want to register as a Customer? </Link></p>
                                        <br/>
                                        <p className="lead fw-normal ml-0 mr-3 mb-0">
                                            <Link to="/" style={{ color: 'orangered' }}>
                                                Go Back To Landing Page
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                {/* login form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 mr-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-egg-fried" viewBox="0 0 16 16">
                                <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z">
                                </path>
                            </svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">© 2023 FoodRush</span>
                    </div>
                </footer>
            </div>
            {/* footer end */}
        </div>
    );
}