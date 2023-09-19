import { IHouse } from "./House";

export interface IUser {
  // id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  housesInterestedIn?: IHouse[];
}
