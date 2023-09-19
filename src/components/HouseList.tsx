// Hooks
import { useContext } from "react";
// Context
import { HouseContext, IHouseContext } from "../context/House";
// Components
import House from "./House";
// Elements
import { Link } from "react-router-dom";
// Icons
import { ImSpinner2 } from "react-icons/im";
// Models
import { IHouse } from "../models/House";

const HouseList = (): JSX.Element => {
  const { houses, loading } = useContext(HouseContext) as IHouseContext;

  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-blue-600 text-4xl mt-[200px]" />
    );
  }

  if (!houses.length) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">
        No houses matched
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {houses.map((house: IHouse) => {
            const HOUSE_URL = `/property/:${house.id}`;
            return (
              <Link to={HOUSE_URL} key={house.id}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
