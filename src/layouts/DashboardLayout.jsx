import React from 'react';
import Navbar from 'src/layouts/NavBar';
import { Outlet } from 'react-router';
import Footer from 'src/layouts/Footer';
import SideBar from '../components/Dashboard/SideBar';

const DashboardLayout = () => {
    return (
        <>
            <Navbar />
            <main className='sm:flex'>
            <div><SideBar /></div>
            <div className='w-full max-h-screen overflow-y-scroll'><Outlet /></div>
            </main>
            <Footer />
        
        </>
    );
};

export default DashboardLayout;