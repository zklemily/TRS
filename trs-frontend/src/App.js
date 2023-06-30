import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';


import Login from './users/login'
import SignUp from './users/signup'
import ResponsiveAppBar from './components/responsive_app_bar'
import ColorTheme from './context/color_theme'

function App() {
  return (
    <ThemeProvider theme={ColorTheme}>
        <Router>
        <div className="App">
          <ResponsiveAppBar />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App