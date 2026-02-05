import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // can switch to 'dark' if needed
    primary: {
      main: "#1f5cad", // your button/primary color
    },
    secondary: {
      main: "#23b5b5", // background accent color
    },
    success: {
      main: "#20ab67",
    },
    warning: {
      main: "#fdd835",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5", // replaces gray-50
      paper: "#ffffff",
    },
    text: {
      primary: "#213547",
      secondary: "#646cff",
    },
  },
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "3.2rem",
      lineHeight: 1.1,
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      borderRadius: 8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid transparent",
          padding: "0.6em 1.2em",
          cursor: "pointer",
          transition: "border-color 0.25s",
        },
      },
    },
  },
});

export default theme;
