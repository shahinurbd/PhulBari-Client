import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const UserDashboard = () => {
    const {user,logoutUser} = useAuthContext();
    return (
        <div className='sm:mt-25 md:mx-15 max-h-screen overflow-y-scroll mt-10 mx-5 pb-10'>
            <div className='sm:space-x-3 bg-gray-100 sm:p-10 p-4 text-md'>
                <p>Hello <span className='font-semibold'>{user.first_name}</span> (not <span className='font-semibold'>{user.first_name}? <button className='text-gray-700' onClick={logoutUser}>Log out)</button></span></p>
            </div>

            <div className='bg-gray-100 sm:p-10 p-4 text-md mt-3'>
                <p>
                    From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                </p>
            </div>
        </div>
    );
};

export default UserDashboard;