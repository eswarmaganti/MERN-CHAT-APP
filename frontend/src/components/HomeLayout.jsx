import React from "react";
import HomeNavbar from "./HomeNavbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const HomeLayout = (props) => {
  return (
    <Box sx={{ height: "100vh" }}>
      <HomeNavbar />
      <Outlet />
    </Box>
  );
};

export default HomeLayout;
