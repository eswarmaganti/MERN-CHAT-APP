import React from "react";
import {
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import {
  VideocamRounded as VideoCamIcon,
  LocalPhoneRounded as PhoneIcon,
  OpenInNewOutlined as PopOutIcon,
  SendRounded as SendIcon,
} from "@mui/icons-material";
import UserAvatar from "./Utils/UserAvatar";
import { useSelector } from "react-redux";
import { getSenderData, getSenderName } from "./../config/index";
import groupChatProfilePicture from "../assets/images/group.png";

const UserChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <Box sx={{ height: "100%" }}>
      <ChatBoxHeader chat={selectedChat} />
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

const ChatBoxHeader = ({ chat }) => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  let chatName;
  let chatSender;
  if (chat) {
    chatName = chat.isGroupChat
      ? chat.chatName
      : getSenderName(chat?.users, user);

    chatSender = chat.isGroupChat
      ? { profilePicture: groupChatProfilePicture }
      : getSenderData(chat?.users, user);
  }

  return (
    <>
      {chat && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 2,
            borderBottom: `1px solid ${grey[300]}`,
            backgroundColor: grey[200],
            height: 55,
          }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <UserAvatar imgUrl={chatSender.profilePicture} isActive={true} />
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ fontWeight: "700", fontSize: "1rem" }}
            >
              {chatName}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <IconButton color="primary">
              <VideoCamIcon sx={{ color: indigo[600] }} />
            </IconButton>
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>
            <IconButton color="primary">
              <PopOutIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

ChatBoxHeader.defaultProps = {};

export default UserChatBox;
