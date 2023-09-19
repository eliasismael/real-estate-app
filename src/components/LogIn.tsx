// Hooks
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// Context
import { UserContext, IUserContext } from "../context/User";
// Components
import Modal from "./Modal";
import FormField from "./FormField";

// Models
import { IUser } from "../models/User";

interface ILogInProps {
  isLogInVisible: boolean;
  setIsLogInVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ILogInData {
  email: string;
  password: string;
}

const LogIn: React.FC<ILogInProps> = (props): JSX.Element => {
  const [areInvalidInputs, setAreInvalidInputs] = useState(false);

  const { registeredUsers, setCurrentUser } = useContext(
    UserContext
  ) as IUserContext;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogInData>();

  const onSubmit: SubmitHandler<ILogInData> = (logInData) => {
    if (!registeredUsers) {
      setAreInvalidInputs(true);
      return;
    }

    const user = registeredUsers.find(
      (user: IUser) =>
        user.email === logInData.email && user.password === logInData.password
    );

    if (!user) {
      setAreInvalidInputs(true);
      return;
    }

    setCurrentUser(user);
    props.setIsLogInVisible(false);
  };

  return (
    <Modal>
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        {/* Capa de opacidad */}
        <div
          onClick={() => props.setIsLogInVisible(false)}
          className="bg-black opacity-50 absolute w-full h-full"
        ></div>{" "}
        {/* Contenido */}
        <div className="w-3/5 sm:w-2/5 lg:w-1/5 rounded-lg bg-white py-10 px-10 flex flex-col justify-center items-center gap-4 relative">
          <h2 className="text-blue-600 text-2xl font-bold">Log In</h2>
          {/* Mail */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
            />

            {/* Password */}
            <FormField
              name="password"
              placeholder="Password"
              type="password"
              register={register}
              errors={errors}
            />

            {areInvalidInputs && (
              <span className="text-red-500">Email or password invalid</span>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-700 hover:shadow-1 transition"
            >
              Confirm
            </button>

            <button
              type="button"
              className="bg-white text-blue-700 border border-blue-700 rounded-lg px-4 py-2 hover:text-blue-500 hover:border-blue-500 hover:shadow-1 transition"
              onClick={() => props.setIsLogInVisible(false)}
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LogIn;
