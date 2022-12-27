import React, { useEffect, useState } from "react";

import { styled, alpha, useTheme } from "@mui/material/styles";
import { auth, db, logout, storage } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  documentId,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from "@mui/material/Button";
import input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import InputBase from "@mui/material/InputBase";
import { v4 as uuidv4 } from "uuid";

import accountTheme from "../account/accountTheme";
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function CreateLetter() {
  const [currentUserAuth, currentUserError] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  function handleSelectedUser(username) {
    setSelectedUser(username);
  }

  const handleText = (event) => {
    setText(event.target.value);
  };

  let active = false;

  const fetchUserNames = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("name"));
      const data = await getDocs(q);
      setUsers(data.docs.map((doc) => ({ ...doc.data() })));
      active = true;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      console.log(currentUserAuth);
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserAuth?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setCurrentUser(data);
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
        //console.log(users);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    fetchCurrentUser();
    if (!open) {
      setOptions([]);
    }
  }, [open, currentUserAuth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "fanletters"), {
        uid: uuidv4(),
        from: currentUser.name,
        fromUid: currentUser.uid,
        to: selectedUser.name,
        toUid: selectedUser.uid,
        text: text,
      });
      alert("Fanletter succesfully sent!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={accountTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "top",
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
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
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
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                onChange={(event, newValue) => {
                  handleSelectedUser(newValue);
                }}
                autoSelect
              />
            </Grid>
            <Grid container spacing={2} marginTop={2}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Start writing letter here.."
                style={{ width: 700 }}
                onChange={handleText}
              />
            </Grid>
            <Grid container spacing={2} marginTop={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Send
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateLetter;
