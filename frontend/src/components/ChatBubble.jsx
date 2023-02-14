import React from "react";
import { Avatar, Chip, Typography, Stack } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import dayjs from "dayjs";

const ChatBubble = ({ align, color, msg, showProfilePicture }) => {
  return (
    <Stack alignSelf={`flex-${align}`} mb={0.5}>
      <Chip
        avatar={
          showProfilePicture ? (
            <Avatar
              src={msg.sender.profilePicture}
              label="profile picture"
              variant="outlined"
            />
          ) : null
        }
        label={
          <Typography
            component="span"
            variant="body2"
            color={color === indigo[600] ? "white" : null}
          >
            {msg.content}
          </Typography>
        }
        sx={{
          py: 1,
          backgroundColor: color,
        }}
      />
      <Typography align="right" variant="caption" fontSize={10} pr={1}>
        {dayjs(msg.createdAt).format("DD/MM HH:mm")}
      </Typography>
    </Stack>
  );
};

ChatBubble.defaultProps = {
  color: grey[400],
  align: "start",
  showProfilePicture: false,
};

export default ChatBubble;
