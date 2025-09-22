// src/context/RecentlyViewedContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ user, children }) => {
  const custId = user?._id || "guest"; 
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [clicks, setClicks] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`recentlyViewed_${custId}`);
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, [custId]);

  // Function to handle product click
  const handleProductClick = (product) => {
    setClicks((prev) => {
      const newCount = (prev[product._id] || 0) + 1;

      if (newCount >= 2) {
        setRecentlyViewed((prevViewed) => {
          // prevent duplicates
          const exists = prevViewed.find((p) => p._id === product._id);
          if (exists) return prevViewed;

          const updated = [...prevViewed, { ...product, custId }];
          localStorage.setItem(
            `recentlyViewed_${custId}`,
            JSON.stringify(updated)
          );
          return updated;
        });
      }

      return { ...prev, [product._id]: newCount };
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, handleProductClick }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};
