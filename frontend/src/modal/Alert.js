import css from "classnames";
import style from "./style.module.css"
import React from "react";
import { useState, useEffect } from "react";
import "./style.css"; // Import style.css after style.module.css

// classnames library to conditionally apply CSS classes
function Alert({ type, isDynamic }) {
    const [isShow, setIsShow] = useState(true);
    const [discPercentage, setDiscPercentage] = useState(0);


    const [timeMessage, setTimeMessage] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();

            const formattedTime = `${hours}:${minutes}:${seconds}`;
            setTimeMessage(formattedTime);

            const discountMult = Math.floor((hours - 8) / 4) + 1;
            const discountPer = 3 * discountMult;
            setDiscPercentage(discountPer);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // const classes = `d-flex justify-content-around ${css(style[`${type}-text`])}`

    if (isShow) {
        return (
            <div className={css(style.alert, style[type])}>
                {isDynamic && (
                    <span className={style.closebtn}
                        onClick={() => setIsShow(false)}>
                        &times;
                    </span>
                )}
                <div className="d-flex justify-content-around">
                    <span>
                    Current Time: {timeMessage} 
                    </span>
                    <span>
                    Current Discount: %{discPercentage}
                    </span>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Alert