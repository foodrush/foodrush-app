import React, {useContext, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { Link } from 'react-router-dom';

import Navbar from '../../Navigation/Navbar';
import { UserContext } from '../../contexts/UserContextProvider';
import Business_Navbar from "../../Navigation/Business_Navbar";
import axios from "axios";


function UserProfile() {
    //TODO: needs verification to go on
    const { userName, userType } = useContext(UserContext);
    const [userInfos, setUserInfos] = useState('');
    const [userType2, setUserType] = useState(0);



    useEffect(() => {
        console.log("asdasdasda")
        async function fetchDataBusiness() {
            try {
                const responseSecond = await axios.get('http://127.0.0.1:8000/api/users/business-profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserInfos(responseSecond.data);
                console.log(responseSecond.data)
            }catch (error) {
                console.error(error);
            }
        }


        async function fetchDataCustomer() {
            try {
                const responseSecond = await axios.get('http://127.0.0.1:8000/api/users/customer-profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserInfos(responseSecond.data);
                console.log(responseSecond.data)

            }catch (error) {
                console.error(error);
            }
        }

        if(userType===0){
            return (<div>
                LOGIN FIRST
            </div>)
        }

        if(parseInt(localStorage.getItem("userType")) === 1){
            fetchDataCustomer();
            setUserType(1);

        }else if(parseInt(localStorage.getItem("userType")) === 2){
            fetchDataBusiness();
            setUserType(2);
        }else{
            return (<div>
                LOGIN FIRST
            </div>)
        }
    }, []);



    const displayForm = () => {

        if (userType2 === 1) {
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
                            TEDU, ANKARA
                        </div>
                    </div>
                </>
            );
        }
        if (userType2 === 2) {
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
                                                {userInfos.user && <p>{userInfos.user.first_name}</p>}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfos.user && <p>{userInfos.user.last_name}</p>}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfos.user && <p>{userInfos.user.email}</p>}
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