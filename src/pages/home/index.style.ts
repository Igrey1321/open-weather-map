import { makeStyles } from '@mui/styles';
import theme from '../../common/theme';

export const useStyles = makeStyles({
  wrapper: {
    padding: theme.spacing(4),
  },
  search: {
    display: 'flex',
  },
  inputCity: {
    width: theme.spacing(7),
    height: theme.spacing(5),
    marginRight: theme.spacing(4),
    padding: theme.spacing(3),
    fontSize: theme.spacing(3),
  },
  addCity: {
    height: theme.spacing(5),
    width: theme.spacing(6),
    backgroundColor: theme.palette.success.main,
  },
});
