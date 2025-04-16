// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#4caf50", // green
        },
        filledError: {
          backgroundColor: "#f44336", // red
        },
        filledWarning: {
          backgroundColor: "#ffa000", // amber
        },
        filledInfo: {
          backgroundColor: "#2196f3", // blue
        },
      },
    },
  },
});

export default theme;
