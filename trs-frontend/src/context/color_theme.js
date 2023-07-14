import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#D1D9E2',
      main: '#1E2D59',
      dark: '#252B4D',
      contrastText: '#D3D8F2',
    },
    secondary: {
      light: '#F8F9FB',
      main: '#5F6D7E',
    },
    action: {
      disabledBackground: '#D1D9E2',
    }
  },
});

export default theme;
