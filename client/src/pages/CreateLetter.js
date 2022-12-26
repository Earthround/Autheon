import React, { useEffect, useState } from "react";

import { styled, alpha, useTheme } from '@mui/material/styles';
import { auth, db, logout, storage } from "../firebase";
import { query, collection, getDocs, where, documentId, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from '@mui/material/Button';
import input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputBase from '@mui/material/InputBase';

import accountTheme from '../account/accountTheme';
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

function CreateLetter() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [users, setUsers] = React.useState([]);

    let active = false;

    const fetchUserNames = async () => {
        try {
            const q = query(collection(db, "users"), orderBy("name"));
            const data = await getDocs(q);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), uid: doc.uid })));
             active = true;
            console.log('yeet')
        } catch (err) {
            console.error(err);
        }
        }; 

   

    React.useEffect(() => {
        
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
          await fetchUserNames(); // For demo purposes.
    
          if (active) {
            setOptions([...users]);
          }
        })();
    
        return () => {
          active = false;
        };
      }, [loading]);
    
      React.useEffect(() => {
        if (!open) {
          setOptions([]);
        }
      }, [open]);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(
          event
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


        
         
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2} marginTop={2}>

        <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for user"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
        </Grid> 
        <Grid container spacing={2} marginTop={2}>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Start writing letter here.."
                style={{ width: 700 }}
            />
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2}}
            >
            Send 
            </Button> 
          </Grid>
        </Box>
      </Box>
      </Container>
      </ThemeProvider>
  )
}

const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];

export default CreateLetter
