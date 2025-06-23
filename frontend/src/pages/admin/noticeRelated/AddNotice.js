import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  // return (
  //   <>
  //     <div className="register">
  //       <form className="registerForm" onSubmit={submitHandler}>
  //         <span className="registerTitle"
  //          style={{ fontFamily:'Cinzel Decorative' /* Hogwarts style */, fontSize: '5rem', color: '#ffb300' }}>Add Notice</span>
  //         <label
  //          style={{ fontFamily:'Cinzel Decorative' /* Hogwarts style */, fontSize: '2rem', color: '#ffb300' }}>Title</label>
  //         <input className="registerInput" type="text" placeholder="Enter notice title..."
  //           value={title}
  //           onChange={(event) => setTitle(event.target.value)}
  //           required />

  //         <label
  //          style={{ fontFamily:'Cinzel Decorative' /* Hogwarts style */, fontSize: '2rem', color: '#ffb300' }}>Details</label>
  //         <input className="registerInput" type="text" placeholder="Enter notice details..."
  //           value={details}
  //           onChange={(event) => setDetails(event.target.value)}
  //           required />

  //         <label
  //          style={{ fontFamily:'Cinzel Decorative' /* Hogwarts style */, fontSize: '2rem', color: '#ffb300' }}>Date</label>
  //         <input className="registerInput" type="date" placeholder="Enter notice date..."
  //           value={date}
  //           onChange={(event) => setDate(event.target.value)}
  //           required />

  //         <button className="registerButton" type="submit" disabled={loader}
  //           style={{ fontFamily:'Cinzel Decorative' /* Hogwarts style */, fontSize: '1.5rem', color: '#ffb300' }}>
  //           {loader ? (
  //             <CircularProgress size={24} color="inherit" />
  //           ) : (
  //             'Add'
  //           )}
  //         </button>
  //       </form>
  //     </div>
  //     <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
  //   </>
  // );



    {/* <div
      style={{
        backgroundColor: '#1a2b55',
        padding: '30px',
        borderRadius: '16px',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
      }}
    >
      <form onSubmit={submitHandler}>
        <h1
          style={{
            fontFamily: 'Cinzel Decorative',
            fontSize: '3rem',
            color: '#ffb300',
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Add Notice
        </h1>

        <label
          style={{
            fontFamily: 'Cinzel Decorative',
            fontSize: '1.5rem',
            color: '#ffb300',
            display: 'block',
            marginBottom: '8px'
          }}
        >
          Title
        </label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter notice title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            fontSize: '1rem'
          }}
        />

        <label
          style={{
            fontFamily: 'Cinzel Decorative',
            fontSize: '1.5rem',
            color: '#ffb300',
            display: 'block',
            marginBottom: '8px'
          }}
        >
          Details
        </label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter notice details..."
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            fontSize: '1rem'
          }}
        />

        <label
          style={{
            fontFamily: 'Cinzel Decorative',
            fontSize: '1.5rem',
            color: '#ffb300',
            display: 'block',
            marginBottom: '8px'
          }}
        >
          Date
        </label>
        <input
          className="registerInput"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '30px',
            fontSize: '1rem'
          }}
        />

        <button
          type="submit"
          disabled={loader}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#ffb300',
            color: '#1a2b55',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontFamily: 'Cinzel Decorative',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loader ? (
            <CircularProgress size={24} sx={{ color: '#1a2b55' }} />
          ) : (
            'Add'
          )}
        </button>
      </form>
    </div>

    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
 
      
return (
  <>
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
        sx={{ fontFamily: "'Cinzel Decorative', cursive", fontWeight: 900 }}
      >
        Add Notice
      </Typography>

      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <TextField
          label="Title"
          placeholder="Enter notice title..."
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
         // InputLabelProps={{ style: { fontFamily: 'Cinzel Decorative' } }}
        />

        <TextField
          label="Details"
          placeholder="Enter notice details..."
          variant="outlined"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          //InputLabelProps={{ style: { fontFamily: 'Cinzel Decorative' } }}
        />

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
            style: { fontFamily: 'Cinzel Decorative' }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loader}
          sx={{
            backgroundColor: '#ffb300',
            color: '#1a2b55',
            fontFamily: "'Cinzel Decorative', cursive",
            fontWeight: 700,
            fontSize: '1.2rem',
            '&:hover': { backgroundColor: '#e0a800' }
          }}
        >
          {loader ? <CircularProgress size={24} sx={{ color: '#1a2b55' }} /> : 'Add'}
        </Button>
      </Box>
    </Paper>

    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
  </>
);


 




};

export default AddNotice;