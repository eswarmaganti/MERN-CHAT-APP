import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginForm = () => {
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
      <form>
        <TextField
          type="text"
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
          variant="contained"
          type="submit"
          sx={{ mt: "1rem" }}
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

const styles = {
  input: {
    color: "white",
  },
};

export default LoginForm;
