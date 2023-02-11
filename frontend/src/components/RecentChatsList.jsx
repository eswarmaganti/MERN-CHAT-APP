import React, { useState } from "react";
import {
  Stack,
  Paper,
  Typography,
  IconButton,
  LinearProgress,
  List,
} from "@mui/material";
import RecentChatItem from "./RecentChatItem";
import { grey } from "@mui/material/colors";
import {
  VideocamOutlined as VideoCamIcon,
  GroupAddRounded as GroupAddIcon,
} from "@mui/icons-material";

import { useFetchChatsQuery } from "../app/services/chatApi";
import { useSelector, useDispatch } from "react-redux";

import { setSelectedChat } from "../app/slice/chatSlice";
import CreateGroupChat from "./CreateGroupChat";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RecentChatsList = () => {
  const { user } = useSelector((state) => state.chatAppUserInfo);
  const {
    data: chats,
    isLoading,
    isError,
    error,
  } = useFetchChatsQuery(user.token);

  // state hoook for creating a new chat dialog
  const [showCrateGroupChat, setShowCrateGroupChat] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);

  return (
    <Stack sx={styles.container} component={Paper}>
      <ChatListHeader
        setShowCrateGroupChat={setShowCrateGroupChat}
        showCrateGroupChat={showCrateGroupChat}
      />
      <Typography variant="caption" sx={{ p: 1 }}>
        Recent
      </Typography>
      {!isLoading && chats ? <ChatsList chats={chats} /> : <LinearProgress />}

      <CreateGroupChat
        open={showCrateGroupChat}
        handleClose={() => setShowCrateGroupChat(!showCrateGroupChat)}
      />
    </Stack>
  );
};

const ChatListHeader = ({ setShowCrateGroupChat, showCrateGroupChat }) => {
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
        <IconButton
          color="primary"
          onClick={() => setShowCrateGroupChat(!showCrateGroupChat)}
        >
          <GroupAddIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const ChatsList = ({ chats }) => {
  const dispatch = useDispatch();

  const handleSelectedChat = (selectedChat) => {
    dispatch(setSelectedChat(selectedChat));
  };
  return (
    <List sx={styles.chatListContainer}>
      {chats.map((chat) => (
        <RecentChatItem
          chat={chat}
          key={chat._id}
          onClick={() => handleSelectedChat(chat)}
        />
      ))}
    </List>
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
