import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState } from '../pages/detail/types';

interface WeatherListState {
  weatherList: WeatherState | null;
}

const initialState: WeatherListState = { weatherList: null };

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherState(state, action: PayloadAction<WeatherState>) {
      state.weatherList = {
        name: action.payload.name,
        clouds: action.payload.clouds,
        temp: action.payload.temp,
        weather: action.payload.weather,
        wind: action.payload.wind,
        hourlyWeather: action.payload.hourlyWeather,
      };
    },
  },
});

export const { addWeatherState } = weatherSlice.actions;

export default weatherSlice.reducer;
