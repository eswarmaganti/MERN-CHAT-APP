import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Snackbar,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useLoginUserMutation } from "../app/services/authApi";
import { useEffect } from "react";
import Spinner from "./Utils/Spinner";

const LoginForm = () => {
  const loginSchema = Yup.object({
    email: Yup.string()
      .email()
      .min(6, "Email must be at least 6 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must be at most 16 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "maganti.ek@gmail.com",
      password: "1234567",
    },
  });

  const [loginUser, { isLoading, isError, data, error }] =
    useLoginUserMutation();
  const onLoginUser = async (data) => {
    await loginUser(data);
  };

  const [showAlert, setShowAlert] = useState(isError);

  useEffect(() => {
    setShowAlert(isError);
  }, [isError]);

  return (
    <>
      <Box sx={styles.container}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onLoginUser)}
        >
          <TextField
            type="text"
            name="email"
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
            {...register("email")}
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
          />
          <TextField
            type="password"
            name="password"
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
            {...register("password")}
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={
              isLoading ? { pointerEvents: "none", mt: "1rem" } : { mt: "1rem" }
            }
            startIcon={isLoading ? <Spinner /> : <LoginIcon />}
          >
            Login
          </Button>
        </form>
      </Box>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={showAlert}
        onClose={() => setShowAlert(!showAlert)}
      >
        <Alert
          onClose={() => setShowAlert(!showAlert)}
          sx={{ width: "100%" }}
          severity="error"
          variant="filled"
        >
          {error?.data?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const styles = {
  container: {
    padding: "1rem",
    border: "1px solid #121212",
    borderRadius: ".5rem",
    mt: "1rem",
    background: "rgba( 0, 0, 0, 0.1 )",
    backdropFilter: "blur( 4px )",
    border: " 1px solid rgba( 255, 255, 255, 0.18 )",
  },
};

export default LoginForm;
