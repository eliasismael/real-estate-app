// Hooks
import { useState, useContext } from "react";
// Context
import { HouseContext, IHouseContext } from "../context/House";
// Icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";

const CountryDropdown = (): JSX.Element => {
  const { country, setCountry, countries } = useContext(
    HouseContext
  ) as IHouseContext;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {country || "Country"}
          </div>
          <div className="text-[13px]">Select your place</div>
        </div>

        {/* Row direction */}
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {countries.map((country, i) => {
          return (
            <Menu.Item
              as="li"
              key={i}
              onClick={() => {
                if (country === "All") {
                  setCountry("");
                  return;
                }
                setCountry(country as string);
              }}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
