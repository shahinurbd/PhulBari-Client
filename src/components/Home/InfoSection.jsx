import { FaShippingFast } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';

const InfoSection = () => {

    const items = [
    {
      icon: <FaShippingFast size={40} />,
      title: "Free shipping",
      subtitle: "On all orders over $49.00",
    },
    {
      icon: <FaMoneyBillWave size={40} />,
      title: "15 days returns",
      subtitle: "Moneyback guarantee",
    },
    {
      icon: <FaCreditCard size={40} />,
      title: "Secure checkout",
      subtitle: "Protected by Paypal",
    },
    {
      icon: <FaGift size={40} />,
      title: "Offer & gift here",
      subtitle: "On all orders over",
    },
  ];

    return (
        <div className="bg-gray-50 border border-gray-200 py-12 px-6 max-w-6xl mx-auto font-[Poppins] mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-6 justify-center justify-items-center">
            {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
                <div className="text-black/70">{item.icon}</div>
                <div>
                <h3 className="text-lg ">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.subtitle}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
    );
};

export default InfoSection;