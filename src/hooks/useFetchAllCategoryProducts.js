import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchAllCategoryProducts = (currentPage, Category) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [TotalProducts, setTotalProducts] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
            const fetchProducts = async() => {
                setLoading(true)
                try {
                    const response = await apiClient.get(`flowers/?category_id=&page=${currentPage}&category_id=${Category}`);
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
        },[currentPage, Category]);


        return{products, loading, totalPages,error};
    
    
};

export default useFetchAllCategoryProducts;