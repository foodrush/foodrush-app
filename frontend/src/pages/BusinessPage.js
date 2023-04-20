import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function BusinessPage() {
    const [businessData, setBusinessData] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    const businessId  = useParams();

    useEffect(() => {
        console.log(businessId);
        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/businesses/${businessId}`),
                    axios.get(`http://127.0.0.1:8000/products/businesses/${businessId}`)
                ]);
                setBusinessData(businessResponse.data);
                setproductResponse(productResponse.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [businessId]);

    if (!businessData || !productResponse) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{businessData.name}</h1>
            <p>{businessData.description}</p>
            {/* Render other business details here */}
            <h2>Reviews</h2>
            {productResponse.map(product => (
                <div key={product.id}>
                    <p>{product.name}</p>
                    {/* Render other review details here */}
                </div>
            ))}
        </div>
    );
}

export default BusinessPage;
