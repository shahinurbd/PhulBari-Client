import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import authApiClient from "../../services/auth-api-client";

const CategoryItems = ({category, index, loading}) => {
    const {user} = useAuthContext();

    if(!category){
        return <span className="loading loading-infinity loading-xs"></span>;
    }


    const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
    
    if (confirmDelete) {
      try {
        await authApiClient.delete(`/categories/${category.id}/`);
        alert("Category deleted successfully!");
        
      } catch (error) {
        alert("Failed to delete Category!");
        console.error(error);
      }
    } else {
      alert("Action cancelled.");
    }
  };
    
    
    const gradiants = [
        "from-pink-100 to-blue-100",
        "from-blue-100 to-purple-100",
        "from-purple-100 to-pink-100",
        "from-pink-100 to-blue-100",
    ];
    
    //console.log(categories);
    return (
         <div className="">

            {/* Snippper */}
            {loading && (
                <div className='flex justify-center items-center min-h-screen'>
                    <span className="loading loading-spinner text-secondary loading-xl"></span>
                </div>
            )}
            
            {/* Categories */}
            
            <section className="flex justify-between items-center px-3 md:px-3 mt-5 mb-5">
                <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-gradient-to-br ${gradiants[index % gradiants.length]} w-full max-h-46 p-5 py-3`}>
                    <div className="flex gap-10 justify-between items-center">
                        <div className="bg-pink-500 p-2 rounded-full  w-10 text-center text-white">{category.name.charAt(0)}</div>
                        <div className="bg-gray-50 text-center w-20 rounded-full">{category.product_count} items</div>
                    </div>
                    <div className="py-2 space-y-1">
                    <h3 className="text-gray-900 text-md font-bold">{category.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{category.description}</p>
                    <div className="flex justify-between mt-2">
                       <Link to={`${category.id}/`}> <button className="text-pink-500 font-bold hover:text-pink-600 transition-colors flex items-center justify-items-center text-md">Explore <IoIosArrowForward /></button> </Link>
                        {user.is_staff && (
                            <div className="flex gap-3">
                                <Link to={`/categories/update/${category.id}`}>
                                <button className="text-pink-500 font-bold hover:text-pink-600 transition-colors flex items-center text-md">Edit <span className="mx-2"><FiEdit /></span></button>
                                </Link>
                                <button onClick={handleDelete} className="text-pink-500 font-bold hover:text-pink-600 transition-colors flex items-center text-md">Delete <span className="mx-2"><RiDeleteBin6Line /></span></button>
                            </div>
                        )}
                    </div>
                    
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryItems;