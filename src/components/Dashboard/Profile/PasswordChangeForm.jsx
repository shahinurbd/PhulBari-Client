import React, { useState } from 'react';

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
    const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className='sm:mx-6'>
                <button
                type="button"
                className="btn btn-link p-0 justify-start text-primary font-semibold h-auto min-h-0"
                onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                >
                Change Password
                </button>
            </div>

            {isPasswordSectionOpen && (
                <div className="border border-gray-200 rounded p-6 sm:mx-6 mt-5">
            <h3 className="text-gray-700 font-semibold uppercase tracking-wide text-center md:text-left mb-6">
              Password Change
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Current password:
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2]"
                  disabled={!isEditing}
                {...register("current_password", {
                  required: "Current Password is Required",
                })}
                />
                {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.current_password.message}
                </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  New password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2]"
                  disabled={!isEditing}
                {...register("new_password", {
                  required: "New Password is Required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                />
                {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.new_password.message}
                </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Confirm new password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2]"
                  disabled={!isEditing}
                {...register("confirm_new_password", {
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
                />
                {errors.confirm_new_password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.confirm_new_password.message}
                </p>
                )}
              </div>
            </div>
            {/* Show Password Checkbox  */}
            {isEditing && (
                <div className="form-control mt-6">
                <label className="label cursor-pointer">
                    <span className="label-text">Show Password</span>
                    <input
                    type="checkbox"
                    className="toggle"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    />
                </label>
                </div>
            )}
        </div>
            )}
        </div>
    );
};

export default PasswordChangeForm;