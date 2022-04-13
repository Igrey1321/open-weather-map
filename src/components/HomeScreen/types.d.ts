export type cityWeatherState = {
  id: number;
  name: string;
  weather: string;
  temp: number;
  lat: number;
  lon: number;
};

export type CardListProps = {
  list: cityWeatherState[];
  removeCity: (id: number) => void;
  upgradeCity: (lat: number, lon: number, id: number) => void;
};
