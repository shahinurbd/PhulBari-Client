import React, { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import SuccessAlert from '../SuccessAlert';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [email, setEmail] = useState("");
    const {forgetPassword} = useAuthContext();

    const handleForget = async() => {
        setLoading(true);
        try{
            if (!email) return;
            const res = await forgetPassword({ email: email });
            if(res.success){
                setSuccessMsg(res.message);
            }
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-items-center justify-center mt-25 mb-10 '>
            <div className='border border-gray-200 shadow-lg p-5 sm:m-10 m-2'>
                <div className="text-center mb-20">
            <h1 className="text-3xl md:text-2xl font-bold">Password Reset</h1>
            <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-sm"></div>
            </div>

            <div className='my-5'>
                {successMsg && <SuccessAlert success={successMsg} />}
            </div>

           <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
                value={email} onChange={(e) => setEmail(e.target.value)}
              /> 
              <button onClick={handleForget} disabled={loading} className="mt-6 bg-pink-500 hover:bg-pink-800 text-white font-semibold px-8 py-3">
              {loading ? "Processing..." : "Submit"}
              </button>
            </div>
        </div>
    );
};

export default ForgetPassword;