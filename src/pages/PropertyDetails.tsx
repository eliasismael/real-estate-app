// Hooks
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SubmitHandler, useForm } from "react-hook-form";
// Icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
// Constants
import { housesData } from "../constants/data";
// Utils
import { getPriceFromNumber } from "../utils/getPriceFromNumber";
// Context
import { IUserContext, UserContext } from "../context/User";
// Components
import FormField from "../components/FormField";
//Models
import { IHouse } from "../models/House";

interface IContactAgentData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const PropertyDetails = (): JSX.Element => {
  // Context
  const { currentUser, housesInterestedIn, setHousesInterestIn } = useContext(
    UserContext
  ) as IUserContext;

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactAgentData>();

  const { id } = useParams();

  if (!id) {
    return <h1>Error 404</h1>;
  }

  // Remove the colon from the id
  const idNumber = parseInt(id.substring(1));
  const house = housesData.find((house) => house.id === idNumber);

  if (!house) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">NO HOUSE</div>
    );
  }

  const [isInterested, setIsInterested] = useState(() => {
    return housesInterestedIn.some(
      (housesInterestedIn) => housesInterestedIn.id === house.id
    );
  });

  const onSubmit: SubmitHandler<IContactAgentData> = (data) =>
    console.log(data);

  const handleInterested = () => {
    const isInterested = housesInterestedIn.some(
      (housesInterestedIn) => housesInterestedIn.id === house.id
    );

    if (!isInterested) {
      setHousesInterestIn((prevState) => [...prevState, house]);
    } else {
      setHousesInterestIn((prevState) => {
        return prevState.filter(
          (houseInterestedIn: IHouse) => houseInterestedIn.id !== house.id
        );
      });
    }

    setIsInterested((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(housesInterestedIn);
  }, [isInterested]);

  return (
    <section>
      <div className="container mx-auto mb-14">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{house.name}</h2>
            <h3 className="text-lg mb-4">{house.address}</h3>
          </div>

          <div className=" mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-blue-800 text-white px-3 rounded-full">
              {house.type}
            </div>
            <div className="bg-blue-600 text-white px-3 rounded-full">
              {house.country}
            </div>
          </div>

          <div className="text-3xl font-semibold text-black">
            {getPriceFromNumber(house.price)}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* House */}
          <div className="max-w-[768px]">
            <div className="mb-8">
              <img
                src={house.imageLg}
                alt={house.name}
                className="rounded-lg"
              />
            </div>
            <div className="flex gap-x-6 text-blue-600 mb-6 border">
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

              {currentUser && (
                <button
                  onClick={handleInterested}
                  className="bg-blue-800 px-4 ml-auto rounded-lg text-white hover:bg-blue-700 transition"
                >
                  I'm interested {isInterested && "Se agregó"}
                </button>
              )}
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

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
