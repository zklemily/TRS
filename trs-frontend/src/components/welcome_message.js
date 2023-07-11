import React from 'react';
import {Container, Typography} from '@mui/material';
import theme from '../context/color_theme';

const WelcomeMessage = ({ name }) => {
  return (
      <Container sx={{pb: '20px'}}>
        <Typography variant="h4" component="h4" color={theme.palette.primary.dark}>
        <strong>Hey there, {name}!</strong>
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.secondary.main}>
          Welcome back to your Penn tennis court reservation system
        </Typography>
      </Container>
  );
};

export default WelcomeMessage;