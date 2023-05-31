import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import './css/style.css';
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

    const handleClose = () => {
        setIsOpen(false);
        if (popUpType === 1) {
            routeToProfile();
        }
    };

    const { userName, userType, userInfos, setUserInfos, fetchDataCustomer } = useContext(UserContext);
    const [customer, setCustomer] = useState({
        email: userInfos.user.email,
        username: userInfos.user.email,
        first_name: userInfos.user.first_name,
        last_name: userInfos.user.last_name,
        phone: userInfos.phone_number,
        address: ""
    });

    const handleEditChange = (e, field) => {
        e.preventDefault();
        setCustomer({ ...customer, [field]: e.target.value })
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const updatedUser = {
            user: {
                email: customer.email,
                username: customer.username,
                first_name: customer.first_name,
                last_name: customer.last_name,
            },
            phone_number: customer.phone,
        };
        try {
            await axios.put(
                'http://127.0.0.1:8000/api/users/edit-customer',
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
                if(error.response.data.user.email)
                    setPopUpContent(error.response.data.user.email[0]);
                
            }
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
                                                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
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
                                                <input type="text" className="form-control" name="first_name" value={customer.first_name}
                                                    onChange={(e) => handleEditChange(e, "first_name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="last_name" value={customer.last_name}
                                                    onChange={(e) => handleEditChange(e, "last_name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="email" value={customer.email}
                                                    onChange={(e) => handleEditChange(e, "email")} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="phone" value={customer.phone}
                                                    onChange={(e) => handleEditChange(e, "phone")} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" name="address" value={customer.address}
                                                    onChange={(e) => handleEditChange(e, "address")} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* <div className="col-sm-3" /> */}
                                            <div className="col-sm-9 text-secondary">
                                                <input type="button" className="btn btn-primary px-4" defaultValue="Save Changes" onClick={handleUpdateUser} />
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
