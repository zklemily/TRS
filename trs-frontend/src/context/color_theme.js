import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A2B0F2',
      main: '#1E2D59',
      dark: '#252B4D',
      contrastText: '#D3D8F2',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#D3D8F2',
    },
  },
});

export default theme;
