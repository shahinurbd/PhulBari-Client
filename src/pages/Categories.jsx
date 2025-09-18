import { useEffect, useState } from 'react';
import CategoryItems from '../components/Category/CategoryItems';
import apiClient from '../services/api-client';
import { Link } from 'react-router';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        try {
            apiClient
            .get("/categories")
            .then((res) => setCategories(res.data))
            
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }, []);
    return (
        
        <div className="md:mt-20 mt-5 md:mx-5 lg:mx-15 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
           {loading && <span className="loading loading-spinner text-secondary loading-xl"></span>}
           {categories.map((category, index) => (
                    
                   <CategoryItems key={category.id} index={index} category={category} loading={loading} /> 
                   
                    ))}
        </div>
    );
};

export default Categories;