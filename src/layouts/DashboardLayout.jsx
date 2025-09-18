import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/Dashboard/SideBar';
import Navbar from './Navbar';
import Footer from './Footer';

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