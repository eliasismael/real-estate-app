// Hooks
import { useState, useContext } from "react";
// Elements
import { Link } from "react-router-dom";
// Assets
import Icon from "../assets/img/icon/house-symbol-home-icon-sign-design-free-png.webp";
// Components
import LogIn from "./LogIn";
import SignUp from "./SignUp";
// Context
import { IUserContext, UserContext } from "../context/User";
// Icons
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Menu } from "@headlessui/react";

const Header: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as IUserContext;

  // Modals
  const [isLogInVisible, setIsLogInVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("USER");
    setCurrentUser(null);
  };

  const menuItems = [
    { title: "Profile", link: "/profile" },
    { title: "Log out" },
  ];

  return (
    <header className="py-6 mb-12 border-b border-black bg-white shadow-1">
      {/* Logo */}
      <div className="container mx-auto flex justify-between items-center  ">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img src={Icon} alt="logo" className="w-12 h-auto " />
            <h1 className="text-4xl">Dream House</h1>
          </div>
        </Link>

        {/* MODALS */}
        {isLogInVisible && (
          <LogIn
            isLogInVisible={isLogInVisible}
            setIsLogInVisible={setIsLogInVisible}
          />
        )}

        {isSignUpVisible && (
          <SignUp
            isSignUpVisible={isSignUpVisible}
            setIsSignUpVisible={setIsSignUpVisible}
          />
        )}

        {/* User logged */}
        {currentUser ? (
          <div className="flex justify-center items-center gap-4">
            <Link to={"/profile"}>
              <AiOutlineUser className="text-3xl border rounded-lg w-14 h-14 p-3 text-blue-800 " />
            </Link>

            <Menu as="div" className="relative">
              <Menu.Button className="border rounded-lg p-3 w-full text-left">
                <AiOutlineMenu className="text-3xl cursor-pointer text-blue-800" />
              </Menu.Button>

              <Menu.Items className="absolute z-10 text-[15px] p-8 space-y-6 w-36 right-0  list-none rounded-b-lg shadow-md bg-white/90">
                {menuItems.map((item, i) => {
                  return (
                    <Menu.Item
                      as="li"
                      key={i}
                      className="cursor-pointer text-black hover:text-blue-600 transition text-end"
                    >
                      {item.link ? (
                        <Link to={item.link}>{item.title}</Link>
                      ) : (
                        <li onClick={logout}>{item.title}</li>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          //User unlogged
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsLogInVisible(true)}
              className="hover:text-blue-600 transition"
            >
              Log in
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition"
              onClick={() => setIsSignUpVisible(true)}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
