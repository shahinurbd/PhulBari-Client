import React, { Suspense, useEffect, useState } from 'react';
import FlowerImages from '../components/FlowerDetails/FlowerImages';
import BuyNowSection from '../components/FlowerDetails/BuyNowSection';
import { Link, useParams } from 'react-router';
import apiClient from '../services/api-client';
import InfoSection from '../components/Home/InfoSection';
import RelatedProducts from '../components/FlowerDetails/RelatedProducts';
import useFetchRelatedProducts from '../hooks/useFetchRelatedProducts';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import useAuthContext from '../hooks/useAuthContext';
import { RiUserForbidLine } from "react-icons/ri";

const FlowerDetails = () => {
    const [flower, setFlower] = useState([]);
    const [loading, setLoading] = useState(false);
    const {flowerId} = useParams();
    const Category = flower?.category?.id;
    const {allProducts} = useFetchRelatedProducts(Category);
    const {user} = useAuthContext()

   useEffect(() => {
        setLoading(true);
        apiClient
        .get(`/flowers/${flowerId}/`)
        .then((res) => setFlower(res.data))
        .catch((err) => console.log(err.message))
        .finally(() => setLoading(false));
    },[flowerId]);
    return (
        <>
        {!user ? (
          <div className='mt-15 py-25 flex justify-items-center justify-center font-[Poppins]'>
            <div className='bg-gray-50 shadow-md p-20'>
                <div className='flex justify-items-center justify-center py-2'><RiUserForbidLine size={50}/></div>
                <p>To Order our products you need to login first!</p>
            
            <p>Go to <Link to='/login'><span className='link text-blue-500'>Login Page</span></Link></p>
            </div>
          </div>
         ): (
        <div className='md:mt-30 mt-22'>
            
            
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <span className="loading loading-dots text-secondary loading-xl"></span>
                </div>
            ) : (
                <div className='grid lg:grid-cols-2 grid-cols-1 xl:mx-45 lg:mx-10 md:mx-35 md:my-14 m-5 gap-10 xl:gap-0'>
                
                    
                <FlowerImages images={flower?.images}/>
               
                <BuyNowSection flower={flower}/>
                
                </div>
                
            )}
            <div className='mt-30 md:mx-6 mx-2'>
                
            <InfoSection />
            </div>

            <div className='md:mx-6 mx-1'>
                <RelatedProducts products={allProducts} loading={loading} />
            </div>
            
            
        </div>
        )}
        </>
    );
};

export default FlowerDetails;