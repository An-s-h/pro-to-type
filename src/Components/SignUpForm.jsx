import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import {auth} from '../firebaseConfig'
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUpForm = (handleClose) => {
  
  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');
  const [confirmPassword,setconfirmPassword]=useState('');
  const {theme}=useTheme();
  const handleSubmit=()=>{
    if(!email || !password || !confirmPassword){
      toast.warning("Invalid Fields",{
            theme:"dark"
          });
      return;
    }
    if(password!==confirmPassword){
      toast.warning("Passwords Don't Match",{
            theme:"dark"
          });
    }
    createUserWithEmailAndPassword(auth,email,password).then((res)=>{
      toast.success("User Logged in",{
        theme:"dark"
      });
      handleClose();
    }).catch((err)=>{
      toast.error(errorMapping[err.code] || 'some error occured',{
        theme:"dark"
      });
    })
  }
  return (
    <Box 
    display="flex" 
    flexDirection="column" 
    gap={2} 
    p={3} 
    borderRadius={2} 
    bgcolor="transparent" 
    >
      <TextField 
        label="Enter Email" 
        variant="outlined"
        type='email' 
        fullWidth 
        onChange={(e)=>setEmail(e.target.value)}
        InputLabelProps={{
          style:{
            color:theme.textColor
          }
        }}
        InputProps={{
          style:{
            color:theme.textColor
          }
        }}
      />
      <TextField 
        label="Enter Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        onChange={(e)=>setPass(e.target.value)}
        InputLabelProps={{
          style:{
            color:theme.textColor
          }
        }}
        InputProps={{
          style:{
            color:theme.textColor
          }
        }}
      />
      <TextField 
        label="ReType Password to confirm" 
        type="password" 
        variant="outlined" 
        fullWidth 
        onChange={(e)=>setconfirmPassword(e.target.value)}
        InputLabelProps={{
          style:{
            color:theme.textColor
          }
        }}
        InputProps={{
          style:{
            color:theme.textColor
          }
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        size="large"
        style={{backgroundColor:theme.textColor,color:theme.background}}
        onClick={handleSubmit}
      >
        Sign-Up

      </Button>
    </Box>
  );
};

export default SignUpForm;
