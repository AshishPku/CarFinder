"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1);
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisiblePages + 2);
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 ${
            currentPage === 1
              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                currentPage === page
                  ? "bg-rose-500 text-white border border-rose-500"
                  : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 ${
            currentPage === totalPages
              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
