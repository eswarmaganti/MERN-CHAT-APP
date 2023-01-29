import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Box, Button, Alert, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { useLoginUserMutation } from "../app/services/authApi";
import { useEffect } from "react";
import Spinner from "./Utils/Spinner";
import { setUserInfo } from "../app/slice/userSlice";
import ToastAlert from "./Utils/ToastAlert";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "maganti.ek@gmail.com",
      password: "maganti.ek",
    },
  });

  const [loginUser, { isLoading, isError, data, error }] =
    useLoginUserMutation();

  const onLoginUser = async (data) => {
    await loginUser(data);
  };

  useEffect(() => {
    console.log("From Login Page", isError);
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  useEffect(() => {
    // dispatch a action to store the login info in state and local storage
    if (data?.token) {
      dispatch(setUserInfo(data));
      navigate("/chats");
    }
  }, [data?.token]);

  return (
    <Box sx={styles.container}>
      <Box sx={{ margin: "auto", maxWidth: "50%" }}>
        <Typography sx={{ py: 1 }} variant="h6">
          Login with your credentials
        </Typography>
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
            margin="dense"
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
            margin="dense"
            {...register("password")}
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: "1rem" }}
            startIcon={isLoading ? <Spinner /> : <LoginIcon />}
          >
            Login
          </Button>
        </form>
      </Box>
      <ToastAlert />
    </Box>
  );
};

const styles = {
  container: {},
};

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

export default LoginForm;
