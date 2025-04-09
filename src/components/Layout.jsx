"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useWishlist } from "../contexts/WishlistContext";
import { Sun, Moon, Heart, Car } from "lucide-react";
import WishlistSidebar from "./WishlistSidebar";

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlist } = useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <Car className="h-6 w-6" />
            CarFinder
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWishlist((prev) => !prev)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={
                  wishlist.length > 0
                    ? "text-rose-500"
                    : "text-gray-500 dark:text-gray-400"
                }
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="text-yellow-300" />
              ) : (
                <Moon className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>

      <WishlistSidebar
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
      />
    </div>
  );
}
