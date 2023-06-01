import React, {useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { Link } from 'react-router-dom';

import Navbar from '../../Navigation/Navbar';
import { UserContext } from '../../contexts/UserContextProvider';
import Business_Navbar from "../../Navigation/Business_Navbar";


function UserProfile() {
    //TODO: needs verification to go on
    const {userName,userType,userInfos} = useContext(UserContext);

    useEffect(() => {
        console.log(userInfos.user);
        if(userType===0){
            return (<div>
                LOGIN FIRST
            </div>)
        }
    }, []);

    return (
        <>
            {/* Navbar */}
            {userType === 2 ?
                (<Business_Navbar/>) :
                (<Navbar/>)}
            {/* Navbar end*/}
            <div className="d-flex align-items-center bg" >
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
                                            <h4>{userName}</h4>
                                            <p className="text-muted font-size-sm">TEDU, Ankara</p>
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
                                                {userInfos.user.first_name}
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
                                                TEDU, Ankara
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