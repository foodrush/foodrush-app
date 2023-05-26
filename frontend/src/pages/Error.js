import React from 'react'

import { ReactComponent as ErrorSvg } from "../modal/warning-sign-svgrepo-com (1).svg";

function Error({ children }) {
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary" style={{ minHeight: "100vh" }}>
            <div className="container d-flex justify-content-center align-items-center ">
                <div class="card p-3" style={{ width: "18rem;" }}>

                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <ErrorSvg style={{
                            width: "100px", height: "100px",
                            margin: "20px"
                        }} />
                        <div className="card-text">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error