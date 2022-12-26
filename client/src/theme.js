//import { lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#F5F5F5',
      },
      success: {
        main: '#4caf50'
      },
      text: {
        primary: '#420F60',
        secondary: '#420F60'
      },
      action: {
        active: '#420F60',
      },
      common: {
        purple: '#420F60'
      }
    },
    typography: {
        button: {
            textTransform: "none",
            fontSize: 20,
        },
        fontFamily: [
            'montserrat'
          ].join(','),
        
      },
    shape: {
        borderRadius: 5,
    },
    })

  export default theme;