import React, { useState } from "react";
import './css/style.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import BusinessFormR from "./BusinessFormR";

import PopUp from '../../modal/PopUp';

export default function RegisterBusiness() {
    const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [businessName, setBusinessName] = useState('');

    
    const [isOpen, setIsOpen] = useState(false);
    const [popUpContent, setPopUpContent] = useState("");
    const [popUpType, setPopUpType] = useState(0);


    let navigate = useNavigate();
    const routeToLogin = (path) => {
        navigate(path);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/register-business/', {
                name: name,
                last_name: surname,
                password: password,
                email: email,
                restaurant_name: businessName
            }).then(response => {
                if (response.status === 201) {
                    routeToLogin('/login-business');
                }else{
                    console.log("failed");

                }
            }).catch(error => {
                console.error(error);
                                    let popUpMess ="";
                    if (error.response.status == 400) {
                        setIsOpen(true);
                        setPopUpType(0);
                        if(email === "" || businessName === "" || name === "" || surname === "" || password === ""){
                            popUpMess += `None of the fields cannot be empty. \n`
                            
                        }
                        if(!email.includes("@")){
                            popUpMess += `The email you've entered is invalid.\n`
                        }
                    setPopUpContent(popUpMess);
                    }
            });

            // console.log(response.data)
            // Clear the email and password fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setBusinessName('');
            // routeToHome('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const states = { name, surname, email, password, businessName };
    const stateSetters = { setFirstName, setLastName, setEmail, setPassword , setBusinessName};
    
    return (
        <div>
            <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} popUpType={popUpType}>
                {popUpContent}
            </PopUp>
            {/* nav bar end*/}
            <div className="d-lg-flex half justify-content-center">
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-8 offset-xl-1">
                                <h3 className="mb-4 mt-4">Register to <strong>FoodRush</strong> Business</h3>
                                <hr />
                                {/* register form */}
                                <BusinessFormR
                                    states={states}
                                    stateSetters={stateSetters}
                                    handleRegister={handleRegister}
                                />
                                {/* register form */}
                                <div className="d-flex flex-row align-items-center justify-content-center  mt-4">
                                    <div className="text-center">
                                        <p className="lead fw-normal ml-0 mr-3 mb-0"> <Link to="/login-business">Already have an Business account? </Link></p>
                                        <br/>
                                        <p className="lead fw-normal ml-0 mr-3 mb-0">
                                            <Link to="/" style={{ color: 'orangered' }}>
                                                Go Back To Landing Page
                                            </Link>
                                        </p>
                                    </div>
                                </div>
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