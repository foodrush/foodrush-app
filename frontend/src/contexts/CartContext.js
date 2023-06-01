import { createContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';

// create the context
export const CartContext = createContext();

// token is a state taken from the app -- may be set on login
export const CartProvider = ({ children, token, setToken }) => {
    const [cartData, setCartData] = useState([]);
    const [cartDataDiscount, setCartDataDiscount] = useState([]);
    const [cartState, setCartState] = useState({});
    const [userType, setUserType] = useState(0);

    const date = new Date();
    const startHour = 8;
    const hourlyDiscount = [
        {
            hour: 8,
            discount: 5
        },
        {
            hour: 12,
            discount: 10
        },
        {
            hour: 16,
            discount: 15
        },
        {
            hour: 20,
            discount: 20
        },
    ];

    useEffect(() => {
        calculateDiscount()
        // get cart data if customer user
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
        let currentPriceDiscounted = 0;
        let currentPrice = 0;
        let currentQuantity = 0;

        // calculate cart values -- price & quantity 
        cartData.forEach(({ product, qty }) => {
            currentPrice += (product.price * qty)
            currentQuantity += qty;
        });

        cartDataDiscount.forEach(({ item, discPrice }) => {
            let { qty } = item;
            currentPriceDiscounted += (discPrice * qty)
        });

        if (!token || userType === 2) {
            setCartState({
                totalHearts: 0,
                totalQuantity: 0,
                totalPrice: 0,
                totalPriceDiscounted: 0,
            });
        }
        else {
            setCartState({
                // will be updated when favorites are decided*
                totalHearts: 0,
                totalQuantity: currentQuantity,
                totalPrice: currentPrice.toFixed(2),
                totalPriceDiscounted: currentPriceDiscounted.toFixed(2),
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
            setCartData(response.data);
            // cartData with discounted prices added -- cartDataDiscount
            calculateDiscount(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const calculateDiscount = (productArray) => {
        let hour = date.getHours();
        const discountMult = Math.floor((hour - 8) / 4) + 1;
        const discountPer = 3 * discountMult;
        if (productArray !== undefined) {
            const discArr = productArray.map(item => {
                if (item.price) {
                    return ({
                        item,
                        discPrice: (item.price - (item.price * discountPer / 100)).toFixed(2)
                    });
                }
                if (item.product.price) {
                    return ({
                        item,
                        discPrice: (item.product.price - (item.product.price * discountPer / 100)).toFixed(2)
                    });
                }

            });

            setCartDataDiscount(discArr);
            return discArr;
        }

    };

    // only the ones currently used are sent
    const cartObject = useMemo(() => {
        return ({
            cartData,
            fetchCartData,
            cartState,
            setToken,
            setCartState,
            cartDataDiscount,
            calculateDiscount,
            date
        })
    }, [cartData, cartState]);

    return (
        <CartContext.Provider value={cartObject}>
            {children}
        </CartContext.Provider>
    );
}

