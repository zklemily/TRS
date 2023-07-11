import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeProvider} from '@mui/material/styles';
import { Box, Drawer, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';

import SearchField from '../components/search_field';
import WelcomeMessage from '../components/welcome_message';
import theme from '../context/color_theme';
const drawerWidth = 240;


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
            ':hover': {
                bgcolor: 'primary.light',
                color: 'white',
            },            
        }}
        >
            <ListItemIcon sx={{ color: theme.palette.primary.main}}>{content.element}</ListItemIcon>
            <ListItemText sx={{ color: theme.palette.primary.dark}}primary={content.name} />
        </ListItemButton>
    </ThemeProvider>
  )

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: theme.palette.secondary.light,
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
            <Toolbar></Toolbar>
            {/* TODO set name to be the user's name*/}
            <WelcomeMessage name='John'/>
            <Typography paragraph>something.</Typography>
          </Box>
        </Box>
    </ThemeProvider>
  );
}
