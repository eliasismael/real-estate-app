// Hooks
import { useState, useContext } from "react";
// Context
import { HouseContext, IHouseContext } from "../context/House";
// Icons
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";

const PropertyDropdown: React.FC = () => {
  const { property, setProperty, properties } = useContext(
    HouseContext
  ) as IHouseContext;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="dropdown-btn w-full text-left"
      >
        <RiHome5Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {property || "Type"}
          </div>
          <div className="text-[13px]">Select your house type</div>
        </div>

        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {properties.map((property, i) => {
          return (
            <Menu.Item
              as="li"
              key={i}
              onClick={() => {
                if (property === "All") {
                  setProperty("");
                  return;
                }

                setProperty(property as string);
              }}
              className="cursor-pointer hover:text-blue-800 transition"
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
