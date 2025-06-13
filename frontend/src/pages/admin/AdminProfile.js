// import React, { useState } from 'react';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
// import { useNavigate } from 'react-router-dom'
// import { authLogout } from '../../redux/userRelated/userSlice';
// import { Button, Collapse } from '@mui/material';
import { Paper, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
    // const [showTab, setShowTab] = useState(false);
    // const buttonText = showTab ? 'Cancel' : 'Edit profile';

    // const navigate = useNavigate()
    // const dispatch = useDispatch();
        const { currentUser } = useSelector((state) => state.user);
    // const { currentUser, response, error } = useSelector((state) => state.user);
    // const address = "Admin"

    // if (response) { console.log(response) }
    // else if (error) { console.log(error) }

    // const [name, setName] = useState(currentUser.name);
    // const [email, setEmail] = useState(currentUser.email);
    // const [password, setPassword] = useState("");
    // const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    // const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    // const submitHandler = (event) => {
    //     event.preventDefault()
    //     dispatch(updateUser(fields, currentUser._id, address))
    // }

    // const deleteHandler = () => {
    //     try {
    //         dispatch(deleteUser(currentUser._id, "Students"));
    //         dispatch(deleteUser(currentUser._id, address));
    //         dispatch(authLogout());
    //         navigate('/');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        // <div>
        //     Name: {currentUser.name}
        //     <br />
        //     Email: {currentUser.email}
        //     <br />
        //     School: {currentUser.schoolName}
        //     <br />

 <Paper
            elevation={4}
            sx={{
                padding: 3,
                maxWidth: 400,
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
                sx={{ fontFamily: "'Cinzel Decorative', cursive", fontWeight: 900 }}
            >
                Admin Profile
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {currentUser.name}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Email:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {currentUser.email}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    School:
                </Typography>
                <Typography variant="body1">
                    {currentUser.schoolName}
                </Typography>
            </Box>
        </Paper>
    







    )
}

export default AdminProfile

// const styles = {
//     attendanceButton: {
//         backgroundColor: "#270843",
//         "&:hover": {
//             backgroundColor: "#3f1068",
//         }
//     }
// }