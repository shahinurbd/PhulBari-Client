import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authApiClient from '../../services/auth-api-client';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // get last 5 orders
  const recentOrders = orders.slice(-5).reverse();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="md:w-100 lg:w-full">
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
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <span className="loading loading-spinner text-secondary loading-xl"></span>
                  </td>
                </tr>
              )}

              {!loading && recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 text-gray-700">
                  <td className="py-3 px-4 border-b">{order.id}</td>
                  <td className="py-3 px-4 border-b">{order.created_at}</td>
                  <td className="py-3 px-4 border-b">{order.status}</td>
                  <td className="py-3 px-4 border-b">{order.user?.first_name}</td>
                  <td className="py-3 px-4 border-b text-pink-600 cursor-pointer hover:underline">
                    <Link to={`${order.id}`}>View</Link>
                  </td>
                </tr>
              ))}

              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
