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

import accountTheme from "./accountTheme";
import { reload } from "firebase/auth";
import { purple } from "@mui/material/colors";

function Settings() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUserName] = useState("");
  const [newusername, setNewUsername] = useState("");

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleNewUsername = (event) => {
    setNewUsername(event.target.value);
  };

  const updateUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docsnapshot = await getDocs(q);
      let docID = "";
      docsnapshot.forEach((doc) => {
        docID = doc.id;
      });
      //const data = doc.docs[0].data();
      const userdoc = doc(db, "users", docID);
      await updateDoc(userdoc, { username: newusername });
      fetchUserName();

      console.log(docID);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserName(data.username);
      console.log({ username });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitImage = () => {
    const imageRef = ref(storage, "usersAvatar/" + user.uid + "/userAvatar");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchAvatar = async () => {
    try {
      const imageRef = ref(storage, "usersAvatar/" + user.uid + "/userAvatar");
      getDownloadURL(imageRef).then((url) => {
        setUrl(url);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchUserName();
    fetchAvatar();
  }, [user, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserName();
    console.log("changed username");
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
            Settings
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Username
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {username}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  placeholder={username}
                  onChange={handleNewUsername}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, height: "56px" }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h5" sx={{ mt: 3 }}>
            Change profile picture
          </Typography>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
              <Avatar src={url} sx={{ width: 96, height: 96 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                component="label"
                sx={{ mt: 2, mb: 2, height: "56px" }}
              >
                Choose File
                <input
                  accept="image/jpeg"
                  type="file"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
            </Grid>
            <Button
              onClick={handleSubmitImage}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, height: "56px" }}
            >
              Update profile picture
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Settings;
