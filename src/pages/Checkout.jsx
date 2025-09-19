import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import authApiClient from "../services/auth-api-client";

const inputBase =
  "w-full bg-gray-50 border border-gray-200 rounded-sm pl-10 pr-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-pink-100 focus:border-pink-300 outline-none text-sm";

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 text-sm" />
    <input className={inputBase} {...props} />
  </div>
);

export default function Checkout() {
    const {user, updateUserProfile} = useAuthContext();
    const {register, setValue, handleSubmit, formState:{errors}, } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
     
    
    useEffect(() => {
    if (user) {
        Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
    }, [user, setValue]);
    
    const location = useLocation();
    const { buy, total_price } = location.state || {};
    if(!buy && !total_price) return <p>loading</p>

    const onSubmit = async (data) => {
      setLoading(true);
        try{
            //profile update
            const profilePayload = {
            email: data.email,
            first_name: data.first_name, 
            last_name: data.last_name,
            phone_number: data.phone_number,
            address: data.address
            };

            console.log(profilePayload);
            await updateUserProfile(profilePayload);
           
              // place order
              const response = await authApiClient.get(buy);

              if (response.status === 200 || response.status === 201) {
                alert("Order placed successfully!");
                navigate("/order/success", {state:{
                  order: response.data
                }});
              }
            

        } catch(error){
            console.log(error);
        } finally{
          setLoading(false);
        }
    }
    

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* Billing Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 font-[Poppins]">
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Billing Details</h2>
        </div>

        {/* Content */}
        
            <div className="p-6">
                {/* Personal Information */}
                <div className="mb-6">
                  <div className="inline-block bg-white px-2 -mt-6 relative text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      Personal Information
                    </span>
                  </div>
      
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">First name</label>
                      <InputWithIcon icon={FaUser} placeholder="First name" 
                    {...register("first_name", { required: "First name is required" })}
                      />
                    {errors.first_name && (
                    <p className="text-red-500">{errors.first_name.message}</p>
                    )}
                    </div>
      
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Last name</label>
                      <InputWithIcon icon={FaUser} placeholder="Last name"
                      {...register("last_name")}
                      />
                      {errors.last_name && (
                    <p className="text-red-500">{errors.last_name.message}</p>
                    )}
                    </div>
      
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Email address</label>
                      <InputWithIcon disabled icon={FaEnvelope} type="email" placeholder="email@example.com" 
                      {...register("email")}
                      />
                      {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                    )}
                    </div>
      
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Phone number</label>
                      <InputWithIcon icon={FaPhone} type="tel" placeholder="+8801XXXXXXXXX" 
                      {...register("phone_number", { required: "Phone number is required" })}
                      />
                      {errors.phone_number && (
                    <p className="text-red-500">{errors.phone_number.message}</p>
                    )}
                    </div>
      
                    
                  </div>
                </div>
      
                
      
                {/* Address */}
                <div className="mb-4">
                  <div className="inline-block bg-white px-2 -mt-6 relative text-sm">
                    <span className="text-sm font-medium text-gray-600">Address</span>
                  </div>
                </div>
      
                
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      
                  {/* Country */}
                <div>
                    <label className="block text-xs text-gray-500 mb-2">Country</label>
                    <InputWithIcon icon={FaGlobe} placeholder="Country Name" 
                    {...register("address.country")}
                    />
                  </div>
      
                {/* Address */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Address</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="House number and street name" 
                    {...register("address.address", { required: "Address is required" })}
                    />
                  </div>
      
                  
                </div>
      
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-2">Town / City</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="City" 
                    {...register("address.city", { required: "Town/City is required" })}
                    />
                  </div>
      
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-2">Area</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="Area" 
                    {...register("address.area", { required: "Area is required" })}
                    />
                  </div>
      
                  <div className="md:col-span-1">
                    <label className="block text-xs text-gray-500 mb-2">Zip</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="Zip" 
                    {...register("address.zip")}
                    />
                  </div>
                </div>

          {/* Order Notes */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-2">Order Notes <span className="text-xs text-gray-400">(optional)</span></label>
            <div className="relative">
              <FaStickyNote className="absolute left-3 top-3 text-pink-500 text-sm"
              />
              <textarea
                rows="5"
                {...register("address.note")}
                className="w-full bg-gray-50 border border-gray-200 rounded-sm pl-10 pr-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-pink-100 focus:border-pink-300 outline-none text-sm resize-none"
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </form>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 font-[Poppins]">

        <div className="mt-8">
            <button onClick={handleSubmit(onSubmit)} disabled={loading} className=" bg-pink-600 py-3 px-5 text-white text-lg">
              {loading ? "Placing Order..." : "Place Order"}
            </button>
        </div>
        
        </div>
        
    
    </div>
  );
}
