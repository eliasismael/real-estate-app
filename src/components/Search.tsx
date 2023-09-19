// Hooks
import { useContext } from "react";
// Components
import CountryDropdown from "./CountryDropdown";
import PropertyDropdown from "./PropertyDropdown";
import PriceRangeDropdown from "./PriceRangeDropdown";
// Context
import { HouseContext, IHouseContext } from "../context/House";
// Utils
import { getNumberFromPrice } from "../utils/getNumberFromPrice";
import { getNumbersFromPriceRange } from "../utils/getNumbersFromPriceRange";
// Constants
import { housesData } from "../constants/data";
// Models
import { IHouse } from "../models/House";

import { RiSearch2Line } from "react-icons/ri";

const Search: React.FC = () => {
  const { priceRange, setHouses, country, property, setLoading } = useContext(
    HouseContext
  ) as IHouseContext;

  const handleSearchClick = (): void => {
    // Get price range or [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] if there is not any selected
    const [minPrice, maxPrice] = getNumbersFromPriceRange(priceRange);
    // Look for houses on that price range
    const newHouses = housesData.filter((house: IHouse) => {
      setLoading(true);
      const housePrice = getNumberFromPrice(house.price);

      // If there is no filter applied, the element can be returned
      // but if there is, verify that it is fulfilled
      const meetsConditions: boolean =
        (!country || house.country === country) &&
        (!property || house.type === property) &&
        (!priceRange || (housePrice >= minPrice && housePrice <= maxPrice));

      if (meetsConditions) return house;
    });

    setTimeout(() => {
      setLoading(false);
      setHouses(newHouses);
    }, 1000);
  };

  return (
    <div
      className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col
    lg:flex-row justify-between items-center gap-4 lg:gap-x-3 relative lg:top-4 
    lg:shadow-md bg-white lg:bg-transparent lg:backdrop-blur rounded-lg"
    >
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />

      <button
        onClick={handleSearchClick}
        className="bg-blue-600 hover:bg-blue-800 transition w-full
      lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg"
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
