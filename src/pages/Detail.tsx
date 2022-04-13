import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Service from '../API/Service';
import UseFetch from '../hooks/useFetch';
import { useStyles } from './Detail.style';
import { WeatherState } from './types';

export default function Detail() {
  const params = useParams();
  const classes = useStyles();
  const [weather, setWeather] = useState<WeatherState | null>(null);

  if (!params.name) {
    return null;
  }

  const [fetching] = UseFetch(async () => {
    const responseGeocoding = await Service.getGeocoding(params.name as string);
    const responseWeather = await Service.getWeather(
      responseGeocoding[0].lat,
      responseGeocoding[0].lon,
    );

    setWeather({
      name: responseWeather.name,
      clouds: responseWeather.clouds.all,
      temp: Math.round(responseWeather.main.temp - 273),
      weather: responseWeather.weather[0].description,
      wind: responseWeather.wind.speed,
    });
  });

  useEffect(() => {
    fetching();
  }, []);

  if (!weather) {
    return null;
  }

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
    </Box>
  );
}
