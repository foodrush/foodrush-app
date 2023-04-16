import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { Link } from 'react-router-dom';

import Navbar from '../../Navigation/Navbar';

// https://www.bootdey.com/snippets/view/profile-with-data-and-skills

function UserProfile() {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Navbar end*/}
            <div className="d-flex align-items-center bg">
                <div className="container ">
                    <div className="main-body">
                        <div className="row gutters-sm gy-3">
                            {/* avatar */}
                            <div className="col-lg-4 ">
                                <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                                        <div className="mt-3">
                                            <h4>John Doe</h4>
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
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                Kenneth Valdez
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                fip@jukmuh.al
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                (239) 816-9029
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