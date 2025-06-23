import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';
import { Paper, Box } from '@mui/material';
const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                // <Container>
                //     <Typography variant="h4" align="center" gutterBottom>
                //         Teacher Details
                //     </Typography>
                //     <Typography variant="h6" gutterBottom>
                //         Teacher Name: {teacherDetails?.name}
                //     </Typography>
                //     <Typography variant="h6" gutterBottom>
                //         Class Name: {teacherDetails?.teachSclass?.sclassName}
                //     </Typography>
                //     {isSubjectNamePresent ? (
                //         <>
                //             <Typography variant="h6" gutterBottom>
                //                 Subject Name: {teacherDetails?.teachSubject?.subName}
                //             </Typography>
                //             <Typography variant="h6" gutterBottom>
                //                 Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                //             </Typography>
                //         </>
                //     ) : (
                //         <Button variant="contained" onClick={handleAddSubject}>
                //             Add Subject
                //         </Button>
                //     )}
                // </Container>
                <Paper
  elevation={4}
  sx={{
    padding: 3,
    maxWidth: 500,
    margin: '20px auto',
    backgroundColor: '#f5f5f5',
    borderRadius: 2
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
    Teacher Details
  </Typography>

  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Teacher Name:
    </Typography>
    <Typography variant="body1" gutterBottom>
      {teacherDetails?.name}
    </Typography>

    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Class Name:
    </Typography>
    <Typography variant="body1" gutterBottom>
      {teacherDetails?.teachSclass?.sclassName}
    </Typography>

    {isSubjectNamePresent ? (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Subject Name:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {teacherDetails?.teachSubject?.subName}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Subject Sessions:
        </Typography>
        <Typography variant="body1">
          {teacherDetails?.teachSubject?.sessions}
        </Typography>
      </>
    ) : (
      <Button
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "#4caf50",
          "&:hover": { bgcolor: "#43a047" }
        }}
        onClick={handleAddSubject}
      >
        Add Subject
      </Button>
    )}
  </Box>
</Paper>

            )}
        </>
    );
};

export default TeacherDetails;