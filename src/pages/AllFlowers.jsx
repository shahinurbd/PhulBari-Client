import { useState } from 'react';
import Pagination from '../components/Shop/Pagination';
import FlowerList from '../components/Flowers/FlowerList';
import useFetchAllFlowers from '../hooks/useFetchAllFlowers';
import AllFlowerList from '../components/Flowers/AllFlowersList';

const AllFlowers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {products, loading, totalPages} = useFetchAllFlowers(currentPage);
    return (
        <div className='md:mt-25 mt-5 lg:mx-15 md:mx-10 mx-4 mb-5'>
            <AllFlowerList products={products} isLoading={loading} />
            <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            handlePageChange={setCurrentPage} 
            />
        </div>
    );
};

export default AllFlowers;