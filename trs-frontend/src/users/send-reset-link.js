import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';


export default function SendResetLink() {
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/users/forgot-password?email=${email}`, {
        method: 'GET'
      });

      if (response.status === 200) {
        setMessage('Reset password link is sent successfully.');
        setEmail('');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 3000)
      } else {
        setMessage(response.data.message || 'error: Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('error: Something went wrong.');
    }
  };

  return (
    <div className='background-pic'>
      <div className="auth-wrapper">
        <div className="auth-inner-password">
          <form onSubmit={handleResetPassword}>
          <Box mb={4} textAlign="center">
            <Typography variant="h4" component="h4" color="primary">
              Forgot your passowrd?
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{ marginTop: '18px' }}>
                To reset your password, please enter the email address associated with your account.
              </Typography>
          </Box>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
          <Button
            style={{ height: '50px', width: '160px', fontSize: '18px' , borderRadius: '100px'}}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              email === ''
            }
          >
            Submit
          </Button>
        </Box>
          </form>
          {message && message.includes('error') && <p>{message}</p>}
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Reset password link sent successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
