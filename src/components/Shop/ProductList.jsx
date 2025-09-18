import React from 'react';
import FlowerList from '../Flowers/FlowerList';

const ProductList = ({products,loading}) => {
    return (
         <div>
          {/* Snippper */}
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <span className="loading loading-dots text-secondary loading-xl"></span>
                </div>
            ) : (
                <FlowerList products={products} />
            )}
          
        </div>
    );
};

export default ProductList;