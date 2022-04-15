import { configureStore } from '@reduxjs/toolkit';
import CitySlice from './citySlice';
import WeatherSlice from './weatherSlice';

const store = configureStore({
  reducer: {
    city: CitySlice,
    weather: WeatherSlice,
  },
});

export default store;
