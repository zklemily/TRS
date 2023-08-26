import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';


export default function Reset() {
  const navigate = useNavigate();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);



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

    if (newPassword !== repeatPassword) {
      setPasswordsMatch(false);
      return;
    }

    e.preventDefault();

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    try {
      const response = await axios.put(`http://localhost:8080/users/reset-password?email=${email}&token=${token}`, {
        newPassword
      });

      if (response.status === 200) {
        setMessage('Password reset successfully.');
        setNewPassword('');
        setSnackbarMessage('Password reset successfully.')
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 3000)
      } else {
        const errorData = response.data;
        setMessage(errorData.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className='background-pic'>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleResetPassword}>
          <Box mb={4} textAlign="center">
            <Typography variant="h4" component="h4" color="primary">
              Reset Password
            </Typography>
          </Box>
          <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              </Grid>
          </Grid>
          </Box>
          <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Repeat New Password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? 'Passwords do not match' : ''}
              />
              </Grid>
          </Grid>
          </Box>
          <Box mt={4} textAlign="center">
          <Button
            style={{ height: '50px', width: '160px', fontSize: '18px' , borderRadius: '100px'}}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              newPassword === '' ||
              repeatPassword === ''
            }
          >
            Reset
          </Button>
        </Box>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
