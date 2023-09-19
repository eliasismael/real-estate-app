import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { getPriceFromNumber } from "../utils/getPriceFromNumber";
import { IUserContext, UserContext } from "../context/User";
import { IHouse } from "../models/House";
const UserProfile = (): JSX.Element => {
  const { userId } = useParams();

  const { currentUser, housesInterestedIn } = useContext(
    UserContext
  ) as IUserContext;
  // Datos de usuario por defecto (puedes reemplazarlos con datos reales)
  const user = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (123) 456-7890",
    interestedHouses: [
      {
        id: 1,
        name: "Cozy Cottage",
        address: "123 Main St",
        type: "House",
        country: "United States",
        price: 150000,
        bedrooms: 2,
        bathrooms: 1,
        surface: "1200 sqft",
        description: "A beautiful cottage in a peaceful neighborhood.",
        imageLg: "/path-to-house-image.jpg",
        agent: {
          name: "Agent Smith",
          image: "/path-to-agent-image.jpg",
        },
      },
      {
        id: 2,
        name: "Modern Apartment",
        address: "456 Elm St",
        type: "Apartment",
        country: "United States",
        price: 1200,
        bedrooms: 1,
        bathrooms: 1,
        surface: "800 sqft",
        description: "A stylish modern apartment with a great view.",
        imageLg: "/path-to-apartment-image.jpg",
        agent: {
          name: "Agent Johnson",
          image: "/path-to-agent-image.jpg",
        },
      },
      // Agrega más casas de interés si es necesario
    ],
  };

  if (!currentUser)
    return (
      <section className="container mx-auto min-h-[800px]">
        <h1 className="text-gray-300 text-4xl text-center my-8">No user</h1>;
      </section>
    );

  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
            <h3 className="text-lg mb-4">{currentUser.email}</h3>
            {/* <h3 className="text-lg">{user.phone}</h3> */}
          </div>

          {/* Opcional: Botones de edición o perfil */}
          <div className="mb-4 lg:mb-0">
            <Link to={`/edit-profile/${userId}`} className="text-blue-600">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Sección de Casas por las que está interesado */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Casas por las que está interesado
          </h2>
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
                      {/* {getPriceFromNumber(house.price)}
                       */}
                      4556
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
