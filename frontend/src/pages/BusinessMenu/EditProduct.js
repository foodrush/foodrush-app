import Business_Navbar from '../../Navigation/Business_Navbar'
import { useParams } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { ProductFormContext } from '../../contexts/ProductFormContext';

import PopUp from '../../modal/PopUp';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function EditProduct() {
    const { displayTextFormFields, handleSubmit, displayFileForm, productSubmitted, productAdded, setProductId, getProduct, setEditMode, setProductSubmitted, setProductAdded } = useContext(ProductFormContext);
    const { productId } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");

    const [submit, setSubmit] = useState({});

    const handleClose = () => {
        setIsOpen(false);
        if (popUpType === 1)
            routeEditMenu();
    };

    useEffect(() => {
        setProductId(productId);
        getProduct(productId)
        setEditMode(true)
    }, [productId])

    let navigate = useNavigate();
    const routeEditMenu = () => {
        navigate(`/editmenu`);
    }

    useEffect(() => {
        if(submit instanceof Promise){
            submit.then(({ productAdded, productSubmitted, success }) => {
                if (productSubmitted) {
                    setIsOpen(true);
                    console.log(productAdded);
                    if (productAdded && success) {
                        setPopUpType(1);
                        setPopUpContent(
                            <>
                                <h5>Product successfully edited.</h5>
                            </>
                        );
                        setProductAdded(false);
                    }
                    else {
                        setPopUpType(0);
                        setPopUpContent(
                            <>
                                <h5>Product could not be edited. Please check the added information.</h5>
                            </>
                        );
                    }
                    setProductSubmitted(false);
                }
            });
        }
    }, [submit])
    return (
        <>
            <PopUp isOpen={isOpen} onClose={handleClose} popUpType={popUpType}>
                {popUpContent}
            </PopUp>

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
                                            <form action="true" onSubmit={(e) => {
                                                setSubmit(handleSubmit(e))
                                            }}
                                            >
                                                {displayTextFormFields()}
                                                {displayFileForm()}
                                                <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">Submit
                                                    Product</button>
                                            </form>
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