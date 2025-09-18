import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };

    const [authTokens, setAuthTokens] = useState(getToken());

    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        if (authTokens) {
            fetchUserProfile();
            fetchAllUsers();
        }
    },[authTokens]);

    //Fetch User Profile

    const fetchUserProfile = async() => {
        try {
            const response = await apiClient.get("auth/users/me", {
                headers: {Authorization: `JWT ${authTokens?.access}`}
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    //update user profile

    const updateUserProfile = async(data) => {
        setErrorMsg("");
        try {
            authApiClient.put("/auth/users/me/", data);
            return {
                success: true,
                message: "Profile Updated Successfully!"
            }
        } catch (error) {
            setErrorMsg(error);
        }
    }

    //change password
    const changePassword = async(data) => {
        setErrorMsg("")
        try{
           const response = await authApiClient.post("/auth/users/set_password/", data);
            if(response.status === 204) return {
                success: true,
                message: "Password Changed Successfully!"
            }
            else return {
                success: false,
                message: "Password should have contained uppwercase, lowercase and number."
            }
            
        } catch(error){
            setErrorMsg(error);
            return {
                success: false,
                message: "Password should have contained uppwercase, lowercase and number."
            }
        }
    }

    //fetch all users

    const fetchAllUsers = async() => {
        setErrorMsg("");
        try {
            const response = await authApiClient.get("/auth/users/");
            setAllUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    //login user
    const loginUser = async(data) => {
        setErrorMsg("");
        try {
            const response = await apiClient.post("/auth/jwt/create/", data);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            await fetchUserProfile();
            return {success: true}
        } catch (error) {
            setErrorMsg(error.response.data?.detail);
            return {success: false}
        }
    };

    //logout user 
    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        
    }

    //register user

    const registerUser = async(data) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/", data);
            return {
                success: true,
                message: "Registration Successfull. Check your mail to active your account."

            }
        } catch (error) {
            setErrorMsg(error);
        }
    }

    //forget password
    const forgetPassword = async(email) => {
        setErrorMsg("")
        try{
            await apiClient.post("/auth/users/reset_password/", email);
            return{
                success: true,
                message: "Check your mail to change password."
            }
        } catch(error){
            return setErrorMsg(error);
        }
    }

    //confirm password
    const resetPassword = async(data) => {
        setErrorMsg("")
        try{
            await apiClient.post("/auth/users/reset_password_confirm/", 
            data);
            return{
                success: true,
                message: "Password reset successfull. Please Login Again."
            }
        } catch(error){
            setErrorMsg(error);
        }
    }


    const resendActivation = async(email) => {
        try {
            await apiClient.post("/auth/users/resend_activation/", email);
        return{
            success: true,
            message: "Activation Resend Successfully. Check your mail to active your account."
        }
        } catch (error) {
            setErrorMsg(error);
        }
    }



    return {
        user, 
        loginUser, 
        errorMsg, 
        logoutUser, 
        registerUser,
        resendActivation, 
        forgetPassword, 
        resetPassword,
        allUsers,
        fetchAllUsers,
        updateUserProfile,
        changePassword,

    };
};

export default useAuth;