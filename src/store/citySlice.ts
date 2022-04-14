import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cityWeatherState } from '../components/HomeScreen/types';
import { upgradeCityStateType } from './types';

interface cityWeatherListState {
  cityWeatherList: cityWeatherState[];
}

const initialState: cityWeatherListState = { cityWeatherList: [] };

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCityState(state, action: PayloadAction<cityWeatherState>) {
      state.cityWeatherList.push({
        id: action.payload.id,
        name: action.payload.name,
        weather: action.payload.weather,
        temp: action.payload.temp,
        lat: action.payload.lat,
        lon: action.payload.lon,
      });
    },
    removeCityState(state, action: PayloadAction<number>) {
      state.cityWeatherList = state.cityWeatherList.filter(
        (it) => it.id !== action.payload,
      );
    },
    upgradeCityState(state, action: PayloadAction<upgradeCityStateType>) {
      state.cityWeatherList[action.payload.index] = action.payload.cityWeather;
    },
  },
});

export const { addCityState, removeCityState, upgradeCityState } =
  citySlice.actions;

export default citySlice.reducer;
