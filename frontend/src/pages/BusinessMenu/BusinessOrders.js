import Business_Navbar from "../../Navigation/Business_Navbar";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../../contexts/UserContextProvider";
import {Backdrop, Button, CircularProgress} from "@mui/material";

export default function BusinessOrders() {
    const [status, setStatus] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {userId} = useContext(UserContext)

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/users/business-profile/`, {headers}),
                    axios.get(`http://127.0.0.1:8000/api/users/business-profile/orders/`, {headers})
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


    const backendURL = 'http://127.0.0.1:8000';
    const displayItems = () => {
        return (
            <div>
                {productResponse.map((order) => (
                    <div key={order._id}>
                        <h3>Order ID: {order._id}</h3>

                        <ul>
                            {order.order_items.map((item) => (
                                <li key={item._id}>
                                    <p>Item Name: {item.name}</p>
                                    <p>Quantity: {item.qty}</p>
                                    <p>Price: {item.price}</p>
                                    {/* Render other item properties as needed */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }
    let navigate = useNavigate();

    const routeToRestaurant = (path) => {
        navigate(`/business/${path}`);
    }

    const displayProducts = () => {

        return ((productResponse.map(order => {
                return (order.order_items.map((product) => {
                        const imageUrl = `${backendURL}/static${product.image}`;
                        return (
                            <tr key={product._id}>
                                {/* orderID */}
                                <td>
                            <span className="text-muted fw-bold text-muted d-block fs-7">
                            {order._id}
                            </span>
                                </td>
                                {/* orderID end*/}
                                {/* image */}
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="symbol symbol-45px me-1">
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                style={{width: '200px', height: '150px'}}

                                            />
                                        </div>
                                    </div>
                                </td>
                                {/* image end*/}
                                {/* name  */}
                                <td>
                                    <div className="d-flex align-items-center align-self-center">
                                        <div className="d-flex justify-content-start flex-column ">
                                            {/* name */}
                                            <a
                                                href="#"
                                                className="text-dark fw-bolder text-hover-primary fs-6"
                                            >
                                                {product.name}
                                            </a>

                                        </div>
                                    </div>
                                </td>
                                {/* name  end*/}
                                {/* description */}
                                <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                            {product.qty}
                        </span>
                                </td>
                                {/* description end*/}
                                {/* price */}
                                <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                            {product.price}
                        </span>
                                </td>
                                {/* price end*/}
                                {/* stock */}
                                <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7 " onClick={() => routeToRestaurant(product._id)}>
                            {product.business_name}
                        </span>
                                </td>
                                {/* stock end*/}
                                {/* customer first_name */}
                                <td>
                                    <span className="text-muted fw-bold text-muted d-block fs-7">
                                        {order.customer.user.first_name} {order.customer.user.last_name}
                                        <br />
                                        {order.customer.user.email}
                                    </span>
                                </td>
                                {/* customer first_name end*/}
                                {/* created_at */}
                                <td>
                                <span className="text-muted fw-bold text-muted d-block fs-7">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                                </td>
                                {/* created_at end*/}

                            </tr>
                        )
                    })

                )
            })
        ))
    };


    const displayProductsa = () => {
        return (
            (productResponse.map(order => {
                    return ((order.order_items.map((product) => {
                        return (
                            <tr key={product._id}>

                                {/* name cusine-category */}
                                <td>
                                    <div className="d-flex align-items-center align-self-center">
                                        <div className="d-flex justify-content-start flex-column ">
                                            {/* name */}
                                            <a
                                                href="#"
                                                className="text-dark fw-bolder text-hover-primary fs-6"
                                            >
                                                {product.name}
                                            </a>
                                            {/* Cusine - category */}
                                            <span className="text-muted fw-bold text-muted d-block fs-7">
                                    {product.name}
                                </span>
                                        </div>
                                    </div>
                                </td>
                                {/* name cusine-category end*/}


                            </tr>
                        )
                    })))
                })
            ))
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
                <>
                    <Business_Navbar/>
                    {/* add new */}
                    <div className="card-header border-0 pt-5 d-flex justify-content-around align-items-center">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bolder fs-3 mb-1">Orders</span>
                        </h3>
                    </div>
                    {/* add new */}

                    {/* table card */}
                    <div className="container-md">
                        <div className="card-body py-3">
                            {/*begin::Table container*/}
                            <div className="table-responsive">
                                {/*begin::Table*/}
                                <table
                                    className="table table-row-dashed table-row-gray-300 align-middle align-items-center gs-0 gy-4">
                                    {/*begin::Table head*/}
                                    <thead>
                                    <tr className="fw-bolder text-muted">
                                        <th className="min-w-150px text-start">Order ID</th>
                                        <th className="min-w-150px">Image</th>
                                        <th className="min-w-150px">Product Name</th>
                                        <th className="min-w-150px">Quantity</th>
                                        <th className="min-w-150px text-start">Price</th>
                                        <th className="min-w-150px">Business Name</th>
                                        <th className="min-w-150px">Customer Infos</th>
                                        <th className="min-w-150px">Order Date</th>
                                    </tr>
                                    </thead>
                                    {/*end::Table head*/}

                                    {/*begin::Table body*/}
                                    <tbody>
                                    {displayProducts()}
                                    </tbody>
                                    {/*end::Table body*/}
                                </table>
                                {/*end::Table*/}
                            </div>
                            {/*end::Table container*/}
                        </div>
                    </div>
                    {/* table card end */}
                </>
            );
        } else {
            return <div>Accsess Denied, Login First</div>;
        }
    }
}