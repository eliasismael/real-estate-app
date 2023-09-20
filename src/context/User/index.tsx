// Hooks
import { useState, useEffect, createContext, ReactNode } from "react";
// Models
import { IUser } from "../../models/User";
import { IHouse } from "../../models/House";

import { USER_KEY } from "../../constants/localStorageKeys";

export interface IUserContext {
  registeredUsers: IUser[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  favHouses: IHouse[];
  setFavHouses: React.Dispatch<React.SetStateAction<IHouse[]>>;
}

interface IUserContextProps {
  children: ReactNode;
}

// Context
export const UserContext = createContext<IUserContext | undefined>(undefined);

const UserContextProvider = (props: IUserContextProps) => {
  // To match email and password
  const [registeredUsers, setRegisteredUsers] = useState<IUser[]>([]);

  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    // Look for user logGed
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  });

  const [favHouses, setFavHouses] = useState<IHouse[]>([]);

  useEffect(() => {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    registeredUsers,
    setRegisteredUsers,
    favHouses,
    setFavHouses,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
