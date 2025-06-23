import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { Paper,  Divider } from '@mui/material';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading
                ?
                <>
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

                </>
                :
                <div>
                
  <Paper
    elevation={6}
    sx={{
      padding: 4,
      maxWidth: 420,
      margin: '30px auto',
      backgroundColor: '#f0e6d2',
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
      Student Details
    </Typography>

    <Divider sx={{ backgroundColor: '#d4af37', marginY: 2 }} />

    <Box sx={{ fontFamily: "'Cinzel Decorative', cursive", color: '#5c4033' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Name:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {userDetails.name}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Roll Number:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {userDetails.rollNum}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Class:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {sclassName.sclassName}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        School:
      </Typography>
      <Typography variant="body1">
        {studentSchool.schoolName}
      </Typography>
    </Box>
  </Paper>
);
                    <br /><br />
  < Paper sx={{ width: '100%', overflow: 'hidden' }}>
  
                      <Typography variant="h4" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900,
                        marginTop:10,  // or 700 if 900 feels too bold
                 
                 }}  gutterBottom>
                Attendance:
            </Typography>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                        &&
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell>Present</StyledTableCell>
                                                    <StyledTableCell>Total Sessions</StyledTableCell>
                                                    <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>

                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{subName}</StyledTableCell>
                                                    <StyledTableCell>{present}</StyledTableCell>
                                                    <StyledTableCell>{sessions}</StyledTableCell>
                                                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow>
                                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="h6" gutterBottom component="div">
                                                                    Attendance Details
                                                                </Typography>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell>Date</StyledTableCell>
                                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={index}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {dateString}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                else {
                                    return null
                                }
                            })}
                            <div>
                                Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                            </div>

                            <CustomPieChart data={chartData} />
                        </>

                    }
               
                    <Button
                        variant="contained"
                        sx={styles.styledButton} 
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                            )
                        }
                        >
                        Add Attendance
                    </Button>
                        </Paper>
                    <br /><br />
                      < Paper sx={{ width: '100%', overflow: 'hidden' }}>
                         <Typography variant="h4" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900,
                        marginTop:10,  // or 700 if 900 feels too bold
                 
                 }}  gutterBottom>
                Subject Marks:
            </Typography>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                        <>
                            {subjectMarks.map((result, index) => {
                                if (result.subName.subName === teachSubject) {
                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell>Marks</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                else if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return null
                            })}
                        </>
                    }
                    <br />
                    <PurpleButton variant="contained" sx={{ margin: "20px"}}
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                            )}>
                        Add Marks
                    </PurpleButton>
                   
                                </Paper>
                    <br /><br />
                </div>
            }
        </>
    )
}

export default TeacherViewStudent


const styles = {
    attendanceButton: {
        marginLeft: "20px",
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    },
    styledButton: {
        margin: "20px",
        backgroundColor: "#4caf50",
        "&:hover": {
            backgroundColor: "#43a047",
        }
    }
}