import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import apiClient from '../services/api-client';
import authApiClient from '../services/auth-api-client';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const UpdateFlower = () => {
    const {register, setValue, handleSubmit, formState:{errors}, } = useForm();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const {flowerId} = useParams();
    const [flower, setFlower] = useState([]);
    const [categories, setCategories] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

     useEffect(() => {
            setLoading(true);
            apiClient
            .get(`/flowers/${flowerId}/`)
            .then((res) => setFlower(res.data))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
        },[flowerId]);

    useEffect(() => {
            Object.keys(flower).forEach((key) => setValue(key, flower[key]));
        }, [flower, setValue]);

    //fetch categories
    useEffect(() => {
        apiClient.get("/categories/").then(res => {
            console.log(res.data)
            setCategories(res.data);
        });
    }, []);

    const onSubmit = async (data) => {
        try{
            //profile update
            const Payload = {
            ...data,
            name: data.name,
            description: data.description,
            price: data.price,
            old_price: data.old_price,
            discount: data.discount,
            tag: data.tag,
            isNew: data.isNew,
            stock: data.stock,
            category: data.category
            };
             await authApiClient.put(`/flowers/${flowerId}/`, Payload);
             setSuccessMsg("Product Updated Successfully!");

        } catch(error){
            setErrorMsg(error);
        }
    }

    // Handle Image Change
        const handleImageChange = (e) => {
            const files = Array.from(e.target.files);
            setImages(files);
            setPreviewImages(files.map((file) => URL.createObjectURL(file)));
        };
    
    
        // handle image upload
        const handleUpload = async () => {
            if (!images.length) return alert("Please select images.");
            
            setLoading(true);
            try {
            for (const image of images) {
                const formData = new FormData();
                formData.append("image", image);
                console.log(formData);
                await authApiClient.post(`/flowers/${flowerId}/images/`, formData);
                setLoading(false);
            }
            alert("Images uploaded successfully");
            navigate('/shop');
            } catch (error) {
            console.log(("Error uploading image", error));
            }
        };
    return (
        <div className="max-w-4xl xl:mx-auto md:mx-5 lg:mx-15 lg:mt-25 md:mt-20 mt-15 p-6 bg-white shadow-lg rounded-lg">
        <div className=''> 
            {errorMsg && <div className='py-6'><ErrorAlert error={errorMsg} /></div>}
            {successMsg && !errorMsg && <div className='py-6'><SuccessAlert success={successMsg} /></div>}
        </div>
      <h2 className="text-2xl font-semibold mb-4">Update Flower</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Product Name</label>
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

        <div>
          <label className="block text-sm text-gray-500 mb-2">Price</label>
          <input
            type="text"
            placeholder='Enter Product current price'
            {...register("price", {
              required: "This Field is required",
              validate: (value) => {
                const parsedValue = parseFloat(value);
                return !isNaN(parsedValue) || "Please enter a valid number!";
              },
            })}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2]  border border-gray-300"
            
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">Old Price</label>
          <input
            type="text"
            {...register("old_price")}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder='Optional'
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">Discount</label>
          <input
            type="text"
            {...register("discount")}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder='Optional'
          />
          
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">Tag</label>
          <input
            type="text"
            {...register("tag")}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder='Optional'
          />
          
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">New Product</label>
            <input type="radio" value="true" {...register("isNew")} /> <span className='text-pink-700 text-sm'>Yes</span> <br />
            <input type="radio" value="false" {...register("isNew")} /> <span className='text-pink-700 text-sm'>No</span>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">Stock Quantity</label>
          <input
            type="number"
            {...register("stock", { required: true })}
            className="w-full bg-gray-100 placeholder-gray-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
            placeholder="Stock"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        {/* Dropdown for categories */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full bg-gray-100 placeholder-gray-400 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#f5b6c2] border border-gray-300"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {loading ? "Product Updating..." : "Update Product"}
        </button>
      </form>
      
        <div className='mt-15 mb-10'>
          <h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              ))}
            </div>
          )}

          <button
            className="btn btn-primary w-full mt-2"
            onClick={handleUpload}
            disabled={loading}
          >
           {loading ? "Images Uploading..." : "Upload Images"}
          </button>
        </div>
      
    </div>
    );
};

export default UpdateFlower;