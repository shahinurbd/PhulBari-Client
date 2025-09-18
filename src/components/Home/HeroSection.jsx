import React from 'react';
import flowerBG from "../../assets/Hero/flowers-hero.jpg"
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import { Link } from 'react-router';

const HeroSection = () => {
    return (
        <div className='overflow-hidden'>
            <div className=" bg-cover bg-center h-full bg-blend-soft-light md:py-25 lg:py-45 sm:py-30 py-20 w-full transform hover:scale-103 transition duration-800 font-[Poppins]  bg-black/45" style={{ backgroundImage: `url(${flowerBG})` }}>
            
           <div className='text-white text-center py-5 space-y-3'>
                <div className="relative text-white md:text-lg text-sm">
                Flower & Gift
                </div>
                <div className="relative z-10 text-white md:text-7xl sm:text-4xl text-3xl font-bold xl:mx-60  sm:mx-20">
                Perfect Bunch For Every Occasion
                </div>
                <div className='mt-10'>
                    <Link to='/shop'>
                        <button className='bg-pink-600 md:py-3 md:px-4 py-2 px-4 rounded-full text-sm hover:bg-pink-900 transition duration-600'>Shop Now</button>
                    </Link>
                </div>
           </div>
        </div>
        </div>
    );
};

export default HeroSection;