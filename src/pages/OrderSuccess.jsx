import { GiConfirmed } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router";  
import { MdPayment } from "react-icons/md";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import authApiClient from "../services/auth-api-client";
import { useState } from "react";


const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { order } = location.state || {};
    if(!order){<p>loading</p>}
    console.log(order);

    const handleClick = () => {
        navigate(`/dashboard/orders/${order.id}`);
    }

    const handlePayment = async() => {
        setLoading(true);
        try {
            const response = await authApiClient.post("/payment/initiate", {
            amount: order.flower.price,
            OrderId: order.id
                })

                if (response.data.payment_url) {
                setLoading(false);
                window.location.href = response.data.payment_url;
            } else {
                alert("Payment failed");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="flex justify-center min-h-screen mx-auto mt-15 font-[Poppins]">
            <div className="my-auto bg-gray-100 shadow-md md:p-10 p-4 space-y-4 rounded-sm mx-5">
                <div className="flex justify-center text-pink-500"><GiConfirmed size={50}/></div>
                <span className="text-center md:text-4xl text-2xl">Thanks for your order!</span>
                <p className="text-center text-md mt-4">Our Athority will call you soon</p>
                <div className="text-center text-md"><button onClick={handleClick} className="btn btn-info">Check your order</button></div>

                <div className="text-xl flex justify-center">
                <div>
                    <div className="text-center mb-3 mt-3">Pay Now</div>
                    <button disabled={loading} onClick={handlePayment} className="btn btn-primary"><MdPayment /><span className="mx-3 my-2">{loading ? "Processing..." : "Make Payment with sslcommerz."}</span></button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;