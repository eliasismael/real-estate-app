// Hooks
import { useState, useContext } from "react";
// Context
import { HouseContext, IHouseContext } from "../context/House";
// Constants
import { priceRanges } from "../constants/priceRanges";
// Icons
import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { Menu } from "@headlessui/react";

const PriceRangeDropdown = (): JSX.Element => {
  const { priceRange, setPriceRange } = useContext(
    HouseContext
  ) as IHouseContext;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {priceRange || "Price"}
          </div>
          <div className="text-[13px]">Choose price range</div>
        </div>

        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {priceRanges.map((priceRange, i) => {
          return (
            <Menu.Item
              as="li"
              key={i}
              onClick={() => {
                setPriceRange(priceRange.value);
              }}
              className="cursor-pointer hover:text-blue-800 transition"
            >
              {priceRange.value === "Price" ? "All" : priceRange.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
