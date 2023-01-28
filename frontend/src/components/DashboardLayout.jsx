import { Box, Typography, Grid, Stack } from "@mui/material";
import React from "react";
import TopNavigationBar from "./TopNavigationBar";
import SideNavigationBar from "./SideNavigationBar";
import RecentChatsList from "./RecentChatsList";
import { Outlet } from "react-router-dom";

const DashboardLayout = (props) => {
  return (
    <Box sx={{ height: "100vh", maxHeight: "100vh" }}>
      <TopNavigationBar />
      <Stack
        direction="row"
        sx={{ height: "calc(100vh - 55px)", maxHeight: "calc(100vh - 55px)" }}
      >
        <Stack sx={{ width: 60 }}>
          <SideNavigationBar />
        </Stack>
        <Stack sx={{ width: 280 }}>
          <RecentChatsList />
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
