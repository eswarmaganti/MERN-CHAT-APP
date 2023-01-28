import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  MoreHorizOutlined as MenuIcon,
  ChatRounded as ChatIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

import AppLogo from "./Utils/AppLogo";
import { useLazySearchUsersQuery } from "../app/services/authApi";
import UserAvatar from "./Utils/UserAvatar";

const TopNavigationBar = () => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const [trigger, { data: searchUsers, isLoading, isError }] =
    useLazySearchUsersQuery({});

  const onSearchTextChange = (e) => {
    trigger({ searchText: e.target.value.trim(), token: user.token });
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
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Avatar src={user.profilePicture} />
      </Stack>

      <SearchResultsPanel users={searchUsers} />
    </Stack>
  );
};

const SearchResultsPanel = ({ users }) => {
  return users?.length > 0 ? (
    <Box sx={styles.searchResultsContainer}>
      {users.map((user) => (
        <Stack
          key={user._id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            "&:hover": {
              backgroundColor: grey[100],
            },
            cursor: "pointer",
          }}
        >
          <Stack
            direction="row"
            gap={2}
            sx={{
              px: 2,
              py: 1,
              borderBottom: `1px solid ${grey[300]}`,
              width: "100%",
            }}
          >
            <UserAvatar imgUrl={user.profilePicture} />
            <Stack>
              <Typography variant="subtitle2">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </Stack>
          </Stack>
          <IconButton color="primary">
            <ChatIcon />
          </IconButton>
        </Stack>
      ))}
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
