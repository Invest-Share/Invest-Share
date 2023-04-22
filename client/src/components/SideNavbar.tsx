// import React from 'react';
// import { Box, styled, Typography, Stack, CssBaseline, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
// import { Container } from '@mui/system';
// import { Link, useNavigate } from 'react-router-dom';
// import Profile from './pages/Profile';
// import PersonIcon from '@mui/icons-material/Person';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  SvgIconTypeMap,
} from '@mui/material';

const SideNavbar: React.FC = (): JSX.Element => {
  // To type useNavigate hook, either 1) import NavigateFunction from @types/react library, or 2) use below from React Router docs (https://reactrouter.com/en/main/hooks/use-navigate#type-declaration)
  const navigate: NavigateFunction = useNavigate();
  // no need to type declare menuList
  const menuList = [
    {
      text: 'Homepage',
      path: '/dashboard',
      icon: <HomeIcon />,
    },
    {
      text: 'My Profile',
      path: '/profile',
      icon: <AccountBoxIcon />,
    },
    {
      text: 'Friends',
      path: '/friends',
      icon: <PeopleIcon />,
    },
  ];

  // sx = MUI prop to add custom styling
  // xs, sm, etc. = theme.breakpoints
  return (
    <>
      <Box ml={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <List>
          {menuList.map((item) => (
            <ListItem
              disablePadding
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SideNavbar;
