import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Drawer, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton} from '@mui/material';

import { request, setAuthToken } from '../helpers/axios_helper';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import SearchField from '../components/search_field';
import WelcomeMessage from '../components/welcome_message';
import theme from '../context/color_theme';
import CourtAvail from '../components/court_availability';


const drawerWidth = 240;

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [firstname, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserName = async() => {
      try {
        const response = await request("GET", "http://localhost:8080/users/current")
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }

    fetchUserName();
  }, []);

  let navigate = useNavigate();
  const handleLogout = async (e) => {
    // TODO logout logic here
    // Redirect to login page
    setAuthToken(null);
    navigate('/');
  };

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
        <ListItemButton
          padding='10px 20px 10px 20px'
          component={Link}
          to={content.url}
          selected={content.url === location.pathname}
          sx={{ 
            height: '50px',
            border: 'none', 
            borderRadius: '100px',
            padding: '10px 20px 10px 20px',
            ':hover': {
                bgcolor: '',
                color: 'white',
            },            
        }}
        >
            <ListItemIcon 
              sx={{ 
                color: content.url === location.pathname ? theme.palette.primary.main : theme.palette.secondary.main,
              }}>
              
              {content.element}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{
                    color: content.url === location.pathname ? theme.palette.primary.main : theme.palette.secondary.main,
                    fontWeight: content.url === location.pathname ? 'bold' : 'regular',
                  }}
                >
                    {content.name}
                </Typography>
              }
            />
        </ListItemButton>
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
                backgroundColor: theme.palette.secondary.light,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <SearchField />
            </Toolbar>
            <Divider />
            <Toolbar variant='dense' >
              <List>
                {buttonList.map((content, index) => (
                  <ListItem key={content.name} disablePadding>
                      <CustomListItem index={index} content={content}/>
                  </ListItem>
                ))}
              </List>
            </Toolbar>
            <Toolbar sx={{ marginTop: 'auto', pl: '20px', pb: '20px'}}>
                <IconButton
                  aria-label='Logout'
                  color='secondary'
                  sx={{
                    height: '50px',
                    width: '50px',
                    ':hover': {
                      bgcolor: 'secondary.main',
                      color: 'white',
                  },
                  }}
                  onClick={handleClickOpen} // Replace with your logout handler
                >
                  <LogoutIcon/>
                </IconButton>
            </Toolbar>

            <Dialog
              open={open}
              onClose={handleCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{borderRadius: '100px'}}
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to log out?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Once logged out, any unsaved reservations will be lost
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button 
                
                  onClick={handleLogout} 
                  autoFocus 
                  sx={{
                    bgcolor:theme.palette.primary.dark, 
                    color: 'white', 
                    ':hover': {
                      bgcolor: 'primary.dark',
                      color: 'white',
                    },
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Drawer>
          <Box sx={{pl: 2}}>
            <Toolbar></Toolbar>
            {/* TODO set name to be the user's name*/}
            <Toolbar>
              <WelcomeMessage name={firstname}/>
            </Toolbar>
            <Toolbar>
              <CourtAvail />
            </Toolbar>
          </Box>
        </Box>
  );
}
