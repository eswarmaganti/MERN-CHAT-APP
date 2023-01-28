import React from "react";
import { Stack, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { grey } from "@mui/material/colors";

const UserInfo = ({ user }) => {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        px: 2,
        py: 1,
        width: "100%",
      }}
    >
      <UserAvatar imgUrl={user.profilePicture} />
      <Stack>
        <Typography variant="subtitle2">{user.name}</Typography>
        <Typography variant="caption">{user.email}</Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
