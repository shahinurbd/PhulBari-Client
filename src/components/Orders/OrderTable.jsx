import React, { useEffect, useState } from 'react';
import authApiClient from '../../services/auth-api-client';
import { Link } from 'react-router';

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
        useEffect(() => {
            setLoading(true);
            try {
                authApiClient.get("/orders/")
                .then((res) => setOrders(res.data));
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
            
        },[orders]);
   
    return (
        <div className='md:w-100 lg:w-full'>
            <div className="p-4">
            <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
                <tr className="bg-gray-100 text-left text-pink-500 font-semibold">
                <th className="py-3 px-4 border-b">Order Id</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">UserName</th>
                <th className="py-3 px-4 border-b">Action</th>
                </tr>
            </thead>
            <tbody>
                {/* Snippper */}
                    {loading && (
                        <div className='flex justify-center items-center'>
                            <span className="loading loading-spinner text-secondary loading-xl"></span>
                        </div>
                    )}
                {orders.map((order) => (
                <tr
                    key={order.id}
                    className="hover:bg-gray-50 text-gray-700"
                >
                    <td className="py-3 px-4 border-b">{order.id}</td>
                    <td className="py-3 px-4 border-b">{order.created_at}</td>
                    <td className="py-3 px-4 border-b">{order.status}</td>
                    <td className="py-3 px-4 border-b">{order.user.first_name}</td>
                    <td className="py-3 px-4 border-b text-pink-600 cursor-pointer hover:underline">
                    <Link to={`${order.id}`}>View</Link>
                    </td>
                </tr>
                ))}
                <tr>
                    <td colSpan={5}>
                        {!loading && orders.length === 0 && (
                            <p className='text-center py-4'>No Orders Found</p>
                        )}
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};

export default OrderTable;