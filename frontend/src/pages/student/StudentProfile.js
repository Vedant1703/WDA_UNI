import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  // return (
  //   <>
  //     <Container maxWidth="md">
  //       <StyledPaper elevation={3}>
  //         <Grid container spacing={2}>
  //           <Grid item xs={12}>
  //             <Box display="flex" justifyContent="center">
  //               <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
  //                 {String(currentUser.name).charAt(0)}
  //               </Avatar>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Box display="flex" justifyContent="center">
  //               <Typography variant="h5" component="h2" textAlign="center">
  //                 {currentUser.name}
  //               </Typography>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Box display="flex" justifyContent="center">
  //               <Typography variant="subtitle1" component="p" textAlign="center">
  //                 Student Roll No: {currentUser.rollNum}
  //               </Typography>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Box display="flex" justifyContent="center">
  //               <Typography variant="subtitle1" component="p" textAlign="center">
  //                 Class: {sclassName.sclassName}
  //               </Typography>
  //             </Box>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Box display="flex" justifyContent="center">
  //               <Typography variant="subtitle1" component="p" textAlign="center">
  //                 School: {studentSchool.schoolName}
  //               </Typography>
  //             </Box>
  //           </Grid>
  //         </Grid>
  //       </StyledPaper>
  //       <Card>
  //         <CardContent>
  //           <Typography variant="h6" gutterBottom>
  //             Personal Information
  //           </Typography>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Date of Birth:</strong> January 1, 2000
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Gender:</strong> Male
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Email:</strong> john.doe@example.com
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Phone:</strong> (123) 456-7890
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Address:</strong> 123 Main Street, City, Country
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <Typography variant="subtitle1" component="p">
  //                 <strong>Emergency Contact:</strong> (987) 654-3210
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Container>
  //   </>
  // )

return (
  <>
    <Container maxWidth="md">
      <StyledPaper
        elevation={4}
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5',
          borderRadius: 3,
          boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Avatar 
                alt="Student Avatar"
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: '#d4af37',
                  fontSize: '3rem',
                  fontFamily: "'Cinzel Decorative', cursive",
                  color: '#000'
                }}
              >
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontFamily: "'Cinzel Decorative', cursive",
                fontWeight: 900,
                color: '#d4af37'
              }}
            >
              {currentUser.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ fontWeight: 600 }}
            >
              Student Roll No: {currentUser.rollNum}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ fontWeight: 600 }}
            >
              Class: {sclassName.sclassName}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ fontWeight: 600 }}
            >
              School: {studentSchool.schoolName}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <Card
        elevation={3}
        sx={{
          mt: 4,
          backgroundColor: '#fafafa',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "'Cinzel Decorative', cursive",
              fontWeight: 800,
              color: '#d4af37'
            }}
          >
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong> January 1, 2000
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> Male
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> john.doe@example.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Address:</strong> 123 Main Street, City, Country
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Emergency Contact:</strong> (987) 654-3210
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  </>
);


}

export default StudentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;