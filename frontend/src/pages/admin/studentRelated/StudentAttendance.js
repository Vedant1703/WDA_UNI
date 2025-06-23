import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Button, Paper, Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

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

    const fields = { subName: chosenSubName, status, date }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
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

    // return (
    //     <>
    //         {loading
    //             ?
    //             <>
    //                 <div>Loading...</div>
    //             </>
    //             :
    //             <>
    //                 <Box
    //                     sx={{
    //                         flex: '1 1 auto',
    //                         alignItems: 'center',
    //                         display: 'flex',
    //                         justifyContent: 'center'
    //                     }}
    //                 >
    //                     <Box
    //                         sx={{
    //                             maxWidth: 550,
    //                             px: 3,
    //                             py: '100px',
    //                             width: '100%'
    //                         }}
    //                     >
    //                         <Stack spacing={1} sx={{ mb: 3 }}>
    //                             <Typography variant="h4">
    //                                 Student Name: {userDetails.name}
    //                             </Typography>
    //                             {currentUser.teachSubject &&
    //                                 <Typography variant="h4">
    //                                     Subject Name: {currentUser.teachSubject?.subName}
    //                                 </Typography>
    //                             }
    //                         </Stack>
    //                         <form onSubmit={submitHandler}>
    //                             <Stack spacing={3}>
    //                                 {
    //                                     situation === "Student" &&
    //                                     <FormControl fullWidth>
    //                                         <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
    //                                         <Select
    //                                             labelId="demo-simple-select-label"
    //                                             id="demo-simple-select"
    //                                             value={subjectName}
    //                                             label="Choose an option"
    //                                             onChange={changeHandler} required
    //                                         >
    //                                             {subjectsList ?
    //                                                 subjectsList.map((subject, index) => (
    //                                                     <MenuItem key={index} value={subject.subName}>
    //                                                         {subject.subName}
    //                                                     </MenuItem>
    //                                                 ))
    //                                                 :
    //                                                 <MenuItem value="Select Subject">
    //                                                     Add Subjects For Attendance
    //                                                 </MenuItem>
    //                                             }
    //                                         </Select>
    //                                     </FormControl>
    //                                 }
    //                                 <FormControl fullWidth>
    //                                     <InputLabel id="demo-simple-select-label">Attendance Status</InputLabel>
    //                                     <Select
    //                                         labelId="demo-simple-select-label"
    //                                         id="demo-simple-select"
    //                                         value={status}
    //                                         label="Choose an option"
    //                                         onChange={(event) => setStatus(event.target.value)}
    //                                         required
    //                                     >
    //                                         <MenuItem value="Present">Present</MenuItem>
    //                                         <MenuItem value="Absent">Absent</MenuItem>
    //                                     </Select>
    //                                 </FormControl>
    //                                 <FormControl>
    //                                     <TextField
    //                                         label="Select Date"
    //                                         type="date"
    //                                         value={date}
    //                                         onChange={(event) => setDate(event.target.value)} required
    //                                         InputLabelProps={{
    //                                             shrink: true,
    //                                         }}
    //                                     />
    //                                 </FormControl>
    //                             </Stack>

    //                             <PurpleButton
    //                                 fullWidth
    //                                 size="large"
    //                                 sx={{ mt: 3 }}
    //                                 variant="contained"
    //                                 type="submit"
    //                                 disabled={loader}
    //                             >
    //                                 {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
    //                             </PurpleButton>
    //                         </form>
    //                     </Box>
    //                 </Box>
    //                 <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    //             </>
    //         }
    //     </>
    // )

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
    ) : 
    (
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
              Attendance Form
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
                          Add Subjects For Attendance
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <InputLabel>Attendance Status</InputLabel>
                  <Select
                    value={status}
                    label="Attendance Status"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loader}
                  sx={{
                    mt: 2,
                    bgcolor: '#6a1b9a',
                    '&:hover': { bgcolor: '#4a148c' },
                    fontWeight: 600
                  }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>

        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </>
    )}
  </>
);

}

export default StudentAttendance