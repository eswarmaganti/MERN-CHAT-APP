import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AddPhotoAlternate, PersonAdd } from "@mui/icons-material";
import axios from "axios";

import { useRegisterUserMutation } from "../app/services/authApi";
import Spinner from "./Utils/Spinner";
import { green } from "@mui/material/colors";
import ToastAlert from "./Utils/ToastAlert";
import { toast } from "react-toastify";
import { Container } from "@mui/system";

const SignupForm = () => {
  const signupSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .max(50, "Full Name must be at most 50 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email()
      .min(6, "Email must be at least 6 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must be at most 16 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is a required field"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const [registerUser, { isError, isLoading, error, data }] =
    useRegisterUserMutation();

  // state to hold the final url of profile picture from cloudinary
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  // state to store the loading of profile picture
  const [loading, setLoading] = useState(false);

  // state to store the profile picture info when selected from file system
  const [profilePicture, setProfilePicture] = useState(null);

  const uploadProfilePicture = async (e) => {
    setLoading(true);
    const image = e.target.files[0];
    setProfilePicture(image);
    console.log(image);
    if (image == undefined) {
      toast.error("Please select a profile picture");
      setLoading(false);
      setProfilePicture(null);
      return;
    }

    if (image.type == "image/jpeg" || image.type == "image/png") {
      if (!(image.size / Math.pow(1024, 2) <= 2)) {
        toast.error("Profile picture size should be less than 2 MB");
        setProfilePicture(null);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mern-chat-app");
      formData.append("cloud_name", "mern-chat-app");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/eswar-krishna-maganti/image/upload",
          formData
        );

        const { data } = await response;
        setProfilePictureUrl(data.url);
        setLoading(false);
        toast.success("Profile picture uploaded successfully");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const onRegisterUser = async (data) => {
    await registerUser({ ...data, profilePicture: profilePictureUrl });
    if (!isLoading) {
      setProfilePicture(null);
    }
  };

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  useEffect(() => {
    // dispatch a action to store the login info in state and local storage
    if (data?.token) {
      reset();
      dispatch(setUserInfo(data));
      navigate("/chats");
    }
  }, [data?.token]);

  return (
    <Box sx={styles.container} pt={5}>
      <Container maxWidth="sm">
        <Stack
          alignItems="center"
          // sx={{ maxWidth: "50%", margin: "auto", pt: 2 }}
        >
          <Avatar
            sx={styles.avatar}
            src={
              profilePicture
                ? URL.createObjectURL(profilePicture)
                : "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            }
          />

          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onRegisterUser)}
          >
            <TextField
              type="text"
              name="name"
              label="Full Name"
              variant="filled"
              fullWidth
              margin="dense"
              size="small"
              {...register("name")}
              helperText={errors.name?.message}
              error={Boolean(errors.name?.message)}
            />
            <TextField
              type="email"
              name="email"
              label="Email Address"
              variant="filled"
              fullWidth
              margin="dense"
              size="small"
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
              size="small"
              {...register("password")}
              helperText={errors.password?.message}
              error={Boolean(errors.password?.message)}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              variant="filled"
              fullWidth
              margin="dense"
              size="small"
              {...register("confirmPassword")}
              helperText={errors.confirmPassword?.message}
              error={Boolean(errors.confirmPassword?.message)}
            />

            <Box sx={{ my: ".5rem" }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                color="info"
                startIcon={<AddPhotoAlternate />}
              >
                Upload Profile Photo
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={uploadProfilePicture}
                />
              </Button>
              <Typography
                variant="body2"
                component="p"
                color="white"
                sx={{ pt: "2px" }}
              >
                {profilePicture?.name}
              </Typography>
            </Box>

            <Button
              variant="contained"
              type="submit"
              startIcon={loading || isLoading ? <Spinner /> : <PersonAdd />}
              disabled={loading || isLoading}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: green[600],
                  color: "white",
                  opacity: ".5",
                },
                mt: ".5rem",
              }}
            >
              Signup
            </Button>
          </form>
          <ToastAlert />
        </Stack>
      </Container>
    </Box>
  );
};

const styles = {
  container: {
    height: "calc(100% - 55px)",
  },
  avatar: {
    height: "70px",
    width: "70px",
    objectFit: "cover",
  },
};

export default SignupForm;
