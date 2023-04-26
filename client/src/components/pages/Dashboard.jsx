import React, { useState, useEffect } from 'react';
import {
  Box,
  styled,
  Typography,
  Stack,
  CssBaseline,
  InputBase,
} from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import NewsFeed from '../NewsFeed';
import Rightbar from '../Rightbar';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-hot-toast';
import axios from '../../api/axios';

function Dashboard({ user, setUser, login }) {
  const Search = styled('div')(({ theme }) => ({
    backgroundColor: '#F2F2F2',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '20%',
  }));

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get('/auth/getUserInfo', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if (response.data) {
          // setSuccess(true);
          login(response.data);
        }
      } catch (err) {
        toast.error('Cannot get user info.');
      }
    };
    getUserInfo();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', mt: '40px' }}>
        <Container sx={{ width: '20%', ml: '110px' }}>
          <SideNavbar />
        </Container>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingBottom: '10px',
          }}
        >
          <Typography sx={{ fontSize: '24px' }}>
            Hello {user.firstName}!{' '}
          </Typography>
          <NewsFeed />
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
