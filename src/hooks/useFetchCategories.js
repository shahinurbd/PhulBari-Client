import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
    const fetchCategories = async() => {
        setLoading(true);
        try {
            const response = await apiClient.get("/categories/");
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }       
    }
    fetchCategories();
    },[]);

    return{categories, isLoading};
    
};

export default useFetchCategories;