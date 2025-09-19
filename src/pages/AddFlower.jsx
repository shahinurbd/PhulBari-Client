import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '../services/api-client';
import authApiClient from '../services/auth-api-client';
import { useNavigate } from 'react-router';

const AddFlower = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    apiClient.get('/categories/').then((res) => {
      setCategories(res.data.results || res.data);
    });
  }, []);

  // Submit Product Details
  const handleProductAdd = async (data) => {
    setLoading(true);

    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        old_price: data.old_price ? parseFloat(data.old_price) : null,
        discount: data.discount ? parseInt(data.discount) : null,
        tag: data.tag || null,
        isNew: data.isNew === 'true',
        stock: parseInt(data.stock, 10),
        category_id: parseInt(data.category),
      };

      const response = await authApiClient.post('/flowers/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setProductId(response.data.id);
    } catch (error) {
      console.log(
        'Error while adding product',
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!images.length) return alert('Please select images.');

    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image);
        await authApiClient.post(`/flowers/${productId}/images/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      alert('Images uploaded successfully');
      navigate('/shop');
    } catch (error) {
      console.log('Error uploading image', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl xl:mx-auto md:mx-5 lg:mx-15 mt-3 md:mt-25 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Flower</h2>
      {!productId ? (
        <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Product Name
            </label>
            <input
              {...register('name', { required: true })}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Write Product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: true })}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Write Product Descriptions"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Price</label>
            <input
              type="text"
              {...register('price', { required: true })}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Enter current price"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Old Price</label>
            <input
              type="text"
              {...register('old_price')}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Discount</label>
            <input
              type="text"
              {...register('discount')}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tag</label>
            <input
              type="text"
              {...register('tag')}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">New Product</label>
            <input type="radio" value="true" {...register('isNew')} /> Yes
            <br />
            <input type="radio" value="false" {...register('isNew')} /> No
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              {...register('stock', { required: true })}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
              placeholder="Stock"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Category</label>
            <select
              {...register('category', { required: true })}
              className="w-full bg-gray-100 px-4 py-3 rounded-sm border border-gray-300"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {loading ? 'Product Adding...' : 'Add Product'}
          </button>
        </form>
      ) : (
        <div className='mt-3 md:mt-25'>
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
            {loading ? 'Images Uploading...' : 'Upload Images'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFlower;
