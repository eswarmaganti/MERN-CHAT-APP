import React from "react";
import {
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { SendRounded as SendIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import ChatBoxHeader from "./ChatBoxHeader";

const UserChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <Box sx={{ height: "100%" }}>
      <ChatBoxHeader />
      <Box
        sx={{
          height: `${selectedChat ? "calc(100% - 55px)" : "100%"}`,
          backgroundColor: grey[100],
          px: 5,
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <form noValidate autoComplete="off">
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ position: "absolute", bottom: "1rem", width: "100%" }}
            >
              <TextField
                label="type a message"
                size="small"
                variant="filled"
                focused
                fullWidth
                name="message"
                multiline
                sx={{ flexGrow: 1 }}
              />
              <IconButton type="submit" color="primary">
                <SendIcon color="primary" />
              </IconButton>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UserChatBox;
