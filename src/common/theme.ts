import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64, 128, 256],
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

export default defaultTheme;
