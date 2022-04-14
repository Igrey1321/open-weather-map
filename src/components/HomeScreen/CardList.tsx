import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import { CardListProps } from './types';
import { useStyles } from './CardList.style';
import { useNavigate } from 'react-router-dom';

export default function CardList(props: CardListProps) {
  const { list, removeCity, upgradeCity } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  if (!list.length) {
    return null;
  }

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
