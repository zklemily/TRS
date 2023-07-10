import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Link} from '@mui/material';


export default function Reset() {
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/users/reset-password?email=${email}&newPassword=${newPassword}`, {
        method: 'PUT'
      });

      if (response.ok) {
        setMessage('Password reset successfully.');
        setEmail('');
        setNewPassword('');
        navigate(`/home`);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
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
      <Box mt={4} textAlign="center">
      <Button
        style={{ height: '50px', fontSize: '18px' , borderRadius: '100px'}}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={
          email === '' ||
          newPassword === ''
        }
      >
        Reset
      </Button>
    </Box>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
