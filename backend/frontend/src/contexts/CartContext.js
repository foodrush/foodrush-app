import { createContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';

// create the context
export const CartContext = createContext();

// token is a state taken from the app -- may be set on login
export const CartProvider = ({ children, token, setToken }) => {
    const [cartData, setCartData] = useState([]);
    const [cartState, setCartState] = useState({});
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        const type = localStorage.getItem("userType");
        setUserType(type);
        if (type == 1)
            fetchCartData();
    }, []);

    useEffect(() => {
        if (userType == 1)
            fetchCartData();
    }, [token]);

    // price & quantity calc
    useEffect(() => {
        let currentPrice = 0;
        let currentQuantity = 0;

        // calculate cart values -- price & quantity 
        cartData.forEach(({ product, qty }) => {
            currentPrice += (product.price * qty)
            currentQuantity += qty;
        });

        if (!token || userType === 2) {
            setCartState({
                totalHearts: 0,
                totalQuantity: 0,
                totalPrice: 0
            });
        }
        else {
            setCartState({
                // will be updated when favorites are decided*
                totalHearts: 0,
                totalQuantity: currentQuantity,
                totalPrice: currentPrice
            });
        }

    }, [token, cartData])


    // get cart data & set cartData 
    const fetchCartData = async () => {
        await axios.get("http://127.0.0.1:8000/api/orders/cart/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // This state update triggers a re-render of the component
            setCartData(response.data)

        }).catch((error) => {
            console.error(error);
        });
    }

    // only the ones currently used are sent
    const cartObject = useMemo(() => {
        return ({
            cartData,
            fetchCartData,
            cartState,
            setToken,
            setCartState,
        })
    }, [cartData, cartState]);

    return (
        <CartContext.Provider value={cartObject}>
            {children}
        </CartContext.Provider>
    );
}

