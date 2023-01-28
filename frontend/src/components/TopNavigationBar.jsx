import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import {
  MoreHorizOutlined as MenuIcon,
  ChatRounded as ChatIcon,
  Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";

import AppLogo from "./Utils/AppLogo";
import { useLazySearchUsersQuery } from "../app/services/authApi";
import { useCreateChatMutation } from "../app/services/chatApi";
import { setSelectedChat } from "../app/slice/chatSlice";
import UserAvatar from "./Utils/UserAvatar";
import ToastAlert from "./Utils/ToastAlert";
import UserInfo from "./Utils/UserInfo";

const TopNavigationBar = () => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  // state hook to show / hide search results
  const [showSearchResults, setShowSearchResults] = useState(false);

  // RTK Query to trigger the user search
  const [trigger, { data: searchUsers, isLoading, isError }] =
    useLazySearchUsersQuery();

  // handler callback for handling user search
  const onSearchTextChange = (e) => {
    if (e.target.value) {
      setShowSearchResults(true);
      trigger({ searchText: e.target.value.trim(), token: user.token });
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={styles.container}
    >
      <AppLogo />
      <TextField
        label="search people"
        name="search"
        size="small"
        sx={styles.searchInput}
        focused
        placeholder="search by name or email address"
        onChange={onSearchTextChange}
        autoComplete="off"
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Avatar src={user.profilePicture} />
      </Stack>

      <SearchResultsPanel
        users={searchUsers}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
      />
    </Stack>
  );
};

const SearchResultsPanel = ({
  users,
  showSearchResults,
  setShowSearchResults,
}) => {
  const dispatch = useDispatch();

  // RTK Mutation for creating or accessing  Chat
  const [createChat, { isLoading, isError, data: createdChatData, error }] =
    useCreateChatMutation();

  // state for showing error messages
  const [showAlert, setShowAlert] = useState(isError);

  // selecting the user info from redux store
  const { user } = useSelector((state) => state.chatAppUserInfo);

  // handler callback to create a new chat
  const handleCreateChat = async (userId) => {
    await createChat({ userId, token: user.token });
  };

  useEffect(() => {
    setShowAlert(isError);
  }, [isError]);

  // selecting the chat after it got created
  useEffect(() => {
    if (createdChatData && createdChatData.length === 1) {
      dispatch(setSelectedChat(createdChatData[0]));
      handleCloseSearchResults();
    }
  }, [createdChatData]);

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
  };
  return showSearchResults ? (
    <Box sx={styles.searchResultsContainer}>
      <Button
        size="small"
        variant="text"
        startIcon={<Close />}
        sx={{ alignSelf: "flex-end" }}
        onClick={handleCloseSearchResults}
      >
        Close
      </Button>
      {users?.map((user) => (
        <Stack
          key={user._id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={styles.searchResultItem}
        >
          <UserInfo user={user} />
          <IconButton
            color="primary"
            onClick={() => handleCreateChat(user._id)}
          >
            <ChatIcon />
          </IconButton>
        </Stack>
      ))}

      <ToastAlert
        message={error?.data?.message}
        open={showAlert}
        onClose={() => setShowALert(!showAlert)}
      />
    </Box>
  ) : null;
};

const styles = {
  container: {
    height: "55px",
    px: 2,
    borderBottom: `1px solid  ${grey[300]}`,
    backgroundColor: grey[200],
    position: "relative",
  },
  searchResultsContainer: {
    height: "auto",
    maxHeight: "250px",
    width: "400px",
    backgroundColor: grey[200],
    zIndex: "10",
    position: "absolute",
    top: "55px",
    left: "50%",
    transform: "translatex(-50%)",
    border: `1px solid ${grey[300]}`,
    borderBottomLeftRadius: ".5rem",
    borderBottomRightRadius: ".5rem",
    boxShadow: `2px 2px 10px ${grey[300]}`,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    py: 0.5,
  },
  searchResultItem: {
    "&:hover": {
      backgroundColor: grey[100],
    },
    borderBottom: `1px solid ${grey[300]}`,
    "&:last-child": {
      borderBottom: `none`,
    },

    cursor: "pointer",
  },
  searchInput: {
    width: "400px",
    backgroundColor: "white",
    position: "absolute",
    left: "50%",
    transform: "translatex(-50%)",
  },
};

export default TopNavigationBar;
