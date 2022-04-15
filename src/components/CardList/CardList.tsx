import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import { LocalGeocodingType } from '../../pages/home/types';
import { useStyles } from './CardList.style';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Service from '../../API/Service';
import { removeCityState, upgradeCityState } from '../../store/citySlice';
import { RootStateType } from '../../store/types';

export default function CardList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const list = useSelector(
    (state: RootStateType) => state.city.cityWeatherList,
  );
  const dispatch = useDispatch();

  if (!list.length) {
    return null;
  }

  const upgradeCity = async (lat: number, lon: number, id: number) => {
    const responseWeather = await Service.getWeather(lat, lon);

    const { name, weather, main } = responseWeather;

    const index = list.findIndex((it) => it.id === id);

    dispatch(
      upgradeCityState({
        index,
        cityWeather: {
          id,
          name,
          weather: weather[0].main,
          temp: Math.round(main.temp - 273),
          lat,
          lon,
        },
      }),
    );
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

    dispatch(removeCityState(id));
  };

  return (
    <Box className={classes.wrapper}>
      {list.map((it) => {
        return (
          <Card
            key={it.id}
            variant="outlined"
            className={classes.card}
            onClick={() => navigate(`/city/${it.name}`)}
          >
            <Box className={classes.text}>
              <Typography variant="h3">City: {it.name}</Typography>

              <Typography variant="h4">Weather: {it.weather}</Typography>

              <Typography variant="h4">Temperature: {it.temp} °C</Typography>
            </Box>

            <Box className={classes.buttons}>
              <Button
                className={classes.upgrade}
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  upgradeCity(it.lat, it.lon, it.id);
                }}
              >
                Upgrade
              </Button>

              <Button
                className={classes.remove}
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCity(it.id);
                }}
              >
                Remove
              </Button>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
