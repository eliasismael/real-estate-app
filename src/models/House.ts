export interface IHouse {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  imageLg: string;
  country: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  surface: string;
  year: string;
  price: string;
  agent: IAgent;
}

interface IAgent {
  image: string;
  name: string;
  phone: string;
}
