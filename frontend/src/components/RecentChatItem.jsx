import React from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Groups2 as GroupsIcon } from "@mui/icons-material";
import UserAvatar from "./Utils/UserAvatar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { getSenderData } from "../config";
import { indigo } from "@mui/material/colors";

const RecentChatItem = ({ chat, onClick }) => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const chatSenderData = getSenderData(chat?.users, user);

  return (
    <ListItemButton alignItems="flex-start" sx={{ py: 0 }} onClick={onClick}>
      <ListItemAvatar sx={{ minWidth: 46 }}>
        {!chat.isGroupChat ? (
          <UserAvatar imgUrl={chatSenderData.profilePicture} isActive={true} />
        ) : (
          <Avatar sx={{ bgcolor: indigo[600] }}>
            <GroupsIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="subtitle2">{chat.chatName}</Typography>}
        secondary={
          <Stack
            direction="row"
            justifyContent="space-between"
            component="span"
          >
            <Stack direction="row" component="span">
              <Typography variant="h6" fontSize={12} component="span" mr={0.3}>
                {chat?.latestMessage?.sender?.name.split(" ")[0]}:
              </Typography>
              <Typography variant="caption" fontSize={12} component="span">
                {chat?.latestMessage?.content.length > 10
                  ? chat?.latestMessage?.content.slice(0, 10) + "..."
                  : chat?.latestMessage?.content}
              </Typography>
            </Stack>
            <Typography variant="caption" component="span" fontSize={10}>
              {dayjs(chat?.latestMessage?.createdAt).format("DD/MM HH:mm")}
            </Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
};

export default RecentChatItem;
