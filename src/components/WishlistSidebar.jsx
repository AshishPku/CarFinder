"use client";

import { useWishlist } from "../contexts/WishlistContext";
import { X, Trash2, Heart } from "lucide-react";

export default function WishlistSidebar({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-10 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Heart size={18} className="text-rose-500" />
            Wishlist
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {wishlist.length === 0 ? (
            <div className="text-center mt-12 px-4">
              <Heart
                size={48}
                className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Your wishlist is empty
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Add cars you love to your wishlist to save them for later
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlist.map((car) => (
                <li
                  key={car.id}
                  className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <div className="relative h-32 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.brand + " " + car.model}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(car.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} className="text-rose-500" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-sm font-medium">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {car.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
