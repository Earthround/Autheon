import React, { useEffect, useState } from "react";

import { auth, db, logout, storage } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  documentId,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import accountTheme from "../account/accountTheme";
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

function Fanmail() {
  const [currentUserAuth, loading, currentUserError] = useAuthState(auth);
  const [letters, setLetters] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Changed page");
  };

  const fetchLetters = async () => {
    try {
      const q = query(
        collection(db, "fanletters"),
        where("toUid", "==", currentUserAuth?.uid)
      );
      const doc = await getDocs(q);
      setLetters(doc.docs.map((doc) => ({ ...doc.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  return (
    <>
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

            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Link
                  component={Link}
                  to="/fanmail/create"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, height: "56px" }}
                  >
                    New letter
                  </Button>
                </Link>
              </Grid>
            </Box>
            {letters.map((letter) => {
              return (
                <div key={letter.uid}>
                  <h4>From: {letter.from}</h4>
                  <p>{letter.text}</p>
                </div>
              );
            })}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Fanmail;
