import React, { useState } from 'react';
import './css/style.css';
import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import axios from 'axios';

export default function Profile(){

    const handleProfileView = async (e) => {
        e.preventDefault();
        console.log(email,password);
        try {
            // isteği düzenleeeeeeeeeeeeee
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
                username:email,
                password:password
            }).then(response => {
                if (response.status === 200) {
                    // Save the JWT token to the state

                    setToken(response.data.token);
                    console.log(response.data);
                    localStorage.setItem('token', JSON.stringify(token));
                    console.log(JSON.parse(localStorage.getItem('token')));

                    localStorage.setItem("name", JSON.stringify(response.data.name));
                    localStorage.setItem("user_id", JSON.stringify(response.data.id));
                    routeToHome('/');

                }
            }).catch(error => {
                console.error(error);
            });


        } catch (error) {

            console.error(error);
        }
    };






    return (
        <div>Profile PAGE</div>
    );
}