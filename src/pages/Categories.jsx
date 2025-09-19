import { useEffect, useState } from 'react';
import CategoryItems from '../components/Category/CategoryItems';
import apiClient from '../services/api-client';
import { Link } from 'react-router';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAllCategories = async() => {
            setLoading(true);
            try {
                const res = await apiClient.get("/categories/");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        }

    fetchAllCategories();
    }, []);
    return (
        <>
        {/* Snippper */}
            {loading && (
                <div className='flex justify-center items-center min-h-screen'>
                    <span className="loading loading-spinner text-secondary loading-xl"></span>
                </div>
            )}
        
        <div className="md:mt-20 mt-5 md:mx-5 lg:mx-15 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
           {categories.map((category, index) => (
                    
                   <CategoryItems key={category.id} index={index} category={category} loading={loading} /> 
                   
                    ))}
        </div>

    </>
    );
};

export default Categories;