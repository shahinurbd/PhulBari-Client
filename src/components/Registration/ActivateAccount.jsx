import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import apiClient from '../../services/api-client';
import ErrorAlert from '../ErrorAlert';

const ActivateAccount = () => {

    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {uid, token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.post("/auth/users/activation/", {uid, token})
        .then((res) => {
            setMessage("Account Activated Successfully")
            setTimeout(() => navigate("/login"), 3000);
            console.log(res);
        })
        .catch((error) => setErrorMsg(error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again."))
    },[]);
    return (
        <div className='flex items-center justify-center min-h-screen bg-base-200'>
            <div className='card bg-base-100 shadow-xl p-6'>
                <h2 className='text-2xl font-bold py-5 text-center'>Account Activation</h2>
                {message && (
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                        </div>
                )}

                {errorMsg && <ErrorAlert error={errorMsg} />}

            </div>
            
        </div>
    );
};

export default ActivateAccount;