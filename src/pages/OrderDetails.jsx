import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import authApiClient from '../services/auth-api-client';
import OrderItemsTable from '../components/Orders/OrderItemsTable';
import OrderItems from '../components/Orders/OrderItems';

const OrderDetails = () => {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const {orderId} = useParams();
    const {user} = useAuthContext();
    const [status, setStatus] = useState(order.status);
    
     useEffect(() => {
        setLoading(true);
        authApiClient
        .get(`/orders/${orderId}/`)
        .then((res) => setOrder(res.data))
        .catch((err) => console.log(err.message))
        .finally(() => setLoading(false));
    },[orderId]);

    console.log(order);
    
    const handleStatusChange = async(event) => {
    const newStatus = event;
    try{
      const response = await authApiClient.patch(`/orders/${orderId}/update/`, {status: newStatus});
      console.log(response);
      if(response.status === 200) setStatus(newStatus);
      alert(response.data.status);
    } catch(error){
      console.log(error);
    }
  }

  const getClassName = () => {
  if (status === "Not Paid") return "bg-red-500";
  if (status === "Ready To Ship") return "bg-green-500";
  if (status === "Shipped") return "bg-blue-500";
  if (status === "Delivered") return "bg-yellow-500";
  if (status === "Canceled") return "bg-red-500";
  return "bg-blue-500";
  };

  if (!order.flower) {
    return <span className="loading loading-infinity loading-xs"></span>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-y-scroll max-h-screen xl:mt-30 xl:mx-70 md:mt-25 lg:mx-15 md:mx-6 mt-5">
          {/* Snippper */}
            {loading && (
                <div className='flex justify-center items-center'>
                    <span className="loading loading-spinner text-secondary loading-xl min-h-screen"></span>
                </div>
            )}
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
        </div>
        <div className="flex gap-2">
          
          {user.is_staff ? (
            <select 
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-3 py-1 rounded-lg text-white ${getClassName()} text-sm font-medium`}>
              <option value="Not Paid">
                Not Paid
              </option>
              <option value="Ready To Ship">
                Ready To Ship
              </option>
              <option value="Shipped">
                Shipped
              </option>
              <option value="Delivered">
                Delivered
              </option>
              <option value="Canceled">
                Canceled
              </option>
        
            </select>
          ) : (
            <span
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
              order.status === "Not Paid" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {order.status}
          </span>
            
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Order Items</h3>
        {/* Order Items Table  */}
        
          <OrderItemsTable items={order.flower} quantity={order.quantity}/>
        
        
      </div>
      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            ${order.flower.price}
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${order.flower.price}</span>
          </div>
        </div>
      </div>
          <span className='font-medium text-lg mb-4 mx-4 mt-2'>Order Info</span>
      <div className='border-t'>
        
        <div className='py-5 mx-4'>
          <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Country</th>
                <th>City</th>
                <th>Address</th>
                <th>Area</th>
                <th>Zip</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{order.user.address?.country}</th>
                <td>{order.user.address?.city}</td>
                <td>{order.user.address?.address}</td>
                <td>{order.user.address?.area}</td>
                <td>{order.user.address?.zip}</td>
                <td>{order.user.address?.note}</td>
                
              </tr>
              
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Order Created</th>
               
              </tr>
              <tr>
                <td>{order.user?.first_name} {order.user?.last_name}</td>
                <td>{order.user?.phone_number}</td>
                <td>{order.user?.email}</td>
                <td>{order.created_at}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        </div>
      </div>
    </div>
    );
};

export default OrderDetails;