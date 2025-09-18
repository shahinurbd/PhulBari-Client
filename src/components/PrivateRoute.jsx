import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user} = useAuthContext();
    if (user === null) return <div className='flex justify-items-center items-center min-h-screen w-full'><span className="loading loading-ring loading-xl mx-auto"></span></div>
    return user ? children : <Navigate to='/login'></Navigate>;
};

export default PrivateRoute;