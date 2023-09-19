// Hooks
import { useState, useEffect, createContext, ReactNode } from "react";
// Constants
import { housesData } from "../../constants/data";

//Models
import { IHouse } from "../../models/House";

export interface IHouseContext {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  countries: (string | Set<string>)[];
  property: string;
  setProperty: React.Dispatch<React.SetStateAction<string>>;
  properties: (string | Set<string>)[];
  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
  prices: (string | Set<string>)[];
  houses: IHouse[];
  setHouses: React.Dispatch<React.SetStateAction<IHouse[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HouseContext = createContext<IHouseContext | undefined>(undefined);

const HouseContextProvider = ({ children }: { children: ReactNode }) => {
  const [houses, setHouses] = useState<IHouse[]>(housesData);

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<(string | Set<string>)[]>([]);

  const [property, setProperty] = useState("");
  const [properties, setProperties] = useState<(string | Set<string>)[]>([]);

  const [priceRange, setPriceRange] = useState("");
  const [prices, setPrices] = useState<(string | Set<string>)[]>([]);

  const [loading, setLoading] = useState(false);

  // Show all filters
  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ["All", ...new Set(allCountries)];
    setCountries(uniqueCountries);

    // Properties
    const allProperties = houses.map((house) => house.type);
    const uniqueProperties = ["All", ...new Set(allProperties)];
    setProperties(uniqueProperties);

    // Prices
    const allPrices = houses.map((house) => house.price);
    const uniquePrices = ["All", ...new Set(allPrices)];
    setPrices(uniquePrices);
  }, []);

  const value = {
    country,
    setCountry,
    countries,
    property,
    setProperty,
    properties,
    priceRange,
    setPriceRange,
    prices,
    houses,
    setHouses,
    loading,
    setLoading,
  };

  return (
    <HouseContext.Provider value={value}>{children}</HouseContext.Provider>
  );
};

export default HouseContextProvider;
