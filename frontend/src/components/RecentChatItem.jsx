import React from "react";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import UserAvatar from "./Utils/UserAvatar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import groupChatProfilePicture from "../assets/images/group.png";
import { getSenderData, getSenderName } from "../config";

const RecentChatItem = ({ chat, onClick }) => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const chatSenderData = getSenderData(chat?.users, user);
  const chatSenderName = getSenderName(chat?.users, user);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={styles.chatItemContainer}
      onClick={onClick}
    >
      <Stack direction="row" gap={1}>
        <UserAvatar
          imgUrl={
            !chat.isGroupChat
              ? chatSenderData.profilePicture
              : groupChatProfilePicture
          }
        />
        <Stack>
          <Typography
            variant="subtitle2"
            color="black"
            component="h5"
            sx={{ fontWeight: 500 }}
          >
            {!chat.isGroupChat ? chatSenderName : chat.chatName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: grey[700], lineHeight: "1" }}
          >
            {user.latestMessage}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="caption">
        {dayjs(chat?.latestMessage?.createdAt).format("h:MM A")}
      </Typography>
    </Stack>
  );
};

const styles = {
  chatItemContainer: {
    py: 0.5,
    px: 0.5,
    borderBottom: `1px solid ${grey[300]}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grey[100],
    },
  },
};

RecentChatItem.defaultProps = {
  user: {
    name: "John Smith",
    latestMessage: "Hello from John Smith",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
};

export default RecentChatItem;
