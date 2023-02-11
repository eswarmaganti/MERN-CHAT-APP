import React, { useState } from "react";
import { getSenderData } from "./../config/index";
import groupChatProfilePicture from "../assets/images/group.png";
import {
  VideocamRounded as VideoCamIcon,
  LocalPhoneRounded as PhoneIcon,
  OpenInNewOutlined as PopOutIcon,
  InfoRounded as InfoIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { grey, indigo } from "@mui/material/colors";

import UserAvatar from "./Utils/UserAvatar";
import { Stack, Typography, IconButton } from "@mui/material";
import UpdateGroupChat from "./UpdateGroupChat";

const ChatBoxHeader = () => {
  const { selectedChat: chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(!openDialog);
  };

  // fetching the chatName and Sender Details

  let chatSender;
  if (Object.keys(chat).length) {
    chatSender = chat?.isGroupChat
      ? { profilePicture: groupChatProfilePicture }
      : getSenderData(chat?.users, user);
  }

  return (
    <>
      {Boolean(Object.keys(chat).length) && (
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
            <UserAvatar imgUrl={chatSender?.profilePicture} isActive={true} />
            <Typography
              variant="subtitle2"
              component="h6"
              sx={{ fontWeight: "700", fontSize: "1rem" }}
            >
              {chat?.chatName}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <IconButton color="primary">
              <VideoCamIcon sx={{ color: indigo[600] }} />
            </IconButton>
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>

            {chat?.isGroupChat && (
              <IconButton
                color="primary"
                onClick={() => setOpenDialog(!openDialog)}
              >
                <InfoIcon />
              </IconButton>
            )}

            <IconButton color="primary">
              <PopOutIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}

      {chat && (
        <UpdateGroupChat open={openDialog} handleClose={handleDialogClose} />
      )}
    </>
  );
};

export default ChatBoxHeader;
