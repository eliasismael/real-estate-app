// Hooks
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
// import { BiBed, BiBath, BiArea } from "react-icons/bi";
// Utils
import { getPriceFromNumber } from "../utils/getPriceFromNumber";
// Context
import { IUserContext, UserContext } from "../context/User";
// import { IHouse } from "../models/House";
const UserProfile = (): JSX.Element => {
  const { userId } = useParams();

  const { currentUser, housesInterestedIn } = useContext(
    UserContext
  ) as IUserContext;

  if (!currentUser)
    return (
      <section className="container mx-auto min-h-[800px]">
        <div className="text-gray-300 text-4xl text-center my-8">No user</div>
      </section>
    );

  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14">
        {/* Main info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-2xl font-semibold">{currentUser.name}</p>
            <p className="text-lg mb-4">{currentUser.email}</p>
          </div>
        </div>

        {/* Favorite houses*/}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Favorite houses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {housesInterestedIn.map((house) => (
              <div
                key={house.id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-1 transition"
              >
                <Link to={`/property/:${house.id}`}>
                  <img
                    src={house.imageLg}
                    alt={house.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{house.name}</h3>
                    <p className="text-gray-600">{house.address}</p>
                    <div className="text-blue-600 font-semibold mt-2">
                      {getPriceFromNumber(house.price)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
