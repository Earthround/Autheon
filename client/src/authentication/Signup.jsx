import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";
import { ReactComponent as QuillBig } from "../images/Quill-Vector-Big.svg";
import CopyrightFooter from "../CopyrightFooter";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import authTheme from "./authTheme";

function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const signup = () => {
    if (!fullName) alert("Please enter name");
    registerWithEmailAndPassword(fullName, userName, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [user, loading, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    signup();
    console.log({
      email: email,
      password: password,
    });
  };

  return (
    <ThemeProvider theme={authTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 5,
          }}
        >
          <SvgIcon sx={{ fontSize: 300 }}>
            <QuillBig />
          </SvgIcon>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <ValidatorForm
            component="form"
            validate="true"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  validators={["isPasswordMatch", "required"]}
                  errorMessages={[
                    "password mismatch",
                    "this field is required",
                  ]}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={Link} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Box>
        <CopyrightFooter sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
