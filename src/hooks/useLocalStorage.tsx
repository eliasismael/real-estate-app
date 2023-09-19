import { useState } from "react";

export interface IUselocalStorageProps {
  key: string;
  initialValue?: string;
}

type TReturn = [string, (value: object | string) => void];

export const useLocalStorage = (props: IUselocalStorageProps): TReturn => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(props.key);

      // If an item exists, parse it from JSON and return it as the initial value.
      if (item) {
        return JSON.parse(item);
      } else {
        // If no item is found, return the provided initialValue (or undefined if not provided).
        return props.initialValue;
      }
    } catch (error) {
      // If an error occurs during the parsing or retrieval, return the initialValue.
      return props.initialValue;
    }
  });

  // Define a function (setToLocalStorage) to update the stored value in localStorage.
  const setToLocalStorage = (value: object | string) => {
    try {
      setStoredValue(JSON.stringify(value));
      localStorage.setItem(props.key, JSON.stringify(value));
    } catch (error) {
      // Handle any errors that may occur during the storage process and log them.
      console.error("Error in useLocalStorage: ", error);
    }
  };

  // Return an array containing the current storedValue and the setToLocalStorage function.
  return [storedValue, setToLocalStorage];
};
