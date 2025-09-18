import React from 'react';
import OrderItems from './OrderItems';

const OrderItemsTable = ({items, quantity}) => {
  if (!items) {
    return <span className="loading loading-infinity loading-xs"></span>;
    }
    return (
        <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Quantity</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <OrderItems item={items} quantity={quantity} />
            </tbody>
          </table>
        </div>
        </div>
    );
};

export default OrderItemsTable;