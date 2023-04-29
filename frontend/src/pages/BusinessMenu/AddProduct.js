import React from 'react'
import Business_Navbar from '../../Navigation/Business_Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function AddProduct() {
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
                                            <form action>
                                                <div className="form-group">
                                                    <label htmlFor="productname">Product Name:</label>
                                                    <input type="text" className="form-control" id="productname" placeholder="Enter Product Name" />
                                                    <div className="invalid-feedback">Product Name Can't Be Empty</div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="productprice">Product Price:</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" id="productprice" placeholder="Enter Product Price" />
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <div className="invalid-feedback">Product Price Can't Be Empty</div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="productdesc">Product Description:</label>
                                                    {/* <input type="text" className="form-control" id="productdesc" placeholder="Enter Product Description" /> */}
                                                    <div className="input-group">
                                                        <textarea className="form-control" aria-label="With textarea" defaultValue={""} />
                                                    </div>

                                                    <div className="invalid-feedback">Product Description Can't Be Empty</div>
                                                </div>
                                                <p>Product Image:</p>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="productimage" required />
                                                    <label className="custom-file-label" htmlFor="productimage">Choose
                                                        file...</label>
                                                    <div className="invalid-feedback">File Format Not Supported</div>
                                                </div>
                                                <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">Add
                                                    Product</button>
                                            </form>
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