// Hooks
import { useState, useEffect, createContext, ReactNode } from "react";
// Models
import { IUser } from "../../models/User";
import { IHouse } from "../../models/House";

export interface IUserContext {
  registeredUsers: IUser[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  housesInterestedIn: IHouse[];
  setHousesInterestIn: React.Dispatch<React.SetStateAction<IHouse[]>>;
}

interface IUserContextProps {
  children: ReactNode;
}

// Context
export const UserContext = createContext<IUserContext | undefined>(undefined);

const UserContextProvider = (props: IUserContextProps) => {
  const { children } = props;

  // To match email and password
  const [registeredUsers, setRegisteredUsers] = useState<IUser[]>([]);

  const [currentUser, setCurrentUser] = useState<IUser | null>(() => {
    // Look for user logGed
    const user = localStorage.getItem("USER");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  });

  const [housesInterestedIn, setHousesInterestIn] = useState<IHouse[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("USER");
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
    housesInterestedIn,
    setHousesInterestIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
