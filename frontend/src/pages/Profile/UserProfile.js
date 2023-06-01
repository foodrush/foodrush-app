import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { Link } from 'react-router-dom';

import Navbar from '../../Navigation/Navbar';
import { UserContext } from '../../contexts/UserContextProvider';
import Business_Navbar from "../../Navigation/Business_Navbar";


function UserProfile() {
    //TODO: needs verification to go on
    const { userName, userInfos, userType, SDGPoints, setSDGPoints } = useContext(UserContext);

    const displaySDG = () => {
        if (userType === 1) {
            return (
                <div className="d-flex justify-content-center p-5">
                    <div className="row text-center">
                        <div className="col-lg-12">
                            <div className="card p-2">
                                <div className="card-body">
                                    <h3 className="mb-0">Your SDG Points:                               <span className='text-success'> {SDGPoints}</span>!</h3>
                                    <br />
                                    <hr />
                                    <h5 className="mb-0">Keep up the good work :)</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    };

    const displayForm = () => {
        if (userType === 1) {
            return (
                <>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {userInfos.phone_number}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            Bay Area, San Francisco, CA
                        </div>
                    </div>
                </>
            );
        }
        if (userType === 2) {
            return (
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Restaurant Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {userInfos.restaurant_name}
                    </div>
                </div>
            )
        }
    };
    useEffect(() => {
        if (userType === 0) {
            return (<div>
                LOGIN FIRST
            </div>)
        }
    }, []);

    return (
        <>
            {/* Navbar */}
            {userType === 2 ?
                (<Business_Navbar />) :
                (<Navbar />)}
            {/* Navbar end*/}
            <div className="d-flex align-items-center bg" >
                <div className="container">
                    {displaySDG()}
                    <div className="main-body">
                        <div className="row gutters-sm gy-3">
                            {/* avatar */}
                            <div className="col-lg-4 ">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                                            <div className="mt-3">
                                                <h4>{userName}</h4>
                                                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* avatar end*/}

                            {/* info */}
                            <div className="col-lg-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">First Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfos.user.first_name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfos.user.last_name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfos.user.email}
                                            </div>
                                        </div>
                                        <hr />
                                        {displayForm()}
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <Link className="btn btn-primary px-4" to="/profile/edit">Edit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* info end */}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserProfile