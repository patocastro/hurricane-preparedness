export type Shelter = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const shelters: Shelter[] = [
  {
    id: "1",
    name: "Refugio 1",
    address: "Mérida, Yucatán",
    latitude: 20.9674,
    longitude: -89.5926
  },
  {
    id: "2",
    name: "Refugio 2",
    address: "Mérida, Yucatán",
    latitude: 20.981,
    longitude: -89.615
  },
  {
    id: "3",
    name: "Refugio 3",
    address: "Mérida, Yucatán",
    latitude: 20.945,
    longitude: -89.604
  }
];