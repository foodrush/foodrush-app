import React, {useState, useEffect} from "react";
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
import BusinessOrders from "./BusinessOrders";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Home() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [productResponse, setproductResponse] = useState(null);


    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`api/users/business-profile/`, {headers}),
                    axios.get(`api/users/business-profile/orders/`, {headers})
                ]);
                setStatus(businessResponse.status);
                setproductResponse(productResponse.data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }

        fetchData();
    }, []);


    let navigate = useNavigate();
    const routeToEditMenu = (path) => {
        navigate("/editmenu");
    }
    const routeToOrders = (path) => {
        navigate("/business-orders");
    }

    const calculateTotalEarning = () => {
        let totalEarning = 0;

        productResponse.forEach(order => {
            totalEarning += parseFloat(order.total_price);
        });

        return totalEarning;
    };

    if (isLoading) {
        return <div>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop></div>;
    } else {
        if (status === 200) {
            return (
                <div className="App">
                    <Business_Navbar/>
                    <br/>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={routeToEditMenu}>Manage
                        Products
                    </button>
                    <br/>
                    <br/>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        color: '#252525'
                    }}>
                        Total Earning From the FoodRush is: ${calculateTotalEarning()}
                    </h1>
                    <br/>
                </div>

            );
        } else {
            return <div>Accsess Denied, Login First</div>;

        }
    }


}
