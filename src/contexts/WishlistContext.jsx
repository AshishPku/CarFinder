import { createContext, useContext, useState, useEffect } from "react";
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("carWishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("carWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car) => {
    setWishlist((prev) => {
      if (!prev.some((item) => item.id === car.id)) {
        return [...prev, car];
      }
      return prev;
    });
  };

  const removeFromWishlist = (carId) => {
    setWishlist((prev) => prev.filter((car) => car.id !== carId));
  };

  const isInWishlist = (carId) => {
    return wishlist.some((car) => car.id === carId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
