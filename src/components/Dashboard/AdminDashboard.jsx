import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import StatCard from "./StatCard";
import OrderTable from "../Orders/OrderTable";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import authApiClient from "../../services/auth-api-client";

const AdminDashboard = () => {
    const [TotalProducts, setTotalProducts] = useState([]);
    const [TotalOrders, setTotalOrders] = useState([]);
    const [TotalUsers, setTotalUsers] = useState([]);
    const [TotalCategories, setTotalCategories] = useState([]);

    //fetch Total Products
     useEffect(() => {
        apiClient
        .get("/flowers/")
        .then((res) => setTotalProducts(res.data.count))
        .catch((err) => console.log(err.message))
    },[]);

    //fetch total orders
    useEffect(() => {
        authApiClient
        .get("/orders/")
        .then((res) => setTotalOrders(res.data.length))
        .catch((err) => console.log(err.message))
    },[]);

    //fetch total users
    useEffect(() => {
        authApiClient
        .get("/auth/users/")
        .then((res) => setTotalUsers(res.data.length))
        .catch((err) => console.log(err.message))
    },[]);


    //fetch total categories
    useEffect(() => {
        apiClient
        .get("/categories/")
        .then((res) => setTotalCategories(res.data.length))
        .catch((err) => console.log(err.message))
    },[]);


    return (
        <div className="xl:mx-50 xl:mt-35 md:mx-10 mx-4 md:mt-25 my-5">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={FiPackage} title="Total Products" value={TotalProducts} />
            <StatCard icon={FiShoppingCart} title="Total Orders" value={TotalOrders} />
            <StatCard icon={FiUsers} title="Total Users" value={TotalUsers} />
            <StatCard icon={BiCategory} title="Total Categories" value={TotalCategories} />
            </div>
            
            <div className="mt-10 bg-gray-50 shadow-sm p-2 rounded-sm">
                <p className="mx-5 font-semibold">Recent Orders</p>
                <OrderTable />
                
                </div>
        </div>
    );
};

export default AdminDashboard;