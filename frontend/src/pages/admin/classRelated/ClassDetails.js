import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, Container, Typography, Tab, IconButton
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getClassStudents(classID));
        //         dispatch(resetSubjects())
        //         dispatch(getSubjectList(classID, "ClassSubjects"))
        //     })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    </Box>
                    :
                    <>
                        <Typography variant="h3" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900  // or 700 if 900 feels too bold
                 }}  gutterBottom>
                            Subjects List:
                        </Typography>
                       < Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                   </Paper>
                        <SpeedDialTemplate actions={subjectActions} />
                   </>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                      <Typography variant="h3" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900  // or 700 if 900 feels too bold
                 }}  gutterBottom>
                            Students List:
                        </Typography>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        </Paper>
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    // const ClassTeachersSection = () => {
    //     return (
    //         <>
    //             Teachers
    //         </>
    //     )
    // }

const ClassTeachersSection = () => {
    return (
        <>
            <Typography variant="h3" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900  // or 700 if 900 feels too bold
                 }}  gutterBottom>
                Teachers
            </Typography>
        </>
    )
}

//   const teacherColumns = [
//         { id: 'name', label: 'Name', minWidth: 170 },
//         { id: 'email', label: 'Email', minWidth: 100 },
//     ]

//     const teacherRows = teacherDetails.map((student) => {
//         return {
//             name: teacher.name,
//             rollNum: student.rollNum,
//             id: student._id,
//         };
//     })


// const TeachersButtonHaver = ({ row }) => {
//         return (
//             <>
//                 <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
//                     <PersonRemoveIcon color="error" />
//                 </IconButton>
//                 <BlueButton
//                     variant="contained"
//                     onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
//                 >
//                     Teacher Details
//                 </BlueButton>
             
//             </>
//         );
//     };

// const ClassTeachersSection = () => {
//      return (
//             <>
//                 {getresponse ? (
//                     <>
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                             <GreenButton
//                                 variant="contained"
//                                 onClick={() => navigate("/Admin/class/addstudents/" + classID)}
//                             >
//                                 Add Students
//                             </GreenButton>
//                         </Box>
//                     </>
//                 ) : (
//                     <>
//                         <Typography variant="h5" 
//                        style={{
//                              fontFamily: "'Cinzel Decorative', cursive", 
//                             fontWeight: 900,
//                             color: "#d4af37"}} 
//                             gutterBottom>
//                             Teacher
//                         </Typography>
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                         <TableTemplate buttonHaver={TeachersButtonHaver} columns={studentColumns} rows={studentRows} />
//                         </Paper>
//                         <SpeedDialTemplate actions={studentActions} />
//                     </>
//                 )}
//             </>
//         )
// }

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                {/* <Typography variant="h3" align="center" color= "#d4af37"   
                style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 900  // or 700 if 900 feels too bold
                 }}  gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h4" color= "#d4af37" 
                  style={{ fontFamily: "'Cinzel Decorative', cursive",
                        fontWeight: 800  // or 700 if 900 feels too bold
                 }} gutterBottom>
                    This is Class {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Typography variant="h6" color= "#fff" gutterBottom>
                    Number of Subjects: {numberOfSubjects}
                </Typography>
                <Typography variant="h6" color= "#fff" gutterBottom>
                    Number of Students: {numberOfStudents}
                </Typography> */}
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
    variant="h3"
    align="center"
    color="#d4af37"
    gutterBottom
    sx={{
      fontFamily: "'Cinzel Decorative', cursive",
      fontWeight: 900
    }}
  >
    Class Details
  </Typography>

  <Typography variant="h6" sx={{ fontWeight: 600 }}>
    This is Class 
  </Typography>
 <Typography variant="body1" gutterBottom>
      {sclassDetails && sclassDetails.sclassName}
    </Typography>
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Number of Subjects:
    </Typography>
    <Typography variant="body1" gutterBottom>
      {numberOfSubjects}
    </Typography>

    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Number of Students:
    </Typography>
    <Typography variant="body1">
      {numberOfStudents}
    </Typography>
  </Box>
</Paper>

                
                
                {getresponse &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                    >
                        Add Students
                    </GreenButton>
                }
                {response &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </GreenButton>
                }
            </>
        );
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Subjects" value="2" />
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ClassStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ClassTeachersSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;