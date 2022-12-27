import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SvgIcon } from "@mui/material";
import { ReactComponent as QuillBig } from "../images/Quill-Vector-Big.svg";
import Typography from "@mui/material/Typography";
import CopyrightFooter from "../CopyrightFooter";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { auth, sendPasswordReset } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import authTheme from "./authTheme";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
  }, [user, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendPasswordReset(data.get("email"));
    console.log({
      email: data.get("email"),
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
            Forgot password
          </Typography>
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Enter your email address and we will send you a link to reset your
            password.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={Link} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
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

export default ForgotPassword;
