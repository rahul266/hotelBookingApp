// components/ListingCard.jsx

import { useState } from 'react';
import Image from 'next/image';

function ListingCard({ imageSrc, name, pricePerNight }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = (error) => {
        setError(error);
        console.error('Failed to load image:', error);
    };
    
    return (
        <div className=" mb-12 w-full h-full rounded-lg grid-rows-2 gap-2 overflow-hidden hover:cursor-pointer">
            <div>
                {error && (
                    <div className="w-full h-full">
                        <img
                            className="rounded-md"
                            src="/hotel1.jpg"
                            alt="Hotel Image"
                        />
                    </div>
                )}
            </div>
            <div className="text-black p-4">
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-gray-600 text-base">
                    ₹{pricePerNight} per night
                </p>
            </div>
        </div>
    );
}

export default ListingCard;
