import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ChatsPage = () => {
  const { user } = useSelector((state) => state.chatAppUserInfo);
  return (
    <Box>
      <Typography>Name:{user.name}</Typography>
    </Box>
  );
};

export default ChatsPage;
