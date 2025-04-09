"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function SearchFilters({
  filters,
  onFilterChange,
  brands,
  fuelTypes,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      seatingCapacity: "",
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some((value) => value !== "");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white transition-all"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
        >
          <Filter size={18} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>

        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors font-medium"
          >
            <X size={18} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brand
            </label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fuel Type
            </label>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleFilterChange}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seating Capacity
            </label>
            <select
              name="seatingCapacity"
              value={filters.seatingCapacity}
              onChange={handleFilterChange}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Any Capacity</option>
              <option value="2">2+ Seats</option>
              <option value="4">4+ Seats</option>
              <option value="5">5+ Seats</option>
              <option value="7">7+ Seats</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min $"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
