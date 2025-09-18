import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import NewArrivalItems from '../components/Home/NewArrivalItems';
import DiscountCard from '../components/Home/DiscountCard';
import DiscountSection from '../components/Home/DiscountSection';
import TopProducts from '../components/Home/TopProducts';
import InfoSection from '../components/Home/InfoSection';
import SubscribeSection from '../components/Home/SubscribeSection';

const HomePage = () => {
    return (
        <div>
           <HeroSection /> 
           <NewArrivalItems />
           <DiscountCard />
           <DiscountSection />
           <TopProducts />
           <InfoSection />
           <SubscribeSection />
        </div>
    );
};

export default HomePage;