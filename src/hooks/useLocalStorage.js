import { useState, useEffect } from "react";

// Custom hook to store and retrieve data from localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Save updated data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}