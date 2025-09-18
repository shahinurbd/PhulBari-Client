import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authApiClient from '../services/auth-api-client';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';
import { useNavigate } from 'react-router';

const AddCategory = () => {
    const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm();

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleAddCategory = async(data) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                name: data.name,
                description: data.description
            }
            authApiClient.post("/categories/", payload);
            setSuccessMsg("Category Added Successfully!");
            setTimeout(() => {
              navigate('/dashboard/categories')
            },6000);
        } catch (error) {
            setErrorMsg(error);
        } finally{
          setLoading(false);
        }
    }
    return (
        <div className="max-w-4xl xl:mx-auto md:mx-5 lg:mx-15 lg:mt-30 md:mt-20 mt-5  p-6 bg-white shadow-lg rounded-lg">
        <div className=''> 
            {errorMsg && <div className='py-6'><ErrorAlert error={errorMsg} /></div>}
            {successMsg && !errorMsg && <div className='py-6'><SuccessAlert success={successMsg} /></div>}
        </div>
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
        <form action="" onSubmit={handleSubmit(handleAddCategory)}>
            <div>
          <label className="block text-sm text-gray-500 mb-2">Category Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder='Write Product name'
          />
          {errors.name && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2]"
            placeholder='Write Product Descriptions'
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-5">
          {loading ? "Category Adding..." : "Add Category"}
        </button>

        </form>
        </div>
    );
};

export default AddCategory;