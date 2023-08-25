import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import Login from './users/login';
import SignUp from './users/signup';
import HomePage from './home/homepage';
import ResponsiveAppBar from './components/responsive_app_bar';
import ColorTheme from './context/color_theme';
import ShowNavbar from './context/show_navbar';
import Reset from'./users/reset-password';
import SendResetLink from './users/send-reset-link';

function App() {
  return (
    <ThemeProvider theme={ColorTheme}>
      <Router>
        <div className="App">
          <ShowNavbar>
            <ResponsiveAppBar />
          </ShowNavbar>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/send-reset-link" element={<SendResetLink />} />
            <Route path="/reset-password/*" element={<Reset />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
