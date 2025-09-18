import { Route, Routes } from "react-router";
import Flowers from "../components/Flowers/Flowers";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginForm from "../components/Registration/LoginForm";
import SignUpForm from "../components/Registration/SignUpForm";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FlowerDetails from "../pages/FlowerDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import ForgetPassword from "../components/PasswordReset/ForgetPassword";
import ConfirmPassword from "../components/PasswordReset/ConfirmPassword";
import Orders from "../pages/Orders";
import AllFlowers from "../pages/AllFlowers";
import OrderDetails from "../pages/OrderDetails";
import Categories from "../pages/Categories";
import CategoryItems from "../pages/CategoryItems";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import AddFlower from "../pages/AddFlower";
import UpdateFlower from "../pages/UpdateFlower";
import AddCategory from "../pages/AddCategory";
import UpdateCategory from "../pages/UpdateCategory";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Services from "../pages/Services";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
                <Route path="" element={<HomePage />}  />
                <Route path="about" element={<About />}  />
                <Route path="flowers" element={<Flowers />}  />
                <Route path='flower/update/:flowerId' element={<UpdateFlower />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<SignUpForm />} />
                <Route path="shop" element={<Shop />} />
                <Route path="shop/:flowerId" element={<FlowerDetails />} />
                <Route path="contact" element={<Contact />} />
                <Route path='activate/:uid/:token' element={<ActivateAccount />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path='password/reset/confirm/:uid/:token' element={<ConfirmPassword />} />
                <Route path="categories/update/:catId" element={<UpdateCategory />} />
                <Route path='order/checkout' element={<Checkout />} />
                <Route path='order/success' element={<OrderSuccess />} />
                <Route path='services' element={<Services />} />

            </Route>

            {/* Privet Routes */}
            <Route path="dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>}>
                
            <Route index element={<Dashboard />}/>
            <Route path='orders' element={<Orders />} />  
            <Route path='orders/:orderId' element={<OrderDetails />} />  
            <Route path="flowers" element={<AllFlowers />}  /> 
            <Route path="flower/add" element={<AddFlower />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/:catId" element={<CategoryItems />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            
            </Route>
            

        </Routes>
    );
};

export default AppRoutes;