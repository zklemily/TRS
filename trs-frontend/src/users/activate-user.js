import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography} from '@mui/material';


export default function Activate() {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState('');

  useEffect(() => {
    async function ActivateUser() {
        const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    try {
      const response = await axios.get(`http://localhost:8080/users/activate?token=${token}`);
      console.log("test print here");
      if (response.status === 200) {
        setMessage('Congratulations! Your account has been activated.');
        setTimeout(() => {
          navigate('/');
        }, 5000)
      } else {
        const errorData = response.data.error;
        setMessage(errorData || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'An error occurred.');
      } else {
        setMessage('Something went wrong.');
            }
        }
    }
    ActivateUser();
  }, [location.search, navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className='background-pic'>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Box textAlign="center">
            <Typography variant="h5" component="h5" color="primary">
              {message}
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
            <Button
              style={{ height: '50px', fontSize: '18px' , borderRadius: '100px', marginTop: '40px'}}
              type="submit"
              variant="contained"
              color="primary"
            >
              Log In
            </Button>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
