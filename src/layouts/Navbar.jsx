import { useEffect, useState } from "react";
import { FaUser, FaSearch, FaHeart, FaShoppingBag, FaBars } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import useAuthContext from "../hooks/useAuthContext";
import apiClient from "../services/api-client";
import defaultImage from "../assets/default_image.jpg"
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logo/logo-1.png"

  
const Navbar = () => {

    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [setActiveMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {user, logoutUser} = useAuthContext();
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState("");

    const handleClick = () => {
        setSearchQuery(search);
    }; 

    useEffect(() => {
            setLoading(true);
            apiClient
            .get(`/flowers/?category_id=&search=${searchQuery}`)
            .then((res) => setFlowers(res.data.results))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
        },[searchQuery]);

   
    const cartItems = [
        
    ];

    const menuLinks = [
        { name: "HOME", href: "/" },
        { name: "SHOP", href: "/shop" },
        { name: "ABOUT", href: "/about" },
        { name: "CONTACT", href: "/contact" },
        { name: "SERVICES", href: "/services" },
    ];


    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await logoutUser(); 
      navigate("/login"); 
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
    };
    return (
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 font-[Poppins]">
      <div className="flex justify-between items-center md:px-8 md:py-5 px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          <img className="w-12" src={logo} alt="" />
        </Link>

        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars />
        </button>

        <nav className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            {menuLinks.map((menu, idx) => (
              <li
                key={idx}
                className="relative group"
                onMouseEnter={() => setActiveMenu(menu.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={menu.href}
                  className="uppercase text-sm font-medium text-gray-700 hover:text-pink-500"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
            
          </ul>
        </nav>

        <div className="flex space-x-4 text-gray-700 items-center ">
          <button className="hover:text-pink-500" onClick={() => setShowProfile(!showProfile)}>
            <FaUser />
          </button>
          <button className="hover:text-pink-500" onClick={() => setShowSearch(!showSearch)}>
            <FaSearch />
          </button>
         
          <button onClick={() => setShowCart(true)} className="relative hover:text-pink-500">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1">
              {cartItems.length}
            </span>
          </button>
          <span className="hidden sm:inline text-pink-600 font-semibold text-sm">
            ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </span>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 p-6 md:hidden transition-transform duration-300 ease-in-out">
          <button className="mb-4 text-right w-full text-pink-600" onClick={() => setMobileMenuOpen(false)}>✕</button>
          <nav>
            <ul className="flex flex-col space-y-4">
              {menuLinks.map((menu, idx) => (
                <li key={idx}>
                  <Link
                    to={menu.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-left text-sm text-gray-700 hover:text-pink-500"
                  >
                    {menu.name}
                    
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {showSearch && (
        <div>
          <div className="bg-gray-200 px-6 py-4 border-t-2 border-pink-600">
          <div className="flex justify-center ">
            <div className="flex border rounded">
            <input
            type="text"
            placeholder="Search..."
            className="w-full p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" onClick={handleClick} className="py-1 px-3 rounded-sm"><BsSearch /></button>
            
            </div>
            <button className="btn mx-5 bg-transparent border border-gray-500" onClick={() => setShowSearch(!showSearch)}><RxCross2 /></button>
          </div>
        </div>

        <div className="">
          {loading && (
                <div className='flex justify-center items-center py-20'>
                    <span className="loading loading-spinner text-secondary loading-md"></span>
                </div>
            )}
          {!loading && searchQuery && (
          <div className="max-w-xl mx-auto overflow-y-scroll max-h-screen">
            {flowers.map((flower) => (
              <Link to={`/shop/${flower.id}`} onClick={() => setShowSearch(!showSearch)} >
                <div className="flex justify-items-center items-center gap-4 bg-gray-100 rounded-sm my-2 p-2 max-w-2xl hover:shadow-sm hover:bg-gray-300" key={flower.id}>
              {flower?.images[0] ? (
                <img className="w-10 h-10" src={flower?.images[0]?.image} alt="" />
              ) : (
                <img className="w-10 h-10" src={defaultImage} alt="" />
              )}
                <span>{flower.name}</span>
              </div>
              </Link>
            ))}

            {!loading && flowers.length === 0 && (
              <p className='text-center text-gray-500 mt-6 min-h-screen'>No Products Available</p>
            )}
          </div>
        )}
        </div>
        </div>
      )}

      {showProfile && (
        <div className="absolute sm:right-20 right-4 top-15 bg-white shadow-md py-4 px-6 z-10 border-t-2 border-pink-600">
          {user ? (
            <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-500"><Link to="/dashboard">Dashboard</Link></li>
            <li className="hover:text-pink-500"><Link to="dashboard/profile">My Account</Link></li>
            <li className="hover:text-pink-500"><button onClick={handleLogout}>Logout</button></li>
          </ul>
          ) : (
            <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-500"><Link to="/login">Sign In</Link></li>
            <li className="hover:text-pink-500"><Link to="/register">Register</Link></li>
            
          </ul>
          )}
        </div>
      )}

      {showCart && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-20 overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold">Your Cart</h3>
            <button onClick={() => setShowCart(false)}>✕</button>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="text-center py-5"><span className="text-center text-sm text-gray-400">Your Cart is empty now</span></div>
          <button disabled className="w-full mt-4 bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
            Checkout
          </button>
        </div>
      )}
    </header>
    );
};

export default Navbar;