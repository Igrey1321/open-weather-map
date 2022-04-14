import { Box, Button, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './index.style';
import CardList from './CardList';
import { LocalGeocodingType } from './types';
import Service from '../../API/Service';
import UseFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addCityState } from '../../store/citySlice';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const [fetching] = UseFetch(async () => {
    const localGeocoding = localStorage.getItem('city');

    if (localGeocoding) {
      const geocodingList = JSON.parse(localGeocoding) as LocalGeocodingType[];

      for (const it of geocodingList) {
        const responseWeather = await Service.getWeather(it.lat, it.lon);

        const {
          id,
          name,
          weather,
          main: { temp },
          coord: { lat, lon },
        } = responseWeather;

        dispatch(
          addCityState({
            id,
            name,
            weather: weather[0].main,
            temp: Math.round(temp - 273),
            lat,
            lon,
          }),
        );
      }
    }
  });

  useEffect(() => {
    fetching();
  }, []);

  const chengCityState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const addCity = async () => {
    setError('');

    if (city.length) {
      const cityGeocodingData = await Service.getGeocoding(city);

      if (cityGeocodingData.length) {
        const cityData = await Service.getWeather(
          cityGeocodingData[0].lat,
          cityGeocodingData[0].lon,
        );

        const localGeocodingList = localStorage.getItem('city');

        if (localGeocodingList) {
          const geocodingList = JSON.parse(localGeocodingList);

          geocodingList.push({
            id: cityData.id,
            lat: cityGeocodingData[0].lat,
            lon: cityGeocodingData[0].lon,
          });

          localStorage.setItem('city', JSON.stringify(geocodingList));
        } else {
          localStorage.setItem(
            'city',
            JSON.stringify([
              {
                id: cityData.id,
                lat: cityGeocodingData[0].lat,
                lon: cityGeocodingData[0].lon,
              },
            ]),
          );
        }

        const {
          id,
          name,
          weather,
          main,
          coord: { lat, lon },
        } = cityData;

        dispatch(
          addCityState({
            id,
            name,
            weather: weather[0].main,
            temp: Math.round(main.temp - 273),
            lat,
            lon,
          }),
        );
      } else {
        setError('No city');
      }
    } else {
      setError('Empty field');
    }
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
          onClick={addCity}
        >
          Add city
        </Button>
      </Box>

      <CardList />
    </Box>
  );
}
