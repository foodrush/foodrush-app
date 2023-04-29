import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function BusinessPage() {
    const [businessData, setBusinessData] = useState(null);
    const [productResponse, setproductResponse] = useState(null);
    let businessId  = useParams();

    useEffect(() => {
        console.log(businessId);
        async function fetchData() {
            try {
                const [businessResponse, productResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/users/businesses/${businessId.id}/`),
                    axios.get(`http://127.0.0.1:8000/api/products/businesses/${businessId.id}/`)
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
            {businessData.restaurant_name}

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
