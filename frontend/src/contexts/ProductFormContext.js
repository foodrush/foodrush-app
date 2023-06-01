import { createContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import AddProductValidation from '../pages/BusinessMenu/AddProductValidation';

export const ProductFormContext = createContext();

export const ProductProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [productId, setProductId] = useState(null);
    const [fileLabel, setFileLabel] = useState("Choose file...")
    const [productAdded, setProductAdded] = useState(false);
    const [productSubmitted, setProductSubmitted] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        price: "",
        cuisine: "",
        category: "",
        count_in_stock: "",
        description: "",
        image: null
    });

    const [contextReady, setContextReady] = useState(false);

    useEffect(() => {
        setContextReady(true);
        setFileLabel("Choose file...")
    }, [editMode]);

    const formTextFields = ["name", "price", "cuisine", "category", "count_in_stock", "description"];

    const token = localStorage.getItem("token")

    const headers = {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    };

    const getProduct = async (productId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (response.status === 200) {
                // get the image from backend and assign it to the initial values image
                const imageFileName = response.data["image"]
                const imageUrl = `http://127.0.0.1:8000${imageFileName}`
                const imageResponse = await axios.get(imageUrl, { responseType: 'blob' });
                const imageFile = new File([imageResponse.data], imageFileName, {
                    type: imageResponse.data.type,
                    lastModified: new Date().getTime(),
                });
                setInitialValues(() => ({
                    name: response.data["name"],
                    price: response.data["price"],
                    cuisine: response.data["cuisine"],
                    category: response.data["category"],
                    count_in_stock: response.data["count_in_stock"],
                    description: response.data["description"],
                    image: imageFile
                }))
            }
        }
        catch (error) {
            console.log(error.response)
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // formData -- returns an array of arrays -- each input is an array
        const formData = new FormData(e.currentTarget);
        formData.set("image", initialValues["image"]);
        setProductSubmitted(true);
        let productAdded;
        try {
            let response;
            if (editMode && productId) {
                response = await axios.put(`http://127.0.0.1:8000/api/products/edit-product/${productId}/`, formData, { headers });
            }
            else {
                response = await axios.post('http://127.0.0.1:8000/api/products/add-product/', formData, { headers });
            }
            if ((response.status === 201 || response.status === 200) && ![...formData.values()].some(value => value === null || value === ""))
                productAdded=true;
                // setProductAdded(true);
            else
                productAdded=false;

                // setProductAdded(false);

            return({
                productAdded: productAdded,
                productSubmitted: true,
                success: true
            });

        } catch (error) {
            console.log(error)
            return({
                productAdded: productAdded,
                productSubmitted: true,
                success: false
            });
        }
    }

    const handleEditChange = (e, field) => {
        e.preventDefault();
        setInitialValues({ ...initialValues, [field]: e.target.value })
        setFieldTouched(field, true);
        setFieldValue(field, e.target.value);
    };

    const { handleChange, errors, touched, handleBlur, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        // for error matching 
        validationSchema: AddProductValidation,
    });

    const displayTextFormFields = () => {
        return (formTextFields.map((field, index) => {
            const fieldName = field === "count_in_stock" ? "Stock" : field.charAt(0).toUpperCase() + field.slice(1);
            return (
                <div className="form-group" key={index}>
                    <label>{`Product ${fieldName}`}</label>
                    <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={initialValues[field]}
                        onChange={(e) => handleEditChange(e, field)}
                        onBlur={handleBlur}
                    />
                    {errors[field] && touched[field] && initialValues[field] === "" && <div className="text-danger">{errors[field]}*</div>}
                </div>);
        }));
    }

    const displayTextFormFieldsAdd = () => {
        return (formTextFields.map((field, index) => {
            const fieldName = field === "count_in_stock" ? "Stock" : field.charAt(0).toUpperCase() + field.slice(1);
            return (
                <div className="form-group" key={index}>
                    <label>{`Product ${fieldName}`}</label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Enter Product ${fieldName}`}
                        name={field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors[field] && touched[field] && <div className="text-danger">{errors[field]}*</div>}
                </div>);
        }));
    }
    const displayFileForm = () => {
        return (<>
            <label>Product Image:</label>
            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input "
                    name="image"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        // update the file label
                        const fileName = file ? file.name : 'Choose file...';
                        setFileLabel(fileName)
                        setInitialValues({ ...initialValues, 'image': file });
                        setFieldTouched('image', true);
                        setFieldValue('image', file);
                    }}
                    onBlur={handleBlur}
                />
                <label
                    className="custom-file-label overflow-hidden">
                    {editMode ?
                        (initialValues.image ? initialValues.image.name : "")
                        : fileLabel
                    }
                </label>
                {errors.image && touched.image && <div className="text-danger">{errors.image}*</div>}
            </div>
        </>);
    }
    const productObject = {
        displayTextFormFields,
        handleSubmit,
        displayFileForm,
        productSubmitted,
        productAdded,
        setProductId,
        getProduct,
        setEditMode,
        setInitialValues,
        displayTextFormFieldsAdd,
        setProductSubmitted,
        setProductAdded
    };
    return (
        <ProductFormContext.Provider value={productObject}>
            {contextReady && children}
        </ProductFormContext.Provider>
    );
}