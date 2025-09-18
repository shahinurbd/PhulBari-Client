import { useParams } from "react-router";
import AllFlowerList from "../components/Flowers/AllFlowersList";
import { useState } from "react";
import Pagination from "../components/Shop/Pagination";
import useFetchAllCategoryProducts from "../hooks/useFetchAllCategoryProducts";

const CategoryItems = () => {
    const {catId} = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const {products, loading, totalPages} = useFetchAllCategoryProducts(currentPage, catId);

    if(!products) {
        return <span className="loading loading-infinity loading-xs"></span>;
    }
    
    return (
        <div className="md:mt-25 md:mx-15 mt-5 mx-4">
            
            <AllFlowerList products={products} isLoading={loading} />
            <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            handlePageChange={setCurrentPage} 
            />
        </div>
    );
};

export default CategoryItems;