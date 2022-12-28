//import { lightBlue } from '@mui/material/colors';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#420F60",
      light: "#420F60",
    },
    success: {
      main: "#4caf50",
    },
    text: {
      primary: "#420F60",
      secondary: "#420F60",
    },
    action: {
      active: "#420F60",
    },
    common: {
      purple: "#420F60",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: 20,
      opacity: 0.6,
      stroke: 1.5,
    },
    h4: {
      fontWeight: 500,
    },
    fontFamily: ["montserrat"].join(","),
  },
  shape: {
    borderRadius: 5,
  },
});

export default theme;
