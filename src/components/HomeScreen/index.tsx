import { Box, Button, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from './index.style';
import CardList from './CardList';
import { cityWeatherState } from './types';
import Service from '../../API/Service';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [cityWeatherList, setCityWeatherList] = useState<
    cityWeatherState[] | []
  >([]);
  const classes = useStyles();

  const chengCityState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getCityGeocoding = async () => {
    setError('');

    if (city.length) {
      const cityGeocodingData = await Service.getGeocoding(city);

      if (cityGeocodingData.length) {
        const cityData = await Service.getWeather(
          cityGeocodingData[0].lat,
          cityGeocodingData[0].lon,
        );

        setCityWeatherList([
          ...cityWeatherList,
          {
            id: cityData.id,
            name: cityData.name,
            weather: cityData.weather[0].main,
            temp: Math.round(cityData.main.temp - 273),
            lat: cityData.coord.lat,
            lon: cityData.coord.lon,
          },
        ]);
      } else {
        setError('No city');
      }
    } else {
      setError('Empty field');
    }
  };

  const removeCity = (id: number) => {
    setCityWeatherList(cityWeatherList.filter((it) => it.id !== id));
  };

  const upgradeCity = async (lat: number, lon: number, id: number) => {
    const responseWeather = await Service.getWeather(lat, lon);

    const { name, weather, main } = responseWeather;

    const indexCity = cityWeatherList.findIndex((it) => it.id === id);

    const newCityWeatherList = cityWeatherList;

    newCityWeatherList[indexCity] = {
      id,
      name,
      weather: weather[0].main,
      temp: Math.round(main.temp - 273),
      lat,
      lon,
    };

    setCityWeatherList(newCityWeatherList);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.search}>
        <Box>
          <input
            className={classes.inputCity}
            placeholder="City"
            onChange={chengCityState}
          />

          <FormHelperText>{error}</FormHelperText>
        </Box>

        <Button
          className={classes.addCity}
          variant="contained"
          onClick={getCityGeocoding}
        >
          Add city
        </Button>
      </Box>

      <CardList
        list={cityWeatherList}
        removeCity={removeCity}
        upgradeCity={upgradeCity}
      />
    </Box>
  );
}
