import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs, Paper, Box, Typography } from "@mui/material";
import { useTheme } from "../Contexts/ThemeContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from '@mui/icons-material/Logout';
import { Navigate, useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const { theme } = useTheme();
  const navigate=useNavigate();

  const handleModalOpen = () => {
    if(user){
      navigate('/user');
    }else{
      setOpen(true);
    }
  }
  const handleClose = () => setOpen(false);
  const handleValueChange = (e, v) => setValue(v);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleClick = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Logged In Successfully", { theme: "dark" });
        setUser(res.user); // Update state with signed-in user
        handleClose(); // Close the modal after login
      })
      .catch((err) => {
        toast.error(errorMapping[err.code] || 'Some error occurred', { theme: "dark" });
      });
  };

  const logout = () => {
    auth.signOut()
      .then(() => {
        toast.success("Logged Out Successfully");
        setUser(null); // Clear user state on logout
      })
      .catch((err) => {
        toast.error(errorMapping[err.code] || 'Some error occurred');
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {(
        <AccountCircleIcon
          onClick={handleModalOpen}
          style={{ cursor: "pointer", fontSize: 32 }}
        />
      )}
      {user && (
        <LogoutIcon
          style={{ cursor: "pointer", fontSize: 32 }}
          onClick={logout}
        />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "350px",
            width: "100%",
            backgroundColor: theme.background
          }}
        >
          <AppBar position="static" color="default" elevation={0} style={{ background: 'transparent' }}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleValueChange}
              indicatorColor="primary"
              textColor="primary"
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <Tab label="Login" style={{ textTransform: "none", fontSize: "16px", color: theme.textColor }} />
              <Tab label="Signup" style={{ textTransform: "none", fontSize: "16px", color: theme.textColor }} />
            </Tabs>
          </AppBar>
          <Box p={3} textAlign="center">
            {value === 0 && <LoginForm handleClose={handleClose} />}
            {value === 1 && <SignUpForm handleClose={handleClose} />}
            <Typography variant="body1" style={{ margin: "20px 0", fontWeight: "bold", color: theme.textColor }}>
              OR
            </Typography>
            <GoogleButton
              style={{ width: "70%", fontSize: "12px", marginLeft: "auto", marginRight: "auto" }}
              onClick={handleGoogleClick}
            />
          </Box>
        </Paper>
      </Modal>
    </div>
  );
};

export default AccountCircle;
