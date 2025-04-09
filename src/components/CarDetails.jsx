"use client";

import { useWishlist } from "../contexts/WishlistContext";
import {
  ArrowLeft,
  Heart,
  Users,
  Fuel,
  Calendar,
  Gauge,
  Cog,
  Car,
} from "lucide-react";

export default function CarDetails({ car, onBack }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(car.id);

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to search</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="relative h-72 md:h-96 bg-gray-100 dark:bg-gray-700">
          <img
            src={car.image || "/placeholder.svg"}
            alt={car.brand + " " + car.model}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {car.year} • {car.mileage.toLocaleString()} miles
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                ${car.price.toLocaleString()}
              </p>
              <button
                onClick={handleWishlistClick}
                className={`mt-2 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  inWishlist
                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                }`}
              >
                <Heart className={inWishlist ? "fill-current" : ""} size={18} />
                <span>
                  {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Users className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Seating
              </span>
              <span className="font-medium">{car.seatingCapacity} People</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Fuel className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Fuel Type
              </span>
              <span className="font-medium">{car.fuelType}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Calendar className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Year
              </span>
              <span className="font-medium">{car.year}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Gauge className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Mileage
              </span>
              <span className="font-medium">
                {car.mileage.toLocaleString()} miles
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Cog className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Transmission
              </span>
              <span className="font-medium">{car.transmission}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Car className="mb-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Body Type
              </span>
              <span className="font-medium">{car.bodyType}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {car.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
              {car.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
