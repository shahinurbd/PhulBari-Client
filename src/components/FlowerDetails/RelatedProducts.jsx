import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog } from "@headlessui/react";
import { Navigation } from "swiper/modules";
import { FaSearchPlus, FaRandom, FaShoppingCart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import defaultImage from "../../assets/default_image.jpg";
import { Link } from "react-router";



const RelatedProducts = ({products, loading}) => {

   
    const [selectedProduct, setSelectedProduct] = useState(null);
    return (
       <div className="w-full max-w-6xl mx-auto py-10 font-[Poppins]">
      <h2 className="md:text-4xl text-3xl font-bold text-center mb-10 tracking-tight">
        related products
        <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-sm"></div>
      </h2>

      {/* Snippper */}
            {loading && (
                <div className='flex justify-center items-center'>
                    <span className="loading loading-spinner text-secondary loading-xl"></span>
                </div>
            )}

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide className="px-3" key={product.id}>
             <div key={product.id} className="bg-white shadow-md">
                        {/* IMAGE WRAPPER - action bar appears only over this area */}
                        <div className="relative overflow-hidden">
                          {/* BADGES (stacked) - placed at top-left */}
                          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                            {product.discount && (
                              <div className="bg-green-500 text-white text-xs font-semibold sm:px-3 px-2 sm:py-1 rounded">
                                {product.discount}%
                              </div>
                            )}
            
                            {product.tag && (
                              <div className="bg-pink-500 text-white text-xs font-semibold sm:px-3 px-2 sm:py-1 rounded">
                                {product.tag}
                              </div>
                            )}
                          </div>
            
                          {/* NEW badge on top-right (if present) */}
                          {product.isNew && (
                            <div className="absolute top-3 right-3 z-20">
                              <div className="bg-blue-500 text-white text-xs font-semibold sm:px-3 px-2 sm:py-1 rounded">
                                NEW
                              </div>
                            </div>
                          )}
            
                          {/* Image container - use its own "group" so hover affects only this area */}
                          <div className="group relative md:max-h-75 sm:max-h-60 max-h-35 flex items-center justify-center bg-gray-50">
                            <Link to={`/shop/${product.id}/`}>
                            <img
                              src={product.image ? product.image[0] : defaultImage}
                              alt={product.name}
                              className="max-h-40 md:max-h-65 object-contain transform hover:scale-110 transition duration-400 "
                            />
                            </Link>
                            {/* Action bar — hidden by default, slides up on hover of the image area */}
                            <div className="absolute left-0 right-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex items-center justify-between bg-neutral-500 bg-opacity-95">
                                <button
                                  onClick={() => setSelectedProduct(product)}
                                  aria-label="view"
                                  className="w-24 h-12 flex items-center justify-center text-white border-r-1 border-gray-400 hover:bg-pink-500"
                                >
                                  <FaSearchPlus />
                                </button>
            
                                <button
                                  onClick={() => setSelectedProduct(product)}
                                  className="w-50 h-12 flex items-center justify-center text-white py-3 uppercase text-sm font-medium hover:bg-pink-500"
                                >
                                  <FaShoppingCart className="sm:hidden text-lg" />
                                 <span className="hidden sm:block font-normal md:text-sm text-xs"> Add to cart</span>
                                </button>
            
                                <button
                                  onClick={() => setSelectedProduct(product)}
                                  aria-label="compare"
                                  className="w-24 h-12 flex items-center justify-center text-white border-l-1 border-gray-400 hover:bg-pink-500"
                                >
                                  <FaRandom />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link to={`/shop/${product.id}/`}>
                        {/* Product meta (name / price) - separate from image area */}
                        <div className="lg:text-lg md:text-md sm:text-sm text-xs mt-6 text-center">
                          <h3 className=" text-gray-800 tracking-wide">
                            {product.name}
                          </h3>
                          <p className="text-pink-700 font-semibold mt-2 mb-5">
                            ${product.price}
                            {product.oldPrice && (
                              <span className="line-through text-gray-400 ml-3 text-sm">
                                ${product.oldPrice}
                              </span>
                            )}
                          </p>
                        </div>
                        </Link>
                      </div>
          </SwiperSlide>
        ))}

        {!loading && products.length === 0 && (
          <p className="text-center">No Products Found</p>
        )}
      </Swiper>

      {/* Modal using Headless UI Dialog */}
            <Dialog
              open={!!selectedProduct}
              onClose={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4"
            >
              <Dialog.Panel className="bg-white p-6 rounded shadow max-w-lg w-full">
                {selectedProduct && (
                  <>
                    <Dialog.Title className="text-xl font-bold mb-4">
                      {selectedProduct.name}
                    </Dialog.Title>
      
                    <div className="flex gap-4 flex-col md:flex-row items-center">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="h-40 object-contain mx-auto md:mx-0" />
      
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">Price: ${selectedProduct.price}</p>
                        {selectedProduct.oldPrice && (
                          <p className="text-gray-500 line-through mb-2">Old Price: ${selectedProduct.oldPrice}</p>
                        )}
                        {selectedProduct.discount && (
                          <p className="text-green-600 mb-2">Discount: {selectedProduct.discount}</p>
                        )}
      
                        <div className="mt-4 flex gap-2">
                          <button className="flex-1 bg-pink-500 text-white py-2 rounded">Add to cart</button>
                          <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 border rounded">Close</button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Dialog>
    </div>
    );
};

export default RelatedProducts;