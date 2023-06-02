import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import './css/style.css';

import "../../style/css/style.css"

import Navbar from '../../Navigation/Navbar';
import Business_Navbar from "../../Navigation/Business_Navbar";
import { UserContext } from "../../contexts/UserContextProvider";
import PopUp from '../../modal/PopUp';
import { useNavigate } from 'react-router';

export default function EditProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");

    let navigate = useNavigate();
    const routeToProfile = () => {
        navigate(`/profile`);
    }

    useEffect(() => {
        decideUser();
    },[])

    const handleClose = () => {
        setIsOpen(false);
        if (popUpType === 1) {
            routeToProfile();
        }
    };

    const { userName, userType, userInfos, setUserInfos } = useContext(UserContext);

    const [user, setUser] = useState({})

    const decideUser = () => {
        if (userType === 1 && userInfos && userInfos.user) {
            setUser({
                email: userInfos.user.email,
                username: userInfos.user.email,
                first_name: userInfos.user.first_name,
                last_name: userInfos.user.last_name,
                phone: userInfos.phone_number,
                address: ""
            });
        }
        if (userType === 2 && userInfos && userInfos.user) {
            setUser({
                email: userInfos.user.email,
                first_name: userInfos.user.first_name,
                last_name: userInfos.user.last_name,
                restaurant_name: userInfos.restaurant_name,
            });
        }
    };
    const handleEditChange = (e, field) => {
        e.preventDefault();
        setUser({ ...user, [field]: e.target.value })
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (userType === 1) {
            const updatedUser = {
                user: {
                    email: user.email,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
                phone_number: user.phone,
            }
            try {
                await axios.put(
                    '/api/users/edit-customer',
                    updatedUser,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ).then(response => {
                    if (response.data !== null) {
                        console.log('User information updated successfully!');
                        setUserInfos(response.data);
                        setIsOpen(true);
                        setPopUpContent("User information updated successfully!");
                        setPopUpType(1);
                    }
                })
            } catch (error) {
                console.error(error);
                if (error.response.status === 400) {
                    setIsOpen(true);
                    setPopUpType(0);
                    if (error.response.data.user.email)
                        setPopUpContent(error.response.data.user.email[0]);

                }
            }
        }
        if (userType === 2) {
            const updatedUser = {
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                },
                restaurant_name: user.restaurant_name,
            }
            try {
                await axios.put(
                    '/api/users/edit-business',
                    updatedUser,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ).then(response => {
                    if (response.data !== null) {
                        console.log('User information updated successfully!');
                        setUserInfos(response.data);
                        setIsOpen(true);
                        setPopUpContent("User information updated successfully!");
                        setPopUpType(1);
                    }
                })
            } catch (error) {
                console.error(error);
                if (error.response.status === 400) {
                    setIsOpen(true);
                    setPopUpType(0);
                    if (error.response.data.user)
                        setPopUpContent(error.response.data.user.email[0]);
                    if(error.response.data.restaurant_name)
                        setPopUpContent("The restaurant name cannot be left blank.");

                }
            }
        }
    };

    const displayForm = () => {
        if (userType === 1) {
            return (
                <>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" name="phone" value={user.phone}
                                onChange={(e) => handleEditChange(e, "phone")} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" name="address" value={user.restaurant_name}
                                onChange={(e) => handleEditChange(e, "restaurant_name")} />
                        </div>
                    </div></>
            );
        }
        if (userType === 2) {
            return (
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Restaurant Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="restaurant_name" value={user.restaurant_name}
                            onChange={(e) => handleEditChange(e, "restaurant_name")} />
                    </div>
                </div>
            )
        }
    };

    return (
        <>
            <PopUp isOpen={isOpen} onClose={handleClose} popUpType={popUpType}>
                {popUpContent}
            </PopUp>
            {/* Navbar */}
            {userType === 2 ?
                (<Business_Navbar />) :
                (<Navbar />)}
            {/* Navbar end*/}
            <div className="d-flex align-items-center bg">
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm gy-3">
                            {/* avatar */}
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                            <div className="mt-3">
                                                <h4>{userName}</h4>
                                                <p className="text-muted font-size-sm">TEDU ANKARA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* avatar end */}
                            {/* info */}
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">First Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="first_name" value={user.first_name}
                                                    onChange={(e) => handleEditChange(e, "first_name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="last_name" value={user.last_name}
                                                    onChange={(e) => handleEditChange(e, "last_name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="email" value={user.email}
                                                    onChange={(e) => handleEditChange(e, "email")} />
                                            </div>
                                        </div>
                                        {displayForm()}
                                        <div className="row">
                                            {/* <div className="col-sm-3" /> */}
                                            <div className="col-sm-9 text-secondary">
                                                <input type="button" className="btn btn-primary px-4 primary-btn" defaultValue="Save Changes" onClick={handleUpdateUser} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* info end*/}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
