import React, { useEffect, useState } from "react";

import { auth, db, logout, storage } from "../firebase";
import { query, collection, getDocs, where, documentId } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import accountTheme from '../account/accountTheme';
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

function Fanmail() {


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(
          "Changed page"
        );
      };
  return (
    <ThemeProvider theme={accountTheme}>
      <Container component="main" maxWidth="sm">
      <CssBaseline />
        <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'top',
                  marginBottom: 5,
                }}
          >
          
          <Typography component="h1" variant="h4" alignSelf="center">
                Fanmail
          </Typography>
          
           
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
            <Link component={Link} to='/fanmail/create' variant="body2"  style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, height: "56px"}}
              >
              New letter 
              </Button> 
              </Link>
            </Grid>
          </Box>
        </Box>
        </Container>
        </ThemeProvider>
  )
}

export default Fanmail