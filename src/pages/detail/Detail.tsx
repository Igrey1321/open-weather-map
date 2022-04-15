import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Service from '../../API/Service';
import UseFetch from '../../hooks/useFetch';
import { useStyles } from './Detail.style';
import { useDispatch, useSelector } from 'react-redux';
import { addWeatherState } from '../../store/weatherSlice';
import { RootStateType } from '../../store/types';

export default function Detail() {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const weather = useSelector(
    (state: RootStateType) => state.weather.weatherList,
  );

  if (!params.name) {
    return null;
  }

  const { fetching } = UseFetch(async () => {
    const responseGeocoding = await Service.getGeocoding(params.name as string);
    const responseWeather = await Service.getWeather(
      responseGeocoding[0].lat,
      responseGeocoding[0].lon,
    );
    const responseHourlyWeather = await Service.getHourlyWeather(
      responseGeocoding[0].lat,
      responseGeocoding[0].lon,
    );

    const hourlyWeatherList = responseHourlyWeather.hourly;

    const hourlyWeather = hourlyWeatherList
      .slice(0, 9)
      .map((it: { temp: number }) => Math.round(it.temp - 273));

    console.log(hourlyWeather);

    dispatch(
      addWeatherState({
        name: responseWeather.name,
        clouds: responseWeather.clouds.all,
        temp: Math.round(responseWeather.main.temp - 273),
        weather: responseWeather.weather[0].description,
        wind: responseWeather.wind.speed,
        hourlyWeather: hourlyWeather,
      }),
    );
  });

  useEffect(() => {
    fetching();
  }, []);

  if (!weather) {
    return null;
  }

  const getHeightItem = (it: number) =>
    Math.sign(it) === -1 ? Math.abs(it) + 10 : it + 10;

  const getTextItem = (it: number) =>
    Math.sign(it) === -1 ? `-${Math.abs(it)}` : `+${it}`;

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h2" className={classes.text}>
        City: {weather.name}
      </Typography>

      <Typography variant="h3" className={classes.text}>
        Clouds: {weather.clouds} %
      </Typography>

      <Typography variant="h3" className={classes.text}>
        Temperature: {weather.temp} °C
      </Typography>

      <Typography variant="h3" className={classes.text}>
        Weather: {weather.weather}
      </Typography>

      <Typography variant="h3" className={classes.text}>
        Wind: {weather.wind} meter/sec
      </Typography>
      <Box className={classes.hourlyWeather}>
        {weather.hourlyWeather.map((it) => {
          return (
            <Box className={classes.item} key={it} height={getHeightItem(it)}>
              {getTextItem(it)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
