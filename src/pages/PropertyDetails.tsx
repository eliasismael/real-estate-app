// Hooks
import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// Icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
// Constants
import { housesData } from "../constants/data";
// Utils
import { getPriceFromNumber } from "../utils/getPriceFromNumber";
// Context
import { IUserContext, UserContext } from "../context/User";
// Components
import FormField from "../components/FormField";
//Models
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface IContactAgentData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Error: React.FC = () => (
  <div className="text-center text-3xl text-gray-400 mt-48 min-h-screen">
    No house found
  </div>
);

const PropertyDetails: React.FC = () => {
  ////// STATES //////
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isAFavHouse, setIsAFavHouse] = useState(false);

  ////// CONTEXT //////
  const { currentUser, favHouses, setFavHouses } = useContext(
    UserContext
  ) as IUserContext;

  ////// URL & CURRENT HOUSE //////
  const { id } = useParams();
  if (!id) return <Error />;
  // Remove colon from id and get an integer (":1" => 1)
  const currentHouseId = parseInt(id.substring(1)) || 0;

  const house = housesData.find((house) => house.id === currentHouseId);
  if (!house) return <Error />;

  ////// FORM //////
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContactAgentData>();

  const onSubmit = () => setIsMessageSent(true);

  useEffect(() => {
    setIsMessageSent(false);
  }, [currentHouseId]);

  ////// HANDLE FAV  //////

  useEffect(() => {
    const isAFavHouse: boolean = favHouses.some(
      (favHouse) => favHouse.id === currentHouseId
    );

    setIsAFavHouse(isAFavHouse);
  }, [currentHouseId]);

  const handleFav = () => {
    const isAFavHouse = favHouses.some(
      (favHouse) => favHouse.id == currentHouseId
    );

    if (!isAFavHouse) {
      setFavHouses((prevState) => [...prevState, house]);
    } else {
      setFavHouses((prevState) =>
        prevState.filter((favHouse) => favHouse.id !== house.id)
      );
    }

    setIsAFavHouse((prevState) => !prevState);
  };

  return (
    <section>
      <div className="container mx-auto mb-14">
        {/* Main info */}
        <div className="flex flex-col py-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{house.name}</h2>
            <h3 className="text-lg mb-2">{house.address}</h3>
          </div>

          <div className=" mb-4 lg:mb-0 flex gap-x-2 text-sm items-center">
            <div className="bg-blue-800 text-white px-3 h-6 rounded-full flex items-center justify-center">
              {house.type}
            </div>
            <div className="bg-blue-600 text-white px-3 h-6 rounded-full flex items-center">
              {house.country}
            </div>

            {currentUser && (
              <>
                {!isAFavHouse ? (
                  <AiOutlineStar
                    onClick={handleFav}
                    className="text-yellow-500 text-4xl cursor-pointer"
                  />
                ) : (
                  <AiFillStar
                    onClick={handleFav}
                    className="text-yellow-500 text-4xl cursor-pointer"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* House */}
          <div className="max-w-[768px]">
            <div className="mb-8 overflow-hidden">
              <img
                src={house.imageLg}
                alt={house.name}
                className="w-full bject-cover rounded-lg"
              />
            </div>
            <div className="flex items-center gap-x-6 text-blue-600 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-4xl" />
                <div>{house.bedrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-4xl" />
                <div>{house.bathrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-4xl" />
                <div>{house.surface}</div>
              </div>

              <div className="text-2xl font-semibold text-black bg-gray-200 rounded-full px-6 ml-auto">
                {getPriceFromNumber(house.price)}
              </div>
            </div>
          </div>

          {/* Agent */}
          <div className="flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8 ">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                <img src={house.agent.image} />
              </div>
              <div>
                <div className="font-bold text-lg">{house.agent.name}</div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormField
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={currentUser ? currentUser.name : ""}
                register={register}
                errors={errors}
              />

              <FormField
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={currentUser ? currentUser.email : ""}
                register={register}
                errors={errors}
              />

              <FormField
                type="text"
                name="phone"
                placeholder="Phone"
                register={register}
                errors={errors}
              />

              <textarea
                className="border border-gray-300 focus:border-blue-600  outlined-none resize-none rounded w-full p-4 h-24 text-sm text-gray-400"
                placeholder="Message"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-red-500">This field is required</span>
              )}
              {!isMessageSent ? (
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition"
                >
                  Send message
                </button>
              ) : (
                <div>
                  <div className="text-green-500 text-lg text-center rounded mb-4  w-full transition">
                    Message sent succesfully!
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMessageSent(false);
                      reset();
                    }}
                    className="bg-blue-600 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition"
                  >
                    Send a new message
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Rows */}
        <div className="flex justify-center gap-20">
          <Link
            to={
              currentHouseId !== 1
                ? `/property/:${currentHouseId - 1}`
                : `/property/:${currentHouseId}`
            }
            className={`${currentHouseId === 1 && "cursor-default"}`}
          >
            <BsFillArrowLeftCircleFill
              className={`text-5xl shadow-1 rounded-full ${
                currentHouseId !== 1
                  ? "text-gray-200 hover:text-gray-300"
                  : "text-gray-100"
              } `}
            />
          </Link>

          <Link
            to={
              currentHouseId !== housesData.length
                ? `/property/:${currentHouseId + 1}`
                : `/property/:${currentHouseId}`
            }
            className={`${
              currentHouseId === housesData.length && "cursor-default"
            }`}
          >
            <BsFillArrowRightCircleFill
              className={`text-5xl shadow-1 rounded-full ${
                currentHouseId !== housesData.length
                  ? "text-gray-200 hover:text-gray-300"
                  : "text-gray-100"
              } `}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
