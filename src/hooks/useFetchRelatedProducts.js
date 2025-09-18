import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useFetchRelatedProducts = (Category) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [allProducts, setAllProducts] = useState([]);
     
     
    useEffect(() => {
        setLoading(true);
        apiClient
        .get(`/flowers/?category_id=&category_id=${Category}`)
        .then((res) => setAllProducts(res.data.results))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },[Category]);

    return{allProducts, loading, error};
};

export default useFetchRelatedProducts;