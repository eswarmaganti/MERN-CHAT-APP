import React from "react";
import { Stack, Paper, Typography, IconButton } from "@mui/material";
import RecentChatItem from "./RecentChatItem";
import { grey } from "@mui/material/colors";
import {
  VideocamOutlined as VideoCamIcon,
  AddRounded as AddIcon,
} from "@mui/icons-material";
const RecentChatsList = () => {
  return (
    <Stack sx={styles.container} component={Paper}>
      <ChatListHeader />
      <Typography variant="caption" sx={{ p: 1 }}>
        Recent
      </Typography>
      <ChatsList />
    </Stack>
  );
};

const ChatListHeader = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={styles.chatListHeaderContainer}
    >
      <Typography variant="subtitle1" component="h6" sx={{ fontWeight: "700" }}>
        Chat
      </Typography>

      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton>
          <VideoCamIcon />
        </IconButton>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const ChatsList = () => {
  return (
    <Stack sx={styles.chatListContainer}>
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
      <RecentChatItem />
    </Stack>
  );
};

const styles = {
  container: {
    backgroundColor: grey[200],
    borderRight: `1px solid ${grey[300]}`,
    minHeight: "100%",
  },

  chatListContainer: {
    overflowY: "auto",
  },
  chatListHeaderContainer: { p: 1, borderBottom: `1px solid ${grey[300]}` },
};

export default RecentChatsList;
