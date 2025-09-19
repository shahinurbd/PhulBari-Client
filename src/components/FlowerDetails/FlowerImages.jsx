import React, { useState } from 'react';
import defaultImage from "../../assets/default_image.jpg";

const FlowerImages = ({images}) => {

    if (!images) {
    return <span className="loading loading-infinity loading-xs"></span>;
    }

    const displayImages = images.length > 0 ? images : [{image: defaultImage}];
    const [selectedImage, setSelectedImage] = useState(displayImages[0].image);

    return (
        <div>
            {/* Left Side - Images */}
        {images.length === 0 ? (
          <img className='sm:w-100 sm:h-92 object-cover rounded-lg aspect-square' src={defaultImage} alt="Default Image" />
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail Images */}
          <div className="flex md:flex-col gap-4 justify-center md:justify-start">
            {displayImages.map((img, index) => (
              <img
                key={index}
                src={img.image}
                alt={`Flower ${index + 1}`}
                className={`max-w-20 max-h-20 object-cover border rounded cursor-pointer ${
                  selectedImage === img.image ? "border-pink-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img.image)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={selectedImage}
              alt="Selected Flower"
              className="sm:max-w-100 sm:max-h-92 object-cover rounded-lg aspect-square"
            />
          </div>
        </div>
        )}
        </div>
    );
};

export default FlowerImages;