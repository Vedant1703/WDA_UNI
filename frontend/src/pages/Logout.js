import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';
import { Paper, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // return (
    //     <LogoutContainer>
    //         <h1>{currentUser.name}</h1>
    //         <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
    //         <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
    //         <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
    //     </LogoutContainer>
    // );



return (
  <Paper
    elevation={6}
    sx={{
      padding: 4,
      maxWidth: 420,
      margin: '30px auto',
      //backgroundColor: '#f0e6d2',
      borderRadius: 3,
      textAlign: 'center',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
    }}
  >
    <Typography
      variant="h4"
      color="#d4af37"
      gutterBottom
      sx={{
        fontFamily: "'Cinzel Decorative', cursive",
        fontWeight: 900
      }}
    >
      {currentUser.name}
    </Typography>

    <Typography
      variant="h6"
      sx={{
        fontFamily: "'Cinzel Decorative', cursive",
        fontWeight: 700,
        marginBottom: 3,
        color: '#5c4033'
      }}
    >
      Are you sure you want to log out?
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{
          backgroundColor: '#c62828',  // deep red
          color: '#fff',
          //fontFamily: "'Cinzel Decorative', cursive",
          fontWeight: 700,
          paddingX: 2,
          '&:hover': {
            backgroundColor: '#b71c1c'
          }
        }}
      >
        Log Out
      </Button>

      <Button
        variant="contained"
        startIcon={<CancelIcon />}
        onClick={handleCancel}
        sx={{
          backgroundColor: '#455a64',  // dark slate
          color: '#fff',
          //fontFamily: "'Cinzel Decorative', cursive",
          fontWeight: 700,
          paddingX: 2,
          '&:hover': {
            backgroundColor: '#37474f'
          }
        }}
      >
        Cancel
      </Button>
    </Box>
  </Paper>
);

};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #85769f66;
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
