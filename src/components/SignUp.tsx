// Hooks
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../hooks/useLocalStorage";
// Component
import Modal from "./Modal";
// Context
import { IUserContext, UserContext } from "../context/User";
// Models
import { IUser } from "../models/User";
// Components
import FormField from "./FormField";

interface ISignUpProps {
  isSignUpVisible: boolean;
  setIsSignUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISignUpData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const SignUp: React.FC<ISignUpProps> = (props) => {
  // Context
  const { setRegisteredUsers } = useContext(UserContext) as IUserContext;
  const [userInfo, setUserInfo] = useLocalStorage({ key: "USER" });

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>();

  const onSubmit = (data: ISignUpData) => {
    const passwordsMatch = data.password === data.confirmedPassword;
    if (!passwordsMatch) return alert("Password don't match");

    const newUser: IUser = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    // Set to localStorage
    setUserInfo(newUser);
    setRegisteredUsers((prevState) => [...prevState, newUser]);
    props.setIsSignUpVisible(false);
  };

  return props.isSignUpVisible ? (
    <Modal>
      {/* Modal */}
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10">
        {/* Opacity layer */}
        <div
          onClick={() => props.setIsSignUpVisible(false)}
          className="bg-black opacity-50 absolute w-screen h-screen"
        ></div>
        {/* Content */}
        <div className="rounded-lg bg-white p-8  z-20">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-blue-600 text-2xl font-bold mb-4 text-center">
              Sign Up
            </p>

            {/* Name */}
            <FormField
              name="name"
              placeholder="Name"
              register={register}
              errors={errors}
            />

            {/* Last Name */}
            <FormField
              name="lastName"
              placeholder="Last name"
              register={register}
              errors={errors}
            />

            {/* Email */}
            <FormField
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
            />

            {/* Password */}
            <FormField
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              errors={errors}
            />

            <FormField
              name="confirmedPassword"
              type="password"
              placeholder="Confirm password"
              register={register}
              errors={errors}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-700 hover:shadow-1 transition"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => props.setIsSignUpVisible(false)}
              className="bg-white text-blue-700 border border-blue-700 rounded-lg px-4 py-2 hover:text-blue-500 hover:border-blue-500 hover:shadow-1 transition"
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default SignUp;
