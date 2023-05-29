import Business_Navbar from '../../Navigation/Business_Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext, useEffect } from 'react';
import { ProductFormContext } from '../../contexts/ProductFormContext';

function AddProduct() {
    const { handleSubmit, displayFileForm, productSubmitted, productAdded, setEditMode, setInitialValues, displayTextFormFieldsAdd } = useContext(ProductFormContext);

    useEffect(() => {
        setEditMode(false)
        setInitialValues(() => ({
            name: "",
            price: "",
            cuisine: "",
            category: "",
            count_in_stock: "",
            description: "",
            image: null
        }))
    }, [])

    return (
        <>
            <Business_Navbar />
            {/* Add Product */}
            <section className='container mt-2'>
                <div className="container-fluid">
                    <div className="row justify-content-center ">
                        <div className="col-lg-10 col-md-8">
                            <div className="row align-items-center pt-md-5 mt-md-5 mb-5">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-title text-center mt-3">
                                            <h3>Add Product</h3>
                                        </div>
                                        <div className="card-body">
                                            {/* form start */}
                                            <form action="#" onSubmit={handleSubmit}
                                            >
                                                {displayTextFormFieldsAdd()}
                                                {displayFileForm()}
                                                <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">Add
                                                    Product</button>
                                            </form>
                                            {productSubmitted && ((productAdded === true) ?
                                                (<div className="alert alert-success" role="alert">
                                                    The product is succesfully added.
                                                </div>)
                                                :
                                                (<div className="alert alert-danger" role="alert">
                                                    The product could not be added.
                                                </div>))
                                            }
                                            {/* form end */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddProduct;