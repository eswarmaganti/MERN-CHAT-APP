import React from "react";
import {
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import UserAvatar from "./Utils/UserAvatar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import groupChatProfilePicture from "../assets/images/group.png";
import { getSenderData, getSenderName } from "../config";
import { Stack } from "@mui/system";

const RecentChatItem = ({ chat, onClick }) => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const chatSenderData = getSenderData(chat?.users, user);

  return (
    <ListItemButton alignItems="flex-start" onClick={onClick}>
      <ListItemAvatar>
        <UserAvatar
          imgUrl={
            !chat.isGroupChat
              ? chatSenderData.profilePicture
              : groupChatProfilePicture
          }
          isActive={true}
        />
      </ListItemAvatar>
      <ListItemText
        primary={chat.chatName}
        secondary={
          <>
            <Typography variant="subtitle2" component="span">
              {chat?.latestMessage?.sender?.name.split(" ")[0]}:
            </Typography>
            <Typography variant="caption" component="span">
              {chat?.latestMessage?.content}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
};

RecentChatItem.defaultProps = {
  user: {
    name: "John Smith",
    latestMessage: "Hello from John Smith",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
};

export default RecentChatItem;
