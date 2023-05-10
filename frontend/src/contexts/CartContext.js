import { createContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';

// create the context
export const CartContext = createContext();

// token is a state taken from the app -- may be set on login
export const CartProvider = ({ children, token, setToken }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartData, setCartData] = useState([]);
    const [cartState, setCartState] = useState({});

    // anywhere CartProvider is consumed fetch the cart data
    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        fetchCartData();
    }, [token]);

    useEffect(() => {
        cartInfo();
    }, [token, cartData]);



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

    const cartInfo = async () => {
        // await fetchCartData();
        if (!token) {
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
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            });
        }
    }

    // anywhere cartProvider is consumed -- update the total price and quantity states
    useEffect(() => {
        let currentPrice = 0;
        let currentQuantity = 0;

        // calculate cart values -- price & quantity 
        cartData.forEach(({ product, qty }) => {
            currentPrice += (product.price * qty)
            currentQuantity += qty;
        });
        setTotalQuantity(currentQuantity);
        setTotalPrice(currentPrice);

    }, [cartData])

    // only the ones currently used are sent
    const cartObject = useMemo(() => {
        return ({
            cartData,
            fetchCartData,
            cartState,
            setToken,
            setCartState
        })
    }, [cartData, cartState]);

    return (
        <CartContext.Provider value={cartObject}>
            {children}
        </CartContext.Provider>
    );
}

