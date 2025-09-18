import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './NavBar';


const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;