import { makeStyles } from '@mui/styles';
import theme from '../../common/theme';

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.action.focus,
  },
  text: {
    padding: theme.spacing(2),
  },
  hourlyWeather: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  item: {
    backgroundColor: theme.palette.error.light,
    minWidth: '70px',
    lineHeight: '3',
    textAlign: 'center',
  },
});
