import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt, FaUsers, FaBars } from "react-icons/fa";
import { IoFlowerSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { RiFunctionAddFill } from "react-icons/ri";
import useAuthContext from "../../hooks/useAuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';

const SideBar = () => {
  const { user, logoutUser } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const customerItems = [
    { to: "/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "orders", icon: FaShoppingCart, label: "Orders" },
    { to: "profile", icon: FaUser, label: "Account Details" },
    { action: "logout", icon: FaSignOutAlt, label: "Logout" },
  ];

  const adminItems = [
    { to: "/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "flowers", icon: IoFlowerSharp, label: "Flowers" },
    { to: "flower/add", icon: IoIosAddCircle, label: "Add Flower" },
    { to: "categories", icon: BiSolidCategory, label: "Categories" },
    { to: "categories/add", icon: RiFunctionAddFill, label: "Add Category" },
    { to: "orders", icon: FaShoppingCart, label: "Orders" },
    { to: "users", icon: FaUsers, label: "Users" },
    { to: "profile", icon: FaUser, label: "Account Details" },
    { action: "logout", icon: FaSignOutAlt, label: "Logout" },
  ];

  const menuItems = user.is_staff ? adminItems : customerItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="w-full bg-gray-50 border-b py-3">
        <button
        className="sm:hidden mt-16 mx-5 top-4 left-4 z-50 p-3 text-white bg-pink-500 rounded-md shadow-md"
        onClick={() => setMobileMenuOpen(true)}
      >
        <FaBars className="h-3 w-3" />
      </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-base-200 mt-14 sm:mt-10 sm:w-64 w-64 min-h-screen p-0 border-r border-pink-500
          fixed sm:static top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 font-[poppins] max-h-screen overflow-y-auto
        `}
      >
        <div className="flex flex-col mt-2 ">
          {menuItems.map((item, idx) =>
            item.action === "logout" ? (
              <button
                key={idx}
                onClick={handleLogout}
                className="flex justify-between items-center px-5 py-3 w-full border-b border-gray-200 
                           hover:bg-gray-100 hover:text-pink-500 text-gray-700 text-sm"
              >
                <span>{item.label}</span>
                <item.icon className="h-4 w-4" />
              </button>
            ) : (
              <NavLink
                key={idx}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex justify-between items-center px-5 py-3 w-full border-b border-gray-200 
                   hover:bg-gray-100 hover:text-pink-500 text-sm 
                   ${isActive ? "bg-gray-900 text-white font-semibold" : "text-gray-700"}`
                }
              >
                <span>{item.label}</span>
                <item.icon className="h-4 w-4" />
              </NavLink>
            )
          )}
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Padding for main content so it doesn't hide behind sidebar on desktop */}
      <div className="sm:ml-64"></div>
    </>
  );
};

export default SideBar;
