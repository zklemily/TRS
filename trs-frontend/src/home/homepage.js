import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Drawer, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';

import SearchField from '../components/search_field';

const drawerWidth = 240;

const theme = createTheme({
    palette: {
      primary: {
        light: '#A2B0F2',
        main: '#1E2D59',
        dark: '#252B4D',
        contrastText: '#D3D8F2',
      },
    },
  });

export default function HomePage() {
  const buttonList = [
    { name: 'Overview', element: <HomeIcon />, url: '/home' },
    { name: 'Profile', element: <AccountCircleIcon />, url: '/profile' },
    { name: 'Directions', element: <AssistantDirectionIcon />, url: '/directions' },
    { name: 'Reservations', element: <CalendarMonthIcon />, url: '/reservations' },
    { name: 'Payments', element: <PaymentIcon />, url: 'payments' },
    { name: 'Preferences', element: <SettingsIcon />, url: 'preferences' }
  ];

  const location = useLocation();

  let CustomListItem = ({ content }) => (
    <ThemeProvider theme={theme}>
        <ListItemButton
          component={Link}
          to={content.url}
          selected={content.url === location.pathname}
          fullWidth
          sx={{ 
            border: 'none', 
            padding: '10px 20px 10px 20px',
        }}
        >
            <ListItemIcon sx={{ color: theme.palette.primary.main}}>{content.element}</ListItemIcon>
            <ListItemText sx={{ color: theme.palette.primary.dark}}primary={content.name} />
        </ListItemButton>
    </ThemeProvider>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SearchField />
        <Divider />
        <List>
          {buttonList.map((content, index) => (
            <ListItem key={content.name} disablePadding>
                <CustomListItem index={index} content={content}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box>
        <Toolbar />
        <Typography paragraph>something.</Typography>
        <Typography paragraph>something.</Typography>
      </Box>
    </Box>
  );
}
