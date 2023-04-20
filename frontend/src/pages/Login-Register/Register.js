import React, { useState, useEffect } from 'react';
import './css/style.css';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register(){
    const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    let navigate = useNavigate();
    const routeToLogin = (path) =>{
        console.log(path);
        navigate(path);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(email,password);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register-customer/', {
                first_name:name,
                last_name:surname,
                phone_number:phone,
                email:email,
                name: name,
                password:password
            }).then(response => {
                if (response.status === 200) {
                    routeToLogin('/login');

                }
            }).catch(error => {
                    console.error(error);
                });

            console.log(response.data)
            // Clear the email and password fields
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            // routeToHome('/login');
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
                                <h3 className="mb-4 mt-4">Register to <strong>FoodRush</strong></h3>
                                <hr />
                                {/* register form */}
                                <form action="#" method="post" onSubmit={handleRegister}>
                                    <div className="row">
                                        {/* name input */}
                                        <div className="form-group col-md-6 ">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        {/* name input end */}
                                        {/* last name input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" onChange={(e) => setLastName(e.target.value)}/>
                                        </div>
                                        {/* last name input end */}
                                        {/* phone number */}
                                        <div className="form-outline col-12">
                                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                            <input type="tel" id="phoneNumber" className="form-control form-control-lg" onChange={(e) => setPhoneNumber(e.target.value)}/>
                                        </div>
                                        {/* phone number end */}
                                        {/* Email input */}
                                        <div className="form-group col-12">
                                            <label htmlFor="username">Email</label>
                                            <input type="text" className="form-control" placeholder="your-email@gmail.com" id="username" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        {/* Email input end*/}
                                        {/* Password input */}
                                        <div className="form-group mb-3 col-12">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" value={password} className="form-control" placeholder="Your Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {/* Password input end */}
                                    </div>
                                    <div className="d-flex mb-5 align-items-center">
                                        {/* Checkbox */}
                                        <label className="control control--checkbox mb-0" htmlFor="termsOfService">
                                            <input className="checkbox" type="checkbox" id="termsOfService" />
                                            I agree all statements in <a href="#!">Terms of service</a>
                                            <div className="control__indicator" f />
                                        </label>
                                    </div>
                                    {/* Register Button */}
                                    <input type="submit" defaultValue="Register" className="btn btn-block btn-primary mb-4" />
                                </form>
                                {/* register form */}
                            </div>
                            <div className="col-md-5">
                                {/* login page link */}
                                <div className="text-center mb-4">
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
                                </div>
                                {/* login page link end */}
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