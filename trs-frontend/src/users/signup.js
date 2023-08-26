import React, { useState } from 'react';
import axios from 'axios';
import { request, setAuthToken } from '../helpers/axios_helper';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Link, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import '../App.css';

export default function SignUp() {


  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isActive: false,
    userType: { type: 'FullTimeStudent' },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const { firstName, lastName, username, email, password, isActive, userType, createdAt, updatedAt } = user;

  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [emailInputTimeout, setEmailInputTimeout] = useState(null);
  const [usernameInputTimeout, setUsernameInputTimeout] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);

    setTimeout(() => {
      navigate('/');
    }, 1000)
  };

  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleInputChange = async   (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    if (name === 'email') {
      clearTimeout(emailInputTimeout);
      setEmailExists(false);

      const timeoutId = setTimeout(() => {
        checkEmailExists(value);
      }, 500); // Adjust the timeout duration as needed

      setEmailInputTimeout(timeoutId);
    }

    if (name === 'username') {
      clearTimeout(usernameInputTimeout);
      setUsernameExists(false);

      const timeoutId = setTimeout(() => {
        checkUsernameExists(value);
      }, 500); // Adjust the timeout duration as needed

      setUsernameInputTimeout(timeoutId);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/check/email=${email}`);
      setEmailExists(response.data !== null);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkUsernameExists = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/check/username=${username}`);
      console.log("HERE!!!!!!");
      console.log(response);
      setUsernameExists(response.data !== null);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    request(
      "POST",
      "/users",
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        isActive: isActive,
        userType: userType,
        createdAt: createdAt,
        updatedAt: updatedAt
      }).then(
        (response) => {
          setAuthToken(response.data.token);
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate('/');
          }, 3000)
        }
      ).catch(
        (error) => {
          setAuthToken(null);
          console.log("HERE!");
          console.error(error);
          // navigate('/');
        }
      )
    

    // const newUser = {
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password,
    //   isActive,
    //   userType,
    //   createdAt,
    //   updatedAt,
    // };

    // try {
    //   const response = await axios.post('http://localhost:8080/users', newUser);
    //   console.log(response.data);
    //   navigate('/');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className='background-pic'>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box mb={4} textAlign="center">
              <Typography variant="h4" component="h4" color="primary">
                Sign Up
              </Typography>
              <Typography variant="h7" component="h7" color="text.secondary">
               Already a member? <Link href="/" color="text.secondary" underline="hover">Log in </Link>
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="First name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  helperText= {usernameExists ? "This username already exists" : "Must be 5-12 characters, start with a letter"}
                  error={(username !== '' && !/^[a-zA-Z][a-zA-Z0-9]{5,12}$/i.test(username)) || usernameExists}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email address"
                  name="email"
                  value={email}
                  helperText= {emailExists ? "This email already exists" : "Must be a valid email address"}
                  onChange={(e) => handleInputChange(e)}
                  error={(email !== '' && !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) || emailExists }
                  inputProps={{
                    pattern: "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+)*$",
                  }}
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
                  helperText= "Must be 12-20 chararcters with uppercase letters, lowercase letters, numbers, and special characters"
                  error={password !== '' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}/i.test(password)}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmedPassword"
                value={confirmedPassword}
                error={confirmedPassword !== password}
                helperText={confirmedPassword !== password ? "Passwords do not match" : "Must be the same password"}
                onChange={handleConfirmedPasswordChange}
              />
            </Grid>
            <Box mt={3} textAlign="center">
            <Button
              style={{ height: '50px', fontSize: '18px' , borderRadius: '100px'}}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={
                firstName === '' ||
                lastName === '' ||
                username === '' ||
                email === '' ||
                password === '' ||
                emailExists ||
                usernameExists ||
                confirmedPassword !== password ||
                !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) ||
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}/i.test(password) ||
                !/^[a-zA-Z][a-zA-Z0-9]{5,12}$/i.test(username)
              }
            >
              Sign Up
            </Button>
          </Box>
          </form>
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Account activation link sent successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}