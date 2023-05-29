import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './css/style.css';

function BusinessFormR({ handleRegister, states, stateSetters }) {
    const { name, surname, email, password, businessName } = states;
    const { setFirstName, setLastName, setBusinessName, setEmail, setPassword } = stateSetters;
    return (
        <div> {/* register form */}
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
                        <input type="text" className="form-control" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    {/* last name input end */}
                    {/* business name input */}
                    <div className="form-group col-12">
                        <label htmlFor="businessName" className="form-label">Business Name</label>
                        <input type="text" className="form-control" id="businessName" onChange={(e) => setBusinessName(e.target.value)} />
                    </div>
                    {/* business name input end */}
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
    )
}

export default BusinessFormR
