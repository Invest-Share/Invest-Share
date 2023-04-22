// import React, { useState, useEffect, useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Box, styled, Typography, Avatar, Button, CssBaseline, TextField, Grid } from '@mui/material';
import {
  Box,
  Typography,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
} from '@mui/material';
import { Container } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import toast, { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios';
// import { useNavigate } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const REGISTER_URL = '/api/signup';

const Register: React.FC = ({ login }: UserProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const [success, setSuccess] = useState<boolean>(false);
  // this hook is used to track PARTIAL user information (first name, last name, email, password), not ALL as seen on App.tsx
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = userData;

  const handleSubmit = async (event: Event): Promise<void> => {
    console.log(userData);
    // Browser has default behaviors in place for particular inputs (below, the Box form submit button submits the form and that's it). Since we want to add additional functionality to the submit button to trigger when it's clicked, we want to prevent browser from doing the default form submission on click.
    event.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ userData }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log(response.data);
        setSuccess(true);
        login(response.data);
      }
    } catch (error) {
      toast.error('Registration Failed');
    }
  };
  // Since no dependencies array is provided, useEffect is constantly checking if registration form submission is successful; if so, redirect to /dashboard
  useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  });

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
