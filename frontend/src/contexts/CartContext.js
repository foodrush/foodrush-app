import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

// create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartData, setCartData] = useState([]);
    const userToken = localStorage.getItem("token");

    // get cart data & set cartData 
    const fetchCartData = async () => {
        await axios.get("http://127.0.0.1:8000/api/orders/cart/", {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then(response => {
            // This state update triggers a re-render of the component
            setCartData(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }

    // anywhere CartProvider is consumed fetch the cart data 
    useEffect(() => {
        fetchCartData();
    }, [])

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
    const cartObject = {
        totalPrice,
        totalQuantity,
        cartData,
        fetchCartData
    }
    return (
        <CartContext.Provider value={cartObject}>
            {children}
        </CartContext.Provider>
    );
}

