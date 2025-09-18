import React from 'react';

const OrderItems = ({item, quantity}) => {
  if (!item) {
    return <span className="loading loading-infinity loading-xs"></span>;
    }

    const calculateTolalPrice = item.price * quantity; 
    
    return (
            <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-right">
                    ${item.price}
                  </td>
                  <td className="px-4 py-3 text-right">{quantity}</td>
                  <td className="px-4 py-3 text-right">
                    ${calculateTolalPrice}
                  </td>
                </tr>
    );
};

export default OrderItems;