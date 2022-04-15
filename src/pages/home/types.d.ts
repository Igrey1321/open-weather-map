export type cityWeatherState = {
  id: number;
  name: string;
  weather: string;
  temp: number;
  lat: number;
  lon: number;
};

export type LocalGeocodingType = {
  id: number;
  lat: number;
  lon: number;
};

export type WeatherState = {
  name: string;
  weather: string;
  temp: number;
  clouds: action.payload.clouds;
  wind: action.payload.wind;
};
