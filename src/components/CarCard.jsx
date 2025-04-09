"use client";

import { useState } from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { Heart, Users, Fuel, Calendar } from "lucide-react";

export default function CarCard({ car, onClick }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(car.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={car.image || "/placeholder.svg"}
          alt={car.brand + " " + car.model}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            inWishlist
              ? "bg-rose-500 text-white shadow-md"
              : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={inWishlist ? "fill-current" : ""} size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
          <p className="font-medium">${car.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Users size={16} />
            <span>{car.seatingCapacity}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} />
            <span>{car.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
