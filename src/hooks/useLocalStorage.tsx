import { useState } from "react";

export interface IUselocalStorageProps {
  key: string;
  initialValue?: string;
}

type TReturn = [string, (value: object | string) => void];

export const useLocalStorage = ({
  key,
  initialValue,
}: IUselocalStorageProps): TReturn => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  const setToLocalStorage = (value: object | string) => {
    try {
      setStoredValue(JSON.stringify(value));
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error in useLocalStorage: ", error);
    }
  };

  return [storedValue, setToLocalStorage];
};
