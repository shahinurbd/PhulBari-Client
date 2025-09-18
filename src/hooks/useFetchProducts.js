import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useFetchProducts = (currentPage,priceRange,selectedCategory,searchQuery,sortOrder) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [TotalProducts, setTotalProducts] = useState(0);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchProducts = async() => {
            setLoading(true)
            try {
                const response = await apiClient.get(`flowers/?category_id=&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`);
                setProducts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / response.data.results.length));
                setTotalProducts(response.data.count);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[currentPage,priceRange,selectedCategory,searchQuery,sortOrder]);


    return {products, loading, totalPages,TotalProducts, error}
};

export default useFetchProducts;