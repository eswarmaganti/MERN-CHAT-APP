import React from "react";
import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import { MoreHorizOutlined as MenuIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { indigo, grey } from "@mui/material/colors";
import AppLogo from "./Utils/AppLogo";

const TopNavigationBar = () => {
  const { user } = useSelector((state) => state.chatAppUserInfo);

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
        sx={{
          width: "400px",
          backgroundColor: "white",
        }}
        focused
        placeholder="search by name or email address"
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Avatar src={user.profilePicture} />
      </Stack>
    </Stack>
  );
};

const styles = {
  container: {
    height: "55px",
    px: 2,
    borderBottom: `1px solid  ${grey[300]}`,
    backgroundColor: grey[200],
  },
};

export default TopNavigationBar;
