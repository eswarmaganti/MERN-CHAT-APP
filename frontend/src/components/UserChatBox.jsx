import React, { useEffect } from "react";
import {
  Box,
  Stack,
  IconButton,
  TextField,
  LinearProgress,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { SendRounded as SendIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import ChatBoxHeader from "./ChatBoxHeader";

import { useForm } from "react-hook-form";
import Spinner from "./Utils/Spinner";
import {
  useFetchMessagesQuery,
  useSendNewMessageMutation,
} from "../app/services/messageApi";

const UserChatBox = ({ chat }) => {
  const { register, handleSubmit, formState, setValue } = useForm();

  const { user } = useSelector((state) => state.chatAppUserInfo);
  const { data: messages, isLoading: isMessagesLoading } =
    useFetchMessagesQuery({
      chatId: chat._id,
      token: user.token,
    });

  const [
    sendNewMessage,
    {
      data: sendNewMessageData,
      isLoading: isSendNewMessageLoading,
      isError: isSendNewMessageError,
      error: sendNewMessageError,
    },
  ] = useSendNewMessageMutation();

  const onSendNewMessage = async ({ content }) => {
    setValue("content", "");
    await sendNewMessage({ content, chatId: chat._id, token: user.token });
  };

  const isLastMessage = (userId, msgIndex) => {
    return (
      (msgIndex < messages.length - 1 &&
        messages[msgIndex + 1].sender._id !== userId) ||
      (msgIndex === messages.length - 1 &&
        messages[msgIndex].sender._id === userId)
    );
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ChatBoxHeader />
      {isMessagesLoading && <LinearProgress />}
      <Box
        sx={{
          height: `${chat ? "calc(100% - 55px)" : "100%"}`,
          backgroundColor: grey[100],
          px: 5,
          pt: 2,
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          {!isMessagesLoading && (
            <Stack
              sx={{
                height: "100%",
                overflowY: "auto",
                maxHeight: "calc(100% - 65px)",
              }}
            >
              {messages.map((msg, ind) =>
                user._id === msg.sender._id ? (
                  <Chip
                    key={msg._id}
                    label={msg.content}
                    sx={{ alignSelf: "flex-end", mb: 0.5 }}
                    color="primary"
                  />
                ) : (
                  <React.Fragment key={msg._id}>
                    {isLastMessage(msg.sender._id, ind) ? (
                      <Stack direction="row" gap={1}>
                        <Avatar
                          sx={{ height: 32, width: 32 }}
                          src={msg.sender.profilePicture}
                        />
                        <Chip
                          label={msg.content}
                          sx={{
                            alignSelf: "flex-start",
                            mb: 0.5,
                            backgroundColor: grey[400],
                          }}
                        />
                      </Stack>
                    ) : (
                      <Chip
                        label={msg.content}
                        sx={{
                          alignSelf: "flex-start",
                          mb: 0.5,
                          ml: 5,
                          backgroundColor: grey[400],
                        }}
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </Stack>
          )}

          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSendNewMessage)}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ position: "absolute", bottom: "1rem", width: "100%" }}
            >
              <TextField
                label="type a message"
                size="small"
                variant="filled"
                focused
                fullWidth
                name="message"
                multiline
                rows={1}
                sx={{ flexGrow: 1 }}
                {...register("content")}
              />
              <IconButton
                type="submit"
                color="primary"
                disabled={isSendNewMessageLoading}
              >
                {isSendNewMessageLoading ? (
                  <Spinner />
                ) : (
                  <SendIcon color="primary" />
                )}
              </IconButton>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UserChatBox;
