import { Link } from "react-router";
import discount1 from "../../assets/Discount/1.jpg"
import discount2 from "../../assets/Discount/2.jpg"
import discount3 from "../../assets/Discount/3.jpg"
import discount4 from "../../assets/Discount/4.jpg"
const DiscountCard = () => {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 py-12 px-6 max-w-7xl mx-auto gap-5">
            <Link to='/shop'>
            <div className="overflow-hidden">
                <img className="transform hover:scale-110 transition duration-1500" src={discount1} alt="Discount Card" />
            </div>
            </Link>
            <Link to='/shop'>
            <div className="overflow-hidden">
                <img className="transform hover:scale-110 transition duration-1500" src={discount2} alt="Discount Card" />
            </div>
            </Link>
            <Link to='/shop'>
            <div className="overflow-hidden">
                <img className="transform hover:scale-110 transition duration-1500" src={discount3} alt="Discount Card" />
            </div>
            </Link>
            <Link to='/shop'>
            <div className="overflow-hidden">
                <img className="transform hover:scale-110 transition duration-1500" src={discount4} alt="Discount Card" />
            </div>
            </Link>
        </div>
    );
};

export default DiscountCard;