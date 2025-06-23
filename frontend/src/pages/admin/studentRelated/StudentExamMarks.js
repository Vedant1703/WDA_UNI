import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Paper, Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
           {loading ? (
                 <Box
                   sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '80vh',
                     color: '#d4af37',
                     fontSize: '24px',
                     fontWeight: 700
                   }}
                 >
                   Loading...
                 </Box>
               )
                :(
                <>
 
     <Paper
             elevation={4}
             sx={{
               backgroundColor: '#f5f5f5',
               padding: 4,
               maxWidth: 600,
               margin: '40px auto',
               borderRadius: 3
             }}
           >
      <Stack spacing={2}>
        <Typography
                      variant="h4"
                      align="center"
                      gutterBottom
                      sx={{
                        fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900,
                        color: '#d4af37'
                      }}
                    >
                      Provide Marks
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  Student Name:
                                </Typography>
       
         <Typography variant="body1" gutterBottom>
                      {userDetails.name}
                    </Typography>
           {currentUser.teachSubject && (
                     <>
                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
                         Subject Name:
                       </Typography>
                       <Typography variant="body1" gutterBottom>
                         {currentUser.teachSubject?.subName}
                       </Typography>
                     </>
                   )}

       
                   <form onSubmit={submitHandler}>
                     <Stack spacing={3}>
                       {situation === 'Student' && (
                         <FormControl fullWidth>
                           <InputLabel>Select Subject</InputLabel>
                           <Select
                             value={subjectName}
                             label="Select Subject"
                             onChange={changeHandler}
                             required
                           >
                             {subjectsList?.length > 0 ? (
                               subjectsList.map((subject, index) => (
                                 <MenuItem key={index} value={subject.subName}>
                                   {subject.subName}
                                 </MenuItem>
                               ))
                             ) : (
                               <MenuItem value="Select Subject">
                                 Add Subjects For Marks
                               </MenuItem>
                             )}
                           </Select>
                         </FormControl>
                       )}

            <TextField
              type="number"
              label="Enter Marks"
              value={marksObtained}
              required
              onChange={(e) => setMarksObtained(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <BlueButton
              fullWidth
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                mt: 2
              }}
              variant="contained"
              type="submit"
              disabled={loader}
            >
              {loader ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Marks"
              )}
            </BlueButton>
          </Stack>
        </form>
      </Stack>
    </Paper>
 

  <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
</>
           ) }
        </>
    )
}

export default StudentExamMarks