import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import authApiClient from '../services/auth-api-client';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';
import apiClient from '../services/api-client';

const UpdateCategory = () => {
    const {catId} = useParams();
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {register, setValue, handleSubmit, formState:{errors}, } = useForm();
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
            Object.keys(category).forEach((key) => setValue(key, category[key]));
        }, [category, setValue]);

    useEffect(() => {
            setLoading(true);
            apiClient
            .get(`/categories/${catId}/`)
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
        },[catId]);

    const handleUpdate = async(data) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                name: data.name,
                description: data.description
            };
            await authApiClient.put(`/categories/${catId}/`, payload);
            setSuccessMsg("Category Updated Successfully!");
            setTimeout(() => {navigate('/dashboard/categories')}, 3000);
        } catch (error) {
            setErrorMsg(error);
        }
    }

    return (
        <div className="max-w-4xl xl:mx-auto md:mx-5 lg:mx-15 lg:mt-30 md:mt-20 mt-5  p-6 bg-white shadow-lg rounded-lg mb-10">
        <div className=''> 
            {errorMsg && <div className='py-6'><ErrorAlert error={errorMsg} /></div>}
            {successMsg && !errorMsg && <div className='py-6'><SuccessAlert success={successMsg} /></div>}
        </div>
        <h2 className="text-2xl font-semibold mb-4">Update Category</h2>
        <form action="" onSubmit={handleSubmit(handleUpdate)}>
            <div>
          <label className="block text-sm text-gray-500 mb-2">Category Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder='Write Category name'
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
            placeholder='Write Category Descriptions'
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-5">
          {loading ? "Category Updating..." : "Update Category"}
        </button>

        </form>
        </div>
    );
};

export default UpdateCategory;