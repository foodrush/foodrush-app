import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"
import { ReactComponent as ErrorSvg } from "./warning-sign-svgrepo-com (1).svg";
import { ReactComponent as SuccessSVG } from "./success-filled-svgrepo-com.svg";

// type 0 -- error / type 1 -- success
const PopUp = ({ isOpen, onClose, popUpType, children }) => {
    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="popup-overlay" onClick={handleClose}>
            <div className="popup">
                <div className="popup-context">
                    <button className="close-button" onClick={handleClose}>
                        &times;
                    </button>
                    <div className="popup-sign">
                    {popUpType == 0 ? <ErrorSvg /> : <SuccessSVG /> }
                    </div >
                    <div className='popup-content'>{children}</div>

                </div>
            </div>
        </div>
    );
};

PopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default PopUp;
