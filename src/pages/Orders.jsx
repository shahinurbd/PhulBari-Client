import OrderTable from '../components/Orders/OrderTable';

const Orders = () => {
    


    return (
        <div className='overflow-x-auto md:mt-25 lg:mt-25 lg:mx-25 mt-5 md:mx-10 mx-5 flex justify-items-center'>
            <div className='bg-gray-50 p-2 rounded-sm shadow-sm'>
                <span className='mx-5 font-semibold'>All Orders</span>
                <OrderTable/>
            </div>
        </div>
    );
};

export default Orders;