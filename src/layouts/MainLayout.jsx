import React from 'react';
import { Outlet } from 'react-router';
import Footer from 'src/layouts/Footer';
import Navbar from 'src/layouts/NavBar';


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