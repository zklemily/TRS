import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Link} from '@mui/material';
import PennImage from "../assets/tennis_center.png";

export default function Login() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const [emailExists, setEmailExists] = useState(false);
  const handleInputChange = async   (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    if (name === 'email') {
      const exists = await checkEmailExists(value);
      setEmailExists(exists);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/check-email=${email}`);
      return response.data !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    navigate('/'); // Redirect to the home page
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box mb={2} textAlign="center">
       <img src={PennImage} height="80" alt="tennis center" />
      </Box>

      <Box mb={4} textAlign="center">   
        <Typography variant="h7" component="h7" color="text.secondary">
         New member? <Link href="/sign-up" color="text.secondary" underline="hover"> Sign up </Link>
        </Typography>
      </Box>


      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type="email"
            label="Email address"
            name="email"
            value={email}
            // helperText= {
            //   email === '' ? "" : ( 
            //     !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) ? "Must be a valid email address" : ( 
            //       emailExists ? "" : "This email does not exist yet")
            //   )
            // }
            onChange={(e) => handleInputChange(e)}
            // error={(email !== '' && !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) || (email !== '' && !emailExists) }
            inputProps={{
              pattern: "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+)*$",
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
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
      </Grid>
      <Box mt={1} textAlign="left">
        <FormControlLabel 
          control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16} }} />} 
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
          email === '' ||
          password === '' ||
          !emailExists ||
          !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)
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
  )
}
