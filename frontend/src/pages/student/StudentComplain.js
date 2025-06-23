import { useEffect, useState } from 'react';
import { Paper, Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    // return (
    //     <>
    //       < Paper sx={{ width: '100%', overflow: 'hidden' }}>
    //         <Box
    //             sx={{
    //                 flex: '1 1 auto',
    //                 alignItems: 'center',
    //                 display: 'flex',
    //                 justifyContent: 'center'
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     maxWidth: 550,
    //                     px: 3,
    //                     py: '100px',
    //                     width: '100%'
    //                 }}
    //             >
    //                 <div>
    //                     <Stack spacing={1} sx={{ mb: 3 }}>
    //                         <Typography variant="h4">Complain</Typography>
    //                     </Stack>
    //                     <form onSubmit={submitHandler}>
    //                         <Stack spacing={3}>
    //                             <TextField
    //                                 fullWidth
    //                                 label="Select Date"
    //                                 type="date"
    //                                 value={date}
    //                                 onChange={(event) => setDate(event.target.value)} required
    //                                 InputLabelProps={{
    //                                     shrink: true,
    //                                 }}
    //                             />
    //                             <TextField
    //                                 fullWidth
    //                                 label="Write your complain"
    //                                 variant="outlined"
    //                                 value={complaint}
    //                                 onChange={(event) => {
    //                                     setComplaint(event.target.value);
    //                                 }}
    //                                 required
    //                                 multiline
    //                                 maxRows={4}
    //                             />
    //                         </Stack>
    //                         <BlueButton
    //                             fullWidth
    //                             size="large"
    //                             sx={{ mt: 3 }}
    //                             variant="contained"
    //                             type="submit"
    //                             disabled={loader}
    //                         >
    //                             {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
    //                         </BlueButton>
    //                     </form>
    //                 </div>
    //             </Box>
    //         </Box>
    //         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    //     </Paper>
    //     </>
    // );

return (
  <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: 5,
            width: '100%'
          }}
        ><Paper
      elevation={4}
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
        padding: 3
      }}
    >
    
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontFamily: "'Cinzel Decorative', cursive",
                  fontWeight: 700,
                  color: '#d4af37'
                }}
              >
                Submit a Complaint
              </Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 1
                  }}
                />
                <TextField
                  fullWidth
                  label="Write your complaint"
                  variant="outlined"
                  value={complaint}
                  onChange={(event) => {
                    setComplaint(event.target.value);
                  }}
                  required
                  multiline
                  maxRows={4}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 1
                  }}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: '#d4af37',
                  color: '#000',
                  //fontFamily: "'Cinzel Decorative', cursive",
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#c19e34'
                  }
                }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </BlueButton>
            </form>
          </div>
    </Paper>
        </Box>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
  </>
);


};

export default StudentComplain;