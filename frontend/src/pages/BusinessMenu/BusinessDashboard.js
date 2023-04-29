import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navigation/Navbar"
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Business_Navbar from "../../Navigation/Business_Navbar"


import "jquery-nice-select/css/nice-select.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/dist/jquery-ui.min';
import 'font-awesome/css/font-awesome.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

export default function Home(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const responseSecond = await axios.get('http://127.0.0.1:8000/api/users/business-profile/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setStatus(responseSecond.status);
            setIsLoading(false);

        }

        fetchData();
    }, []);



    let navigate = useNavigate();
    const routeToEditMenu = (path) =>{
        console.log(path);
        navigate("/editmenu");
    }



    if(isLoading){
        return null;
    }else{
        if (status === 200) {
            return (
                <div className="App">
                    <Business_Navbar />
                    <div></div>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={routeToEditMenu}>Manage Products</button>
                    <div>

                    </div>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={routeToEditMenu}>Last Orders</button>
                </div>

            );
        }else{
            return <div>Accsess Denied, Login First</div>;

        }
    }


}
