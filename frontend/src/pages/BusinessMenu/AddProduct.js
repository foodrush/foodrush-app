import Business_Navbar from '../../Navigation/Business_Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext, useEffect } from 'react';
import { ProductFormContext } from '../../contexts/ProductFormContext';
import PopUp from '../../modal/PopUp';
import { useNavigate } from 'react-router';
function AddProduct() {
    const { handleSubmit, displayFileForm, productSubmitted, productAdded, setEditMode, setInitialValues, displayTextFormFieldsAdd, setProductAdded, setProductSubmitted } = useContext(ProductFormContext);

    const [isOpen, setIsOpen] = useState(false);
    const [popUpType, setPopUpType] = useState(3);
    const [popUpContent, setPopUpContent] = useState("");

    const [submit, setSubmit] = useState({});

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

    const handleClose = () => {
        setIsOpen(false);
        if (popUpType === 1)
            routeEditMenu();
    };

    let navigate = useNavigate();
    const routeEditMenu = () => {
        navigate(`/editmenu`);
    }

    useEffect(() => {
        console.log(submit);
        if(submit instanceof Promise){
            submit.then(({ productAdded, productSubmitted, success }) => {
                if (productSubmitted) {
                    setIsOpen(true);
                    console.log(productAdded);
                    if (productAdded && success) {
                        setPopUpType(1);
                        setPopUpContent(
                            <>
                                <h5>Product successfully added.</h5>
                            </>
                        );
                        setProductAdded(false);
                    }
                    else {
                        setPopUpType(0);
                        setPopUpContent(
                            <>
                                <h5>Product could not be added. Please check the added information.</h5>
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
                                            <form action="#" onSubmit={(e) => {
                                                setSubmit(handleSubmit(e))
                                            }}
                                            >
                                                {displayTextFormFieldsAdd()}
                                                {displayFileForm()}
                                                <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">Add
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

export default AddProduct;