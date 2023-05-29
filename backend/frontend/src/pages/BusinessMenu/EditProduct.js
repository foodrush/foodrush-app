import Business_Navbar from '../../Navigation/Business_Navbar'
import { useParams } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { ProductFormContext } from '../../contexts/ProductFormContext';

function EditProduct() {
    const { displayTextFormFields, handleSubmit, displayFileForm, productSubmitted, productAdded, setProductId, getProduct, setEditMode } = useContext(ProductFormContext);
    const { productId } = useParams();

    useEffect(() => {
        setProductId(productId);
        getProduct(productId)
        setEditMode(true)
    }, [productId])

    return (
        <>
            <Business_Navbar />
            <section className='container mt-2'>
                <div className="container-fluid">
                    <div className="row justify-content-center ">
                        <div className="col-lg-10 col-md-8">
                            <div className="row align-items-center pt-md-5 mt-md-5 mb-5">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-title text-center mt-3">
                                            <h3>Edit Product</h3>
                                        </div>
                                        <div className="card-body">
                                            {/* form start */}
                                            <form action="true" onSubmit={handleSubmit}
                                            >
                                                {displayTextFormFields()}
                                                {displayFileForm()}
                                                <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">Submit
                                                    Product</button>
                                            </form>
                                            {productSubmitted && ((productAdded === true)
                                                ?
                                                (<div className="alert alert-success" role="alert">
                                                    The product is succesfully edited.
                                                </div>)
                                                :
                                                (<div className="alert alert-danger" role="alert">
                                                    The product could not be edited.
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

export default EditProduct