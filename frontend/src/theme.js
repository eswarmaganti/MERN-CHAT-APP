import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

const THEME = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: green[600],
    },
  },
});

export default THEME;
