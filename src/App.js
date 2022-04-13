import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './common/theme';
import Root from './components/Root';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Root />
    </ThemeProvider>
  );
}

export default App;
