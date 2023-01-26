import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AddPhotoAlternate, PersonAdd } from "@mui/icons-material";
import axios from "axios";

import { useRegisterUserMutation } from "../app/services/authApi";
import Spinner from "./Utils/Spinner";
import { green } from "@mui/material/colors";
import ToastAlert from "./Utils/ToastAlert";

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

  // state to show / hide the alert messages
  const [showAlert, setShowAlert] = useState(isError);

  // state to hold the final url of profile picture from cloudinary
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  // state to store the loading of profile picture
  const [loading, setLoading] = useState(false);

  // state to store the profile picture errors
  const [imageError, setImageError] = useState({
    error: false,
    message: "",
  });
  // state to store the profile picture info when selected from file system
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setShowAlert(isError);
  }, [isError]);

  const uploadProfilePicture = async (e) => {
    setLoading(true);
    const image = e.target.files[0];
    setProfilePicture(image);
    console.log(image);
    if (image == undefined) {
      setImageError({
        error: true,
        message: "Please select a profile picture",
      });
      setLoading(false);

      return;
    }

    if (image.type == "image/jpeg" || image.type == "image/png") {
      if (!(image.size / Math.pow(1024, 2) <= 2)) {
        setImageError({
          error: true,
          message: "Profile picture size should be less than 2 MB",
        });
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
      } catch (error) {
        setLoading(false);

        setImageError({ error: true, message: error.message });
        console.error(error);
      }
    }
  };

  console.log(profilePictureUrl);

  const onRegisterUser = async (data) => {
    await registerUser({ ...data, profilePicture: profilePictureUrl });
    if (!isLoading) {
      reset();
      setProfilePicture(null);
    }
  };

  return (
    <>
      <Box sx={styles.container}>
        <img
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          }
          style={styles.image}
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
            focused
            margin="dense"
            InputProps={{
              sx: {
                "& input": {
                  color: "white",
                },
              },
            }}
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
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
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
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
            error={Boolean(errors.confirmPassword?.message)}
          />

          <Box sx={{ my: ".5rem" }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
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
      </Box>

      <ToastAlert
        open={showAlert}
        onClose={setShowAlert}
        message={error?.data?.message}
      />
      <ToastAlert
        open={imageError.error}
        onClose={() => setImageError({ error: false, message: "" })}
        message={imageError.message}
      />
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
    display: "grid",
    placeItems: "center",
  },
  image: {
    height: "100px",
    width: "100px",
    objectFit: "cover",
    borderRadius: "50%",
  },
};

export default SignupForm;
