import React, { Profiler, useState } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import FlowerList from '../Flowers/FlowerList';
import FilterSection from './FilterSection';
import { FaFilter } from "react-icons/fa";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import useFetchCategories from '../../hooks/useFetchCategories';
import ProductList from './ProductList';
import Pagination from './Pagination';

const ShopPage = () => {

  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const {categories} = useFetchCategories();

  const {products, loading, totalPages, TotalProducts} = useFetchProducts(currentPage,priceRange,selectedCategory,searchQuery,sortOrder);
  return (
    <div className='flex lg:mx-2 xl:mx-10 md:mx-8 font-[Poppins]'>
       {/* Sidebar (Desktop) */}
      <aside className="hidden lg:block lg:w-80 xl:w-100 p-4 overflow-y-auto max-h-screen">
        <FilterSection 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          
        />
      </aside>

      {/* Filter Slide-out (Mobile/Tablet) */}
      <div
        className={`fixed top-0 right-0 sm:w-84 w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setFilterOpen(false)}
          className="mb-4 text-sm px-3 py-1 border border-gray-300 text-pink-800 rounded m-5"
        >
          ✕
        </button>
        <div className='overflow-y-auto h-[calc(100%-3rem)] px-4'>
          <FilterSection 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          
        />
        </div>
        
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="sm:flex justify-between items-center mb-6 mt-5">
          <h2 className="text-sm text-gray-500 py-5 px-3">
            Showing {products.length} of {TotalProducts} results
          </h2>
          <div className="flex items-center gap-2 p-2">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border border-gray-300 text-gray-700 px-4 py-2">
              <option value="">Default sorting</option>
              <option value="price">Price low to high</option>
              <option value="-price">Price high to low</option>
            </select>
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 border px-3 py-1 rounded"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Products grid */}
        <ProductList 
        products={products} 
        loading={loading} 
        />

        {/* Pagination */}
        <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        handlePageChange={setCurrentPage} 
        />
      </main>
    </div>
  );
};

export default ShopPage;