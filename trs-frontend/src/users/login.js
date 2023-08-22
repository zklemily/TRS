import React, {  useState } from 'react';
import axios from 'axios';
import { request, setAuthToken } from '../helpers/axios_helper';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Link} from '@mui/material';
import PennImage from "../assets/tennis_center.png";

export default function Login() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const [formError, setError] = useState('');

  // const [emailExists, setEmailExists] = useState(false);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    // if (name === 'email') {
    //   const exists = await checkEmailExists(value);
    //   setEmailExists(exists);
    // }
  };


  // const checkEmailExists = async (email) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/users/check-email=${email}`);
  //     return response.data !== null;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    request(
      "POST",
      "/users/login",
      {
        username: username,
        password: password
      }
    ).then(
      (response) => {
        setAuthToken(response.data.token);
        navigate("/home");
      }).catch(
        (error) => {
          console.error(error);
          setAuthToken(null);
          navigate("/");
        }
      )



    // const newUser = {
    //   username,
    //   password
    // };

    

    // try {
    //   const response = await axios.post('http://localhost:8080/users/login', newUser);
    //   console.log(response.data);
      
    //   if (response.status === 200) {
    //     // Redirect to the user homepage
    //     navigate('/home');
    //   } else {
    //     setError(response.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className='background-pic'>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={(e) => handleSubmit(e)}>
            {formError && <p>{formError}</p>}
            <Box mb={2} textAlign="center">
             <img src={PennImage} height="80" alt="tennis center" />
            </Box>
            <Box mb={4} textAlign="center">
              <Typography variant="h7" component="h7" color="text.secondary">
               New member? <Link href="/sign-up" color="text.secondary" underline="hover"> Sign up </Link>
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email address"
                  name="email"
                  value={email}
                  onChange={(e) => handleInputChange(e)}
                  inputProps={{
                    pattern: "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+)*$",
                  }}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            </Grid>
            <Box mt={1} textAlign="left">
              <FormControlLabel
                control={
                <Checkbox 
                sx={{ '& .MuiSvgIcon-root': { fontSize: 16} }} 
                />
              }
                label={<span style={{ fontSize: 14, fontWeight:'lighter'}}>Remember me</span>}
              />
            </Box>
            <Box mt={4} textAlign="center">
            <Button
              style={{ height: '50px', fontSize: '18px' , borderRadius: '100px'}}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={
                username === '' ||
                password === ''
              }
            >
              Login
            </Button>
          </Box>
          <Box mt={1} textAlign="center">
            <Typography variant="body2" component="body2">
                <Link href="/reset-password" color="text.secondary" underline="hover"> Forgot password? </Link>
            </Typography>
          </Box>
      
          </form>
        </div>
      </div>
    </div>
  )
}
