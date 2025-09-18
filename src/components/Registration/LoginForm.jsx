import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import ErrorAlert from '../ErrorAlert';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {loginUser, errorMsg} = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async(data) => {
      setLoading(true);
      try {
        const response = await loginUser(data);
        if(response.success) navigate('/dashboard');
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }

    return (
        <div className="py-16 px-4 bg-white mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold">Sign In</h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-1">To Your Account</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-sm"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Sign In Form */}
          <div>

            <div className='mb-5'>
              {errorMsg && <ErrorAlert error={errorMsg} />}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="Email*"
                className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
                {...register("email", {required: "Email is required."})}
              />
              {errors.email && (
                    <span className="label-text-alt text-error py-1">{errors.email.message}</span>
                )}
              <input
                type="password"
                placeholder="Password*"
                className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
                {...register("password", {required: "Password is required."})}
              />
              {errors.password && (
                    <span className="label-text-alt text-error py-1">{errors.password.message}</span>
                )}
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-800 text-white font-semibold px-6 py-3 w-full md:w-auto"
              >
                {loading ? "Logging..." : "SIGN IN"}
              </button>
            </form>
            <Link to='/forget-password'>
                <p className="mt-4 text-sm text-gray-600 cursor-pointer hover:text-pink-500">
                FORGOTTEN YOUR PASSWORD?
              </p>
            </Link>
          </div>

          {/* Create Account */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">DON&apos;T HAVE AN ACCOUNT?</h3>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Add items to your wishlist, get personalised recommendations,
              check out more quickly, track your orders, register.
            </p>
            <Link to='/register'>
              <button className="mt-6 bg-pink-500 hover:bg-pink-800 text-white font-semibold px-8 py-3">
              CREATE ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
};

export default LoginForm;