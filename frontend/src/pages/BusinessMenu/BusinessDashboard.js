import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navigation/Navbar"
import {Routes, Route, Link, useNavigate} from "react-router-dom";


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

    const Description = () => (
        <p>
            I like coding counters!
            Sum of all counters is now {}
        </p>
    );

    const products = [
        {
            "_id": 0,
            "name": "restaurant",
            "qty": 20,
            "category": 0,
            "price": 25,
            "rating": 4.9,
            "image": "/images/cola.jpg",
            "description": "Refreshing drink",
        },
        {
            "_id": 1,
            "name": "pepsi",
            "qty": 20,
            "category": 0,
            "price": 25,
            "rating": 4.9,
            "image": "/images/cola.jpg",
            "description": "Refreshing drink",
        },
        {
            "_id": 2,
            "name": "water",
            "qty": 20,
            "category": 0,
            "price": 25,
            "rating": 4.9,
            "image": "/images/water.jpg",
            "description": "Refreshing drink",
        },
        {
            "_id": 3,
            "name": "hamburger",
            "qty": 40,
            "category": 1,
            "price": 95,
            "rating": 4.9,
            "image": "/images/burger.jpg",
            "description": "American Burger",
        },
        {
            "_id": 4,
            "name": "fries",
            "qty": 20,
            "category": 1,
            "price": 45,
            "rating": 4.9,
            "image": "/images/fries.jpg",
            "description": "American fast-food",
        },
        {
            "_id": 5,
            "name": "pizza",
            "qty": 20,
            "category": 1,
            "price": 120,
            "rating": 4.9,
            "image": "/images/pizza.jpg",
            "description": "Italian meal",
        },
        {
            "_id": 6,
            "name": "pide",
            "qty": 20,
            "category": 1,
            "price": 89,
            "rating": 4.2,
            "image": "/images/pide.jpg",
            "description": "Turkih Cuisine",
        },
    ];


    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`http://127.0.0.1:8000/api/products/`);
            setData((prevData) => [prevData, ...response.data]);
            setHasMore(response.data.length > 0);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const handleScroll = (event) => {
        const target = event.target.documentElement;
        if (target.scrollTop + target.clientHeight === target.scrollHeight && !loading && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let navigate = useNavigate();
    const routeToRestaurant = (path) =>{
        console.log(path);
        navigate(path);
    }

    const product = () => {
        return(
            data.map((item)=>{
                return (
                    <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 products" onClick={() => routeToRestaurant(item.user)}>
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"/></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"/></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"/></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">{item.name}</a></h6>
                                <h5>{item.price}</h5>
                                <h5>{item.rating}</h5>
                            </div>
                        </div>
                    </div>
                )
            } )
        );
    }

    return (
        <div className="App">
            <Navbar />

        </div>

    );
}
