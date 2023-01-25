import { Box, TextField, Button } from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const SignupForm = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        border: "1px solid #121212",
        borderRadius: ".5rem",
        mt: "1rem",
        background: "rgba( 0, 0, 0, 0.1 )",
        backdropFilter: "blur( 4px )",
        border: " 1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <form noValidate autoComplete="off">
        <TextField
          type="text"
          label="Full Name"
          variant="filled"
          fullWidth
          focused
          margin="dense"
          InputProps={{
            sx: {
              "& input": {
                color: "white",
              },
            },
          }}
        />
        <TextField
          type="email"
          label="Email Address"
          variant="filled"
          fullWidth
          focused
          margin="dense"
          InputProps={{
            sx: {
              "& input": {
                color: "white",
              },
            },
          }}
        />
        <TextField
          type="password"
          label="Password"
          variant="filled"
          fullWidth
          focused
          margin="dense"
          InputProps={{
            sx: {
              "& input": {
                color: "white",
              },
            },
          }}
        />
        <Button
          variant="outlined"
          sx={{ mt: ".3rem" }}
          component="label"
          fullWidth
        >
          Upload Profile Picture
          <input type="file" hidden />
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: "1rem" }}
          startIcon={<PersonAddIcon />}
        >
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
