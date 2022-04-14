import { Box, Button, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './index.style';
import CardList from './CardList';
import { cityWeatherState, LocalGeocodingType } from './types';
import Service from '../../API/Service';
import UseFetch from '../../hooks/useFetch';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [cityWeatherList, setCityWeatherList] = useState<
    cityWeatherState[] | []
  >([]);
  const classes = useStyles();

  const [fetching] = UseFetch(async () => {
    const localGeocoding = localStorage.getItem('city');

    if (localGeocoding) {
      const geocodingList = JSON.parse(localGeocoding) as LocalGeocodingType[];

      const accumulator = [];

      for (const it of geocodingList) {
        const responseWeather = await Service.getWeather(it.lat, it.lon);

        const {
          id,
          name,
          weather,
          main: { temp },
          coord: { lat, lon },
        } = responseWeather;

        accumulator.push({
          id,
          name,
          weather: weather[0].main,
          temp: Math.round(temp - 273),
          lat,
          lon,
        });
      }

      setCityWeatherList(accumulator);
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

        setCityWeatherList([
          ...cityWeatherList,
          {
            id,
            name,
            weather: weather[0].main,
            temp: Math.round(main.temp - 273),
            lat,
            lon,
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
    const localGeocodingList = localStorage.getItem('city');
    if (localGeocodingList) {
      const geocodingList = JSON.parse(
        localGeocodingList,
      ) as LocalGeocodingType[];

      localStorage.setItem(
        'city',
        JSON.stringify(geocodingList.filter((it) => it.id !== id)),
      );
    }

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
          onClick={addCity}
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
