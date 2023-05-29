import Business_Navbar from "../../Navigation/Business_Navbar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";

export default function EditMenu() {
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
                    axios.get(`http://127.0.0.1:8000/api/products/businesses/${localStorage.getItem("business_id")}/`)
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


    const fetchProduct = async () => {
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/businesses/${localStorage.getItem("business_id")}/`)
        setproductResponse(productResponse.data);
    };

    const backendURL = 'http://127.0.0.1:8000';

    const deleteProduct = async (product_id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/products/delete-product/${product_id}/`, { headers })
            await fetchProduct();
            console.log(response.data);
        }
        catch (error) {
            console.error(error.response);
        }
    }
    const displayProducts = () => {
        return (productResponse.map(product => {
            const imageUrl = `${backendURL}/static${product.image}`;
            return (
                <tr key={product._id} >
                    {/* image */}
                    <td>
                        <div className="d-flex align-items-center">
                            <div className="symbol symbol-45px me-1">
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    style={{ width: '200px', height: '150px' }}

                                />
                            </div>
                        </div>
                    </td>
                    {/* image end*/}
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
                                    {product.category}
                                </span>
                            </div>
                        </div>
                    </td>
                    {/* name cusine-category end*/}
                    {/* description */}
                    <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                            {product.description}
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
                            {product.count_in_stock}
                        </span>
                    </td>
                    {/* stock end*/}
                    {/* buttons */}
                    <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                            {/* <a
                                    href="#"
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                >

                                </a> */}
                            <Link
                                to={`/edit-product/${product._id}`}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                                {/*begin::Svg Icon | path: icons/duotune/art/art005.svg*/}
                                <span className="svg-icon svg-icon-3">
                                    {/* edit button */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.3"
                                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                            fill="black"
                                        />

                                        <path
                                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                            fill="black"
                                        />
                                    </svg>
                                </span>
                                {/* edit button end*/}

                            </Link>
                            <a
                                href="#"
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            >
                                {/*begin::Svg Icon | path: icons/duotune/general/gen027.svg*/}
                                <span className="svg-icon svg-icon-3"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    {/* delete button */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                            fill="black"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                            fill="black"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                            fill="black"
                                        />
                                    </svg>
                                    {/* delete button end */}
                                </span>
                                {/*end::Svg Icon*/}{" "}
                            </a>
                        </div>
                    </td>
                    {/* buttons end*/}

                </tr>
            );
        })
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        if (status === 200) {
            return (
                <>
                    <Business_Navbar />
                    {/* add new */}
                    <div className="card-header border-0 pt-5 d-flex justify-content-around align-items-center">
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
                                            <th className="min-w-150px text-start">Image</th>
                                            <th className="min-w-150px">Name</th>
                                            <th className="min-w-150px">Description</th>
                                            <th className="min-w-150px">Price</th>
                                            <th className="min-w-150px">Stock</th>
                                            <th className="min-w-150px text-end">Actions</th>
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