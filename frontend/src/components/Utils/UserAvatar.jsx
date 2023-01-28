import React from "react";
import { Badge, Avatar } from "@mui/material";

const UserAvatar = ({ imgUrl, isActive }) => {
  return (
    <Badge
      color={isActive ? "success" : "warning"}
      badgeContent=" "
      overlap="circular"
      variant="dot"
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Avatar sx={{ height: 36, width: 36 }} src={imgUrl} />
    </Badge>
  );
};

UserAvatar.defaultProps = {
  imgUrl: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  isActive: false,
};

export default UserAvatar;
