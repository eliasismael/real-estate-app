// Icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
// Models
import { IHouse } from "../models/House";
// Utils
import { getNumberFromPrice } from "../utils/getNumberFromPrice";

interface IHouseProps {
  house: IHouse;
}

const House: React.FC<IHouseProps> = (props): JSX.Element => {
  const { image, type, country, address, bedrooms, bathrooms, surface, price } =
    props.house;

  return (
    // Card
    <div
      className="bg-white shadow-1 p-5 rounded-lg
    rounded-tl-[90px] rounded-br-[90px] border-gray-300 border-b-8 border-r-8
    border-t-0 w-full max-w-[352px] mx-auto
    cursor-pointer hover:shadow-2xl transition"
    >
      <img src={image} alt="house" className="mb-4 flex gap-x-2 text-sm" />

      {/* Main info */}
      <div className="mb-4 flex gap-x-2 text-sm">
        <div className="bg-blue-800 rounded-full text-white px-3">{type}</div>
        <div className="bg-blue-500 rounded-full text-white px-3">
          {country}
        </div>
      </div>

      <div className="text-lg font-semibold max-w-[260px]">{address}</div>

      <div className="text-lg font-semibold max-w-[260px]">{`${getNumberFromPrice(
        price
      )}`}</div>

      {/* Details */}
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiBed />
          </div>
          <div>{bedrooms}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiBath />
          </div>
          <div>{bathrooms}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiArea />
          </div>
          <div>{surface}</div>
        </div>
      </div>
    </div>
  );
};

export default House;
