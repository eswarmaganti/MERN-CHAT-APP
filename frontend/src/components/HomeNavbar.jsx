import { Button, Stack } from "@mui/material";
import React from "react";
import AppLogo from "./Utils/AppLogo";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import {
  Login as LoginIcon,
  GroupAdd as SignupIcon,
  HomeRounded as HomeIcon,
} from "@mui/icons-material";

const HomeNavbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: 55, boxShadow: `0 2px 10px ${grey[300]}`, px: 6 }}
    >
      <AppLogo />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Link to="/">
          <Button type="text" startIcon={<HomeIcon />}>
            Home
          </Button>
        </Link>
        <Link to="/login">
          <Button type="text" startIcon={<LoginIcon />}>
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="text" startIcon={<SignupIcon />}>
            Signup
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default HomeNavbar;
