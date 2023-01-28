import { createTheme } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";

const THEME = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: indigo[600],
    },
  },
});

export default THEME;
