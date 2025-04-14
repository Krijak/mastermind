import { createTheme } from "@mui/material/styles";

const darkRed = "#510629";
const defaultBackground = "#f9f6f0"; //"#F2E3E3";
const paperBackground = "rgba(224, 220, 217, 0.32)"; //"#ebd6d6";
const success = "#547b57";
const black = "#000";

export const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: darkRed,
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "text" },
          style: {
            color: "black",
            ":hover": {
              color: darkRed,
            },
          },
        },
      ],
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: darkRed,
    },
    secondary: {
      main: darkRed,
    },
    background: {
      default: defaultBackground,
      paper: paperBackground,
    },
    success: {
      main: success,
    },
    divider: darkRed,
  },
  typography: {
    h1: {
      fontSize: "1.2rem",
      letterSpacing: "0.4em",
      color: black,
      fontFamily: "Cormorant Garamond, serif",
      fontWeight: 300,
      fontStyle: "normal",
      xs: {
        fontSize: "1rem",
      },
    },
    h2: {
      fontSize: "0.8rem",
      fontWeight: 600,
      color: black,
    },
    h3: {
      fontSize: "1.1rem",
      fontWeight: 100,
      letterSpacing: "0.09em",
      color: black,
      xs: {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "0.9rem",
      fontFamily: "Raleway, serif",
      fontWeight: 500,
    },
  },
});

export default theme;
