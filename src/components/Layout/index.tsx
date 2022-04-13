import { Box } from '@mui/material';
import React from 'react';
import { useStyles } from './index.style';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const classes = useStyles();

  return <Box className={classes.wrapper}>{children}</Box>;
};

export default Layout;
