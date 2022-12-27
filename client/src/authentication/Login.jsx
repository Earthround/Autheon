import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";
import { ReactComponent as QuillBig } from "../images/Quill-Vector-Big.svg";
import Typography from "@mui/material/Typography";
import CopyrightFooter from "../CopyrightFooter";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import authTheme from "./authTheme";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    logInWithEmailAndPassword(email, password);
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
            marginBottom: 5,
          }}
        >
          <SvgIcon sx={{ fontSize: 300 }}>
            <QuillBig />
          </SvgIcon>
          <Typography component="h1" variant="h4">
            Log in to Autheon
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            validate="true"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              value={email}
              onChange={handleEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            <Grid container justifyContent="right">
              <Grid item>
                <Link component={Link} to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={Link} to="/signup" variant="body2">
                  {"New to Autheon? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyrightFooter sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
