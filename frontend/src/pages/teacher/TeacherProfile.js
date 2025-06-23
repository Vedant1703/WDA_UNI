import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
  import { Paper,  Box, Divider } from '@mui/material';
const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school



return (
  <Paper
    elevation={6}
    sx={{
      padding: 4,
      maxWidth: 450,
      margin: '30px auto',
      backgroundColor: '#f0e6d2', // subtle gold-tinted background
      borderRadius: 3,
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
    }}
  >
    <Typography
      variant="h4"
      align="center"
      color="#d4af37"
      gutterBottom
      sx={{
        fontFamily: "'Cinzel Decorative', cursive",
        fontWeight: 900
      }}
    >
      Teacher Profile
    </Typography>

    <Divider sx={{ backgroundColor: '#d4af37', my: 2 }} />

    <Box sx={{ fontFamily: "'Cinzel Decorative', cursive", color: '#5c4033' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Name:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {currentUser.name}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Email:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {currentUser.email}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Class:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {teachSclass.sclassName}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Subject:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {teachSubject.subName}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        School:
      </Typography>
      <Typography variant="body1">
        {teachSchool.schoolName}
      </Typography>
    </Box>
  </Paper>
);

}

export default TeacherProfile

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;