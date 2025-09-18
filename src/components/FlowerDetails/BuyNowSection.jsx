import useAuthContext from '../../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router';
import authApiClient from '../../services/auth-api-client';
import { FaMinus, FaPlus } from "react-icons/fa6";


const BuyNowSection = ({flower}) => {
  const {user} = useAuthContext();
  const navigate = useNavigate()

  

  const handleBuyNow = () => {
      navigate("/order/checkout", {
        state: {
          buy: `https://phulbari-seven.vercel.app/api/flowers/${flower.id}/buy/`,
          total_price: flower.price,
        },
      });
    };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Flower?");
    
    if (confirmDelete) {
      try {
        await authApiClient.delete(`/flowers/${flower.id}/`);
        alert("Flower deleted successfully!");
        navigate('/shop');
      } catch (error) {
        alert("Failed to delete Flower!");
        console.error(error);
      }
    } else {
      alert("Action cancelled.");
    }
  };
    return (
         <>
          <div>
          <h2 className="text-2xl font-semibold mb-2">{flower.name}</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-pink-500 text-2xl font-bold">${flower.price}</span>
            <span className="line-through text-gray-400">{flower?.old_price}</span>
          </div>

          <p className="text-gray-600 mb-6">
            {flower.description}
          </p>

          <div className="flex items-center">
              <div className="mr-2 text-sm font-medium text-gray-600">Availability:</div>
              {flower.stock > 0 ? (
                <div className="badge badge-outline bg-success/10 text-success border-success/20">
                  In Stock ({flower.stock} available)
                </div>
              ) : (
                <div className="badge badge-outline bg-error/10 text-error border-error/20">
                  Out of Stock
                </div>
              )}
            </div>

          
            {/* SKU, Categories, Tags */}
          <div className="text-gray-600 text-sm space-y-1">
            
            <p><span className="font-medium">SKU: </span>{flower.id}</p>
            <p><span className="font-medium">Categories: </span>{flower.category?.name}</p>
            <p><span className="font-medium">Tags: </span>{flower?.tag}</p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6 mt-6">
            
            {user.is_staff ? (
              <div className='space-x-5 space-y-5'>
                <Link to={`/flower/update/${flower.id}`} >
                <button  className="bg-pink-500 hover:bg-pink-600 text-white md:px-4 px-2 py-2 rounded">
                  Update Product
                </button>
                </Link>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white md:px-4 px-2 py-2 mt-2 rounded">
                Delete Product
              </button>
              </div>
            ) : (
              <div className="join">
              <button onClick={handleBuyNow} className="bg-pink-500 mx-4 hover:bg-pink-600 text-white md:px-6 px-3 py-2 rounded">
              Buy Now
            </button>
            </div>
            )}
          </div>
          
        </div>
         </>
    );
};

export default BuyNowSection;