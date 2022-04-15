import { cityWeatherState } from '../pages/home/types';
import store from './index';

export type upgradeCityStateType = {
  index: number;
  cityWeather: cityWeatherState;
};

export type RootStateType = ReturnType<typeof store.getState>;
