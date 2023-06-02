import {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isBusiness, setIsBusiness] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const [userType, setUserType ] =  useState(0);

    const [userName, setUserName] = useState('');
    const [email, setEmailContext] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userInfos, setUserInfos] = useState('');

    // to make it safe for refresh 
    const [SDGPoints, setSDGPoints] = useState(0);


    useEffect(() => {
        async function fetchDataCustomer() {
            try {
                const responseSecond = await axios.get('api/users/customer-profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserId(responseSecond.data.id);
                setIsBusiness(false);
                setUserName(responseSecond.data.first_name);
                setUserType(1);
                setUserInfos(responseSecond.data);
            }catch (error) {
                console.error(error);
            }
        }

        async function fetchDataBusiness() {
            try {
                const responseSecond = await axios.get('api/users/business-profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserId(responseSecond.data.id);
                setIsBusiness(true);
                setUserName(responseSecond.data.first_name);
                setUserType(2);
                setUserInfos(responseSecond.data);
            }catch (error) {
                console.error(error);
            }
        }

        if(parseInt(localStorage.getItem("userType")) === 1){
            fetchDataCustomer();
            setUserType(1);

        }else if(parseInt(localStorage.getItem("userType")) === 2){
            fetchDataBusiness();

            setUserType(2);

        }else{

        }
    }, []);

    

    const resetUserContext = () => {
        setUserId(null);
        setIsBusiness(false);
        setIsCustomer(false);
        setUserName('');
        setEmailContext('');
        setAddress('');
        setPhoneNumber('');
        setFirstName('');
        setLastName('');
        setUserType(0);
        setUserInfos('');
        setSDGPoints(0);
    };

    const userObject = {
        userId,
        setUserId,
        isBusiness,
        setIsBusiness,
        isCustomer,
        setIsCustomer,
        userName,
        setUserName,
        userType,
        setUserType,
        email,setEmailContext,address,setAddress,
        phoneNumber,setPhoneNumber,firstName,lastName,userInfos,setUserInfos,
        resetUserContext,
        setSDGPoints,
        SDGPoints,

    }

    return (
        <UserContext.Provider value={userObject}>
            {children}
        </UserContext.Provider>
    );
};
