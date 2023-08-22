import * as React from 'react';
import {AppBar, Box, Toolbar, Container, Button} from '@mui/material';
import { Link } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PennLogo from '../assets/Penn.png'

const pages = ['About', 'Membership', 'Programming'];


function ResponsiveAppBar() {
  // const [anchorEleNav, setAnchorElNav] = React.useState(null);


  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
  };

  return (
    <AppBar color="inherit" sx={{ opacity: '0.8' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters >
            <Box marginRight={4}>
                <Link className="navbar-brand" to={'/'}>
                    <img src={PennLogo} height="30" alt="Penn logo" />
                </Link>
            </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ fontSize: '16px' , borderRadius: '100px', my: 2, mx: 1, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;