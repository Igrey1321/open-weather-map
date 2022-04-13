import { Box, Typography } from '@mui/material';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Page not found</Typography>
    </Box>
  );
}
