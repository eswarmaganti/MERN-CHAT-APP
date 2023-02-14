import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  TextField,
  LinearProgress,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { SendRounded as SendIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import ChatBoxHeader from "./ChatBoxHeader";
import { useForm } from "react-hook-form";
import Spinner from "./Utils/Spinner";
import {
  useFetchMessagesQuery,
  useSendNewMessageMutation,
} from "../app/services/messageApi";
import ChatBubble from "./ChatBubble";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const UserChatBox = ({ chat }) => {
  // state hook to hold messages data

  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, formState, setValue } = useForm();

  const { user } = useSelector((state) => state.chatAppUserInfo);
  const {
    data: fetchMessagesData,
    isLoading,
    isSuccess: isFetchMessagesSuccess,
    isFetching: isFetchMessagesLoading,
  } = useFetchMessagesQuery({
    chatId: chat._id,
    token: user.token,
  });

  const [
    sendNewMessage,
    {
      data: sendNewMessageData,
      isLoading: isSendNewMessageLoading,
      isSuccess: isSendNewMessageSuccess,
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

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
  }, []);

  // effect hook to update the messages
  useEffect(() => {
    if (!isFetchMessagesLoading) {
      socket.emit("join chat", chat._id);
      setMessages([...fetchMessagesData]);
    }
  }, [JSON.stringify(fetchMessagesData)]);

  useEffect(() => {
    if (isSendNewMessageSuccess) {
      socket.emit("new message", sendNewMessageData);
      setMessages([...messages, sendNewMessageData]);
    }
  }, [isSendNewMessageSuccess]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
  });

  return (
    <Box sx={{ height: "100%" }}>
      <ChatBoxHeader />
      {isFetchMessagesLoading && <LinearProgress />}
      <Box
        sx={{
          height: `${chat ? "calc(100% - 55px)" : "100%"}`,
          backgroundColor: grey[100],
          px: 5,
          pt: 2,
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          {!isFetchMessagesLoading && (
            <Stack
              sx={{
                height: "100%",
                overflowY: "auto",
                maxHeight: "calc(100% - 100px)",
              }}
            >
              {messages.map((msg, ind) =>
                user._id === msg.sender._id ? (
                  <ChatBubble
                    msg={msg}
                    key={msg._id}
                    align="end"
                    color={indigo[600]}
                  />
                ) : isLastMessage(msg.sender._id, ind) ? (
                  <ChatBubble
                    msg={msg}
                    key={msg._id}
                    showProfilePicture={true}
                  />
                ) : (
                  <ChatBubble msg={msg} key={msg._id} />
                )
              )}
            </Stack>
          )}

          {/* -------- FORM to send new Messages ---------- */}
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
                rows={2}
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
