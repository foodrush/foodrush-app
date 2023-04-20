import React, { useState } from 'react';
import './css/style.css';

// ON HoVER
import '../../style/css/style.css';

import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import axios from 'axios';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    let navigate = useNavigate();
    const routeToHome = (path) =>{
        console.log(path);
        navigate(path);
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email,password);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
                username:email,
                password:password
            }).then(response => {
                if (response.status === 200) {
                    // Save the JWT token to the state
                    
                    setToken(response.data.access);

                    // states are async as well -- token:""
                    localStorage.setItem('token', JSON.stringify(response.data.access));
                    // console.log(JSON.parse(localStorage.getItem('token')));
                    localStorage.setItem("name", JSON.stringify(response.data.name));
                    localStorage.setItem("user_id", JSON.stringify(response.data.id));
                    routeToHome('/');

                }
            }).catch(error => {
                console.error(error);
            });


            // Clear the email and password fields
            setEmail('');
            setPassword('');
        } catch (error) {

            console.error(error);
        }
    };

    const handleProtected = async (e) => {
        e.preventDefault();

        try {
            // Make an authorized request using the JWT token
            const response = await axios.get('/api/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <div>
            {/* nav bar with name */}
            <Navbar/>
            {/* nav bar end*/}
            <div className="d-lg-flex half justify-content-center">
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-8 offset-xl-1">
                                <h3 className="mb-4 mt-4">Login to <strong>FoodRush</strong></h3>
                                <hr />
                                {/* login form */}
                                <form action="#" method="post" onSubmit={handleLogin}>
                                    <div className="form-group first">
                                        {/* Email input */}
                                        <label htmlFor="username">Email</label>
                                        <input type="text" value={email} className="form-control" placeholder="your-email@gmail.com" id="username"  onChange={(e) => setEmail(e.target.value)}/>
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
                                        {/* Forgot password */}
                                        <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                    </div>
                                    {/* Log in Button */}
                                    <input type="submit" defaultValue="Login" className="btn btn-block btn-primary" />
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom">
                                    </div>
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                    {/* log in with socials */}
                                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mt-4">
                                        <p className="lead fw-normal ml-0 mr-3 mb-0">Login with</p>
                                        <div className="sol-sm-12">
                                            <button type="button" className="btn btn-primary btn-social mx-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                            </button>
                                            <button type="button" className="btn btn-primary btn-social mx-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                                </svg>
                                            </button>
                                            <button type="button" className="btn btn-primary btn-social mx-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {/* log in with socials end*/}
                                </form>
                                {/* login form */}
                            </div>
                            <div className="col-md-5">
                                {/* register page link */}
                                <div className="text-center">
                                    <p>Not a member? <Link to="/register">Register</Link></p>
                                </div>
                                {/* register page link end */}
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