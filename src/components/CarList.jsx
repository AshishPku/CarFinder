"use client";

import { useState, useEffect } from "react";
import { fetchCars } from "../services/api";
import CarCard from "./CarCard";
import SearchFilters from "./SearchFilters";
import Pagination from "./Pagination";
import { ArrowUpDown, Loader } from "lucide-react";

export default function CarList({ onSelectCar }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    fuelType: "",
    seatingCapacity: "",
  });
  const [sortOrder, setSortOrder] = useState("default"); // 'default', 'lowToHigh', 'highToLow'

  const carsPerPage = 10;

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const data = await fetchCars();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError("Failed to load cars. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...cars];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchTerm) ||
          car.model.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand);
    }

    if (filters.minPrice) {
      result = result.filter((car) => car.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((car) => car.price <= Number(filters.maxPrice));
    }

    if (filters.fuelType) {
      result = result.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.seatingCapacity) {
      result = result.filter(
        (car) => car.seatingCapacity >= Number(filters.seatingCapacity)
      );
    }

    // Apply sorting
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cars, filters, sortOrder]);

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleSortOrder = () => {
    setSortOrder((current) => {
      if (current === "default") return "lowToHigh";
      if (current === "lowToHigh") return "highToLow";
      return "default";
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader className="animate-spin h-8 w-8 text-rose-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Loading amazing cars for you...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-lg">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        brands={[...new Set(cars.map((car) => car.brand))]}
        fuelTypes={[...new Set(cars.map((car) => car.fuelType))]}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"}{" "}
          Found
        </h2>
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowUpDown size={16} />
          <span>
            {sortOrder === "default"
              ? "Sort by Price"
              : sortOrder === "lowToHigh"
              ? "Price: Low to High"
              : "Price: High to Low"}
          </span>
        </button>
      </div>

      {filteredCars.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-lg text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No cars match your filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => onSelectCar(car)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
