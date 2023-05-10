import Business_Navbar from '../../Navigation/Business_Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import AddProductValidation from './AddProductValidation';

function AddProduct() {
    const token = localStorage.getItem("token")

    const formTextFields = ["name", "price", "cuisine", "category", "count_in_stock", "description"];
    const initialValues = {
        name: "",
        price: "",
        cuisine: "",
        category: "",
        count_in_stock: "",
        description: "",
        image: null
    };

    const [fileLabel, setFileLabel] = useState("Choose file...")
    const [productAdded, setProductAdded] = useState(false);
    const [productSubmitted, setProductSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // formData -- returns an array of arrays -- each input is an array
        const formData = new FormData(e.currentTarget);
        console.log([...formData]);
        setProductSubmitted(true);
        try {
            
            const response = await axios.post('http://127.0.0.1:8000/api/products/add-product/', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`, // If authentication is required
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.status === 201)
                setProductAdded(true);
            else
                setProductAdded(false)
        } catch (error) {
            console.error(error.response.data)
        }
    }

    // Formik -- form validation
    // errors -- holds the yup validation errors
    // touched -- formik keeps track of whether the are has been touched before
    // onBlur -- to keep track of whether element is touched
    const { handleChange, errors, touched, handleBlur, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        // for error matching 
        validationSchema: AddProductValidation,
    });

    const displayTextFormFields = () => {
        return (formTextFields.map(field => {
            return (<div className="form-group">
                <label>{`Product ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Enter Product ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    name={field}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors[field] && touched[field] && <div className="text-danger">{errors[field]}*</div>}
            </div>);
        }));
    }
    console.log((productAdded && productSubmitted))
    console.log((productAdded))
    console.log((productSubmitted))
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
                                            <form action onSubmit={handleSubmit}
                                            >
                                                {displayTextFormFields()}
                                                <p>Product Image:</p>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        name="image"
                                                        onChange={(event) => {
                                                            // get file
                                                            const file = event.currentTarget.files[0];
                                                            setFieldValue('image', file);
                                                            setFieldTouched('image', true);
                                                            // update the file label
                                                            const fileName = file ? file.name : 'Choose file...';
                                                            setFileLabel(fileName)
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label
                                                        className="custom-file-label">
                                                        {fileLabel}
                                                    </label>
                                                    {errors.image && touched.image && <div className="text-danger">{errors.image}*</div>}
                                                </div>
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

export default AddProduct