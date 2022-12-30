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
import Modal from "@mui/material/Modal";

import LetterTheme from "./LetterTheme";
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid rgba(66,15,96,0.7)",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Fanmail() {
  const [currentUserAuth, loading, currentUserError] = useAuthState(auth);
  const [letters, setLetters] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [modalTo, setModalTo] = useState("");
  const [modalFrom, setModalFrom] = useState("");
  const [modalText, setModalText] = useState("");

  const [open, setOpen] = React.useState(false);

  async function handleOpen(from, to, text, uid) {
    try {
      const q = query(collection(db, "fanletters"), where("uid", "==", uid));
      let docID = "";
      const snapdoc = await getDocs(q);
      snapdoc.forEach((doc) => {
        docID = doc.id;
      });
      const letterdoc = doc(db, "fanletters", docID);
      await updateDoc(letterdoc, { read: true });
    } catch (err) {
      console.error(err);
    }

    setModalFrom(from);
    setModalTo(to);
    setModalText(text);
    setOpen(true);
  }
  function handleClose() {
    fetchLetters();
    setOpen(false);
  }

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
      <ThemeProvider theme={LetterTheme}>
        <Container component="main" maxWidth="lg">
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
              <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="center"
                sx={{ ml: 0, width: "100%" }}
              >
                <Link
                  component={Link}
                  to="/fanmail/create"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2, height: "56px", width: "210px" }}
                  >
                    New letter
                  </Button>
                </Link>
              </Grid>
            </Box>
            <Grid container spacing={2}>
              {letters.map((letter) => {
                let read = "";
                if (letter.read) {
                  read = "Opened";
                } else {
                  read = "Unopened";
                }
                return (
                  <Grid item align="center" xs={4}>
                    <Box
                      sx={{
                        width: 300,
                        height: 200,
                        boxShadow: 5,
                        borderRadius: 1,
                        padding: 2,
                        margin: 1,
                        backgroundColor: "common.white",
                        "&:hover": {
                          backgroundColor: "common.white",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        display: "grid",
                        alignItems: "center",
                      }}
                      key={letter.uid}
                      onClick={() =>
                        handleOpen(
                          letter.from,
                          letter.to,
                          letter.text,
                          letter.uid
                        )
                      }
                    >
                      <div>To {letter.to}</div>
                      <div>From {letter.from}</div>
                      <div>{read}</div>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  From: {modalFrom}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modalText}
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Fanmail;
