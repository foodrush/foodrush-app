import Business_Navbar from "../../Navigation/Business_Navbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";

export default function BusinessOrders() {
    const [status, setStatus] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useContext(UserContext)

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/users/business-profile/`, { headers }),
                    axios.get(`http://127.0.0.1:8000/api/users/business-profile/orders/`, { headers })
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


    const displayProducts = () => {

        return((productResponse.map(order => {
                return(order.order_items.map((product) => {
                    console.log(product)
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
                        <span className="text-muted fw-bold text-muted d-block fs-7 ">
                            {product.business_name}
                        </span>
                            </td>
                            {/* stock end*/}

                        </tr>
                    )
                }))
            })
        ))
    };



    const displayProductsa = () => {
        //console.log(productResponse);
        return(
       (productResponse.map(order => {
                return((order.order_items.map((product) => {
                    console.log(product)
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
        return <div>Loading...</div>;
    } else {
        if (status === 200) {
            return (
                <>
                    <Business_Navbar />
                    {/* add new */}
                    <div className="card-header border-0 pt-5 d-flex justify-content-between">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bolder fs-3 mb-1">Manage Products</span>
                        </h3>
                        <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="true" data-bs-original-title="Click to add a user">
                            <Link className="btn btn-secondary d-block" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends" to="/editmenu/add-product">
                                {/*begin::Svg Icon | path: icons/duotune/arrows/arr075.svg*/}
                                <span className="svg-icon svg-icon-3"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="11.364" y="20.364" width={16} height={2} rx={1} transform="rotate(-90 11.364 20.364)" fill="black" />
                                    <rect x="4.36396" y="11.364" width={16} height={2} rx={1} fill="black" />
                                </svg>
                                </span>
                                Add
                                {/*end::Svg Icon*/}
                            </Link>
                        </div>
                    </div>
                    {/* add new */}

                    {/* table card */}
                    <div className="container-md">
                        <div className="card-body py-3">
                            {/*begin::Table container*/}
                            <div className="table-responsive">
                                {/*begin::Table*/}
                                <table className="table table-row-dashed table-row-gray-300 align-middle align-items-center gs-0 gy-4">
                                    {/*begin::Table head*/}
                                    <thead>
                                    <tr className="fw-bolder text-muted">
                                        <th className="min-w-150px text-start">Order ID</th>
                                        <th className="min-w-150px text-start">Image</th>
                                        <th className="min-w-150px">Product Name</th>
                                        <th className="min-w-150px">Quantity</th>
                                        <th className="min-w-150px text-start">Price</th>
                                        <th className="min-w-150px">Business Name</th>
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