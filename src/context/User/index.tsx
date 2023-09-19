// Hooks
import { useState, useEffect, createContext, ReactNode } from "react";
import { IUser } from "../../models/User";
import { IHouse } from "../../models/House";

export interface IUserContext {
  loged: boolean;
  setLoged: React.Dispatch<React.SetStateAction<boolean>>;
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

  const [registeredUsers, setRegisteredUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loged, setLoged] = useState(false);
  const [housesInterestedIn, setHousesInterestIn] = useState<IHouse[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("USER");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }

    console.log("user from lc:", JSON.parse(user as string));
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    registeredUsers,
    setRegisteredUsers,
    loged,
    setLoged,
    housesInterestedIn,
    setHousesInterestIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
