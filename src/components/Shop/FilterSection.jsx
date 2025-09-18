import { Search } from "lucide-react";
import { Range } from "react-range";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import { useState } from "react";

const FilterSection = ({priceRange,setPriceRange, categories,setSelectedCategory,setSearchQuery}) => {
    const [search, setSearch] = useState("");
    const handleClick = () => {
        setSearchQuery(search);
    };    
    return (
        <div className="font-[Poppins]">
          {/* Search Section   */}
          <div className="w-full max-w-md p-4">
            <div className="flex items-center max-w-sm border border-gray-100 rounded-sm px-3 py-2 bg-white shadow-sm focus-within:border-blue-400">
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your keyword..."
                className="flex-grow outline-none text-gray-700 text-sm sm:text-base"
                />
                <button onClick={handleClick} className="ml-2 text-gray-500 hover:text-gray-700">
                <Search className="w-5 h-5" />
                </button>
            </div>
            </div>

            {/* Price Range */}
            <div className="w-full max-w-md p-4">
                <div className="">
                <h3 className="text-lg mb-2">Price</h3>
                <hr className="mb-3 text-gray-200" />
                <p className="text-sm mb-2">
                    Your range: <span className="font-medium">${priceRange[0]} - ${priceRange[1]}</span>
                </p>

                <Range
                    step={1}
                    min={0}
                    max={1500}
                    values={priceRange}
                    onChange={(vals) => setPriceRange(vals)}
                    renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="w-full h-[4px] bg-gray-300 rounded relative"
                    >
                        <div
                        className="absolute h-[4px] rounded bg-pink-500"
                        style={{
                            left: `${((priceRange[0] - 0) / (1500 - 0)) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / (1500 - 0)) * 100}%`
                        }}
                        />
                        {children}
                    </div>
                    )}
                    renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow"
                    />
                    )}
                />
                
                </div>
            </div>

            {/* Category Section */}
            <div className="w-full max-w-md p-4">
            {/* Title */}
            <h2 className="text-lg border-b border-gray-200 pb-2 mb-4">Categories</h2>

            {/* Categories List */}
            <ul className="space-y-3">
                {categories?.map((cat) => (
                <li
                    key={cat.id} value={cat.id}
                    className="text-gray-700 hover:text-pink-600 cursor-pointer transition"
                    onClick={(e) => setSelectedCategory(e.target.value)}
                >
                    {cat.name}
                </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default FilterSection;