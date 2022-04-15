import { makeStyles } from '@mui/styles';
import theme from '../../common/theme';

export const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.spacing(3),
    padding: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  },
  text: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  upgrade: {
    backgroundColor: theme.palette.primary.light,
  },
  remove: {
    backgroundColor: theme.palette.error.main,
  },
});
