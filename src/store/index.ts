import { configureStore } from '@reduxjs/toolkit';
import CitySlice from './citySlice';

const store = configureStore({
  reducer: { city: CitySlice },
});

export default store;
