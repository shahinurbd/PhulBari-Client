import React from 'react';
import SideBar from '../components/Dashboard/SideBar';
import useAuthContext from '../hooks/useAuthContext';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import UserDashboard from '../components/Dashboard/UserDashboard';

const Dashboard = () => {
    const {user} = useAuthContext();
    return (
        <div className=''>
           {user.is_staff ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
};

export default Dashboard;