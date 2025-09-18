import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';

const inputBase =
  "w-full bg-gray-50 border border-gray-200 rounded-sm pl-10 pr-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-pink-100 focus:border-pink-300 outline-none text-sm";

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 text-sm" />
    <input className={inputBase} {...props} />
  </div>
);

const ProfileForm = ({ register, errors, isEditing }) => {
    return (
      <div>
        <form action="">
          <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 py-8 mt-5 font-[Poppins]">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
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
                      disabled={!isEditing}
                    {...register("first_name", { required: "First name is required" })}
                      />
                    {errors.first_name && (
                    <p className="text-red-500">{errors.first_name.message}</p>
                    )}
                    </div>
      
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Last name</label>
                      <InputWithIcon icon={FaUser} placeholder="Last name"
                      disabled={!isEditing}
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
                      {...register("phone_number")}
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
                    {...register("address.address")}
                    />
                  </div>
      
                  
                </div>
      
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-2">Town / City</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="City" 
                    {...register("address.city")}
                    />
                  </div>
      
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-2">Area</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="Area" 
                    {...register("address.area")}
                    />
                  </div>
      
                  <div className="md:col-span-1">
                    <label className="block text-xs text-gray-500 mb-2">Zip</label>
                    <InputWithIcon icon={FaMapMarkerAlt} placeholder="Zip" 
                    {...register("address.zip")}
                    />
                  </div>
                </div>
      
              </div>
            </div>
          </div>
        </form>
      </div>
    );
};

export default ProfileForm;