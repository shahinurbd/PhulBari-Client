import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../ErrorAlert';
import SuccessAlert from '../SuccessAlert';

const ConfirmPassword = () => {
    const {uid, token} = useParams();
    const {errorMsg, resetPassword} = useAuthContext();
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},

    } = useForm();

    const onSubmit = async(data) => {
        const payload = {
            uid,
            token,
            new_password: data.new_password,
        };
        setLoading(true);
        try {
            const response = await resetPassword(payload);
            if(response.success){
                setSuccessMsg(response.message);
                setTimeout(() => (
                    navigate("/login")
                ), 8000);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-items-center justify-center mt-25 mb-10 '>
            <div className='border border-gray-200 shadow-lg p-5 sm:m-10 m-2'>
                <div className="text-center mb-20">
            <h1 className="text-3xl md:text-2xl font-bold">Password Reset</h1>
            <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-sm"></div>
            </div>

            <div className='my-5'>
                {successMsg && <SuccessAlert success={successMsg} />}
                {errorMsg && <ErrorAlert error={errorMsg} />}
            </div>

           <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5'>
                <input
                type="password"
                placeholder="Enter New Password"
                className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
               {...register("new_password", {
                            required: "New password is required",
                            minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                            },
                        })}
              /> 
              {errors.new_password && (
                        <span className="text-error">{errors.new_password.message}</span>
                        )}

                <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500" 
                {...register("confirm_password", {
                            required: "Please confirm your password",
                            validate: (value) =>
                            value === watch("new_password") || "Passwords do not match",
                        })}
                />
                {errors.confirm_password && (
                        <span className="text-error">{errors.confirm_password.message}</span>
                        )}
            </div>

              <button type='submit' disabled={loading} className="mt-6 bg-pink-500 hover:bg-pink-800 text-white font-semibold px-8 py-3">
              {loading ? "Processing..." : "Reset Password"}
              </button>
           </form>
            </div>
        </div>
    );
};

export default ConfirmPassword;