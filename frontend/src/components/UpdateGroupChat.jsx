import React, { useEffect, useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Grid,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  CloseRounded as CloseIcon,
  PersonAddRounded as AddPersonIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useRemoveFromGroupChatMutation,
  useRenameGroupChatMutation,
  useAddUserToGroupChatMutation,
} from "../app/services/chatApi";

import { useLazySearchUsersQuery } from "../app/services/authApi";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ToastAlert from "./Utils/ToastAlert";
import { setSelectedChat } from "../app/slice/chatSlice";
import DisplayGroupParticipants from "./DisplayGroupParticipants";
import SearchUserResultsPanel from "./SearchUserResultsPanel";

const UpdateGroupChat = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  // selecting the selectedChat data from redux store
  const { selectedChat: chat } = useSelector((state) => state.chat);
  const { chatName, users: groupParticipants } = chat;

  // state for show/hide search results of users
  const [showSearchResults, setShowSearchResults] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChatNameSchema),
    defaultValues: {
      name: chatName,
    },
  });

  const { user } = useSelector((state) => state.chatAppUserInfo);

  const [
    removeFromGroupChat,
    {
      isLoading: isRemoveFromGroupLoading,
      error: removeFromGroupError,
      isError: isRemoveFromGroupError,
      isSuccess: isRemoveFromGroupSuccess,
      data: updatedChat,
    },
  ] = useRemoveFromGroupChatMutation();

  const [
    renameGroupChat,
    {
      isLoading: isRenameGroupChatLoading,
      error: renameGroupChatError,
      isError: isRenameGroupChatError,
      isSuccess: isRenameGroupChatSuccess,
      data: updatedRenameGroupChat,
    },
  ] = useRenameGroupChatMutation();

  const [
    addUserToGroupChat,
    {
      isLoading: isAddUserToGroupChatLoading,
      error: addUserToGroupChatError,
      isError: isAddUserToGroupChatError,
      isSuccess: isAddUserToGroupChatSuccess,
      data: updatedAddUserToGroupChat,
    },
  ] = useAddUserToGroupChatMutation();

  // RTK Query to trigger the user search
  const [trigger, { data: searchUsers, isLoading, isError }] =
    useLazySearchUsersQuery();

  // callback to delete the group participants
  const handleDeleteGroupParticipent = async (userId) => {
    // RTX mutation for delete group participants
    if (chat.groupAdmin._id === user._id)
      await removeFromGroupChat({
        userId,
        chatId: chat._id,
        token: user.token,
      });
    else toast.error("Group Admins can only remove group participants");
  };

  const handleRenameGroupChat = async (data) => {
    await renameGroupChat({
      chatId: chat._id,
      chatName: data.name,
      token: user.token,
    });
  };

  // handler function for searching participants
  const onSearchUsers = (e) => {
    if (e.target.value) {
      setShowSearchResults(true);
      trigger({ searchText: e.target.value.trim(), token: user.token });
    } else {
      setShowSearchResults(false);
    }
  };

  const handleAddUserToGroup = async (userId) => {
    await addUserToGroupChat({ chatId: chat._id, userId, token: user.token });
  };

  // effect hook to update the chatName when the selectedChat got changes
  useEffect(() => {
    setValue("name", chatName);
  }, [chatName]);

  // effect hook to update the selectedChat data after removing a praticipant is success
  useEffect(() => {
    if (isRemoveFromGroupSuccess) dispatch(setSelectedChat(updatedChat));
  }, [isRemoveFromGroupSuccess]);

  // effect hook to update the selectedChat after renaming the chat is successful
  useEffect(() => {
    if (isRenameGroupChatSuccess)
      dispatch(setSelectedChat(updatedRenameGroupChat));
  }, [isRenameGroupChatSuccess]);

  // effect hook to update the selectedChat after adding the user to group is successful
  useEffect(() => {
    if (isAddUserToGroupChatSuccess)
      dispatch(setSelectedChat(updatedAddUserToGroupChat));
  }, [isAddUserToGroupChatSuccess]);

  // effect hooks for to show error alerts when api call fails
  useEffect(() => {
    toast.error(addUserToGroupChatError?.data?.message);
  }, [isAddUserToGroupChatError]);

  useEffect(() => {
    toast.error(renameGroupChatError?.data?.message);
  }, [isRenameGroupChatError]);

  useEffect(() => {
    toast.error(removeFromGroupError?.data?.message);
  }, [isRemoveFromGroupError]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      {/* --------- SHOW THE PROGRESS BAR -------------- */}
      {(isLoading ||
        isAddUserToGroupChatLoading ||
        isRemoveFromGroupLoading ||
        isRenameGroupChatLoading) && <LinearProgress color="primary" />}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h3" align="center" gutterBottom>
          Update Group Chat
        </Typography>

        <DisplayGroupParticipants
          groupParticipants={groupParticipants}
          onDeleteHandler={handleDeleteGroupParticipent}
        />

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleRenameGroupChat)}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <TextField
              size="small"
              name="name"
              required
              variant="filled"
              margin="dense"
              fullWidth
              label="Chat Name"
              {...register("name")}
              focused
              helperText={errors?.name?.message}
              error={Boolean(errors?.name?.message)}
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Stack>
        </form>

        {/* ----------- Search Users and Add to Group ---------------- */}
        <TextField
          label="Search Users"
          fullWidth
          margin="dense"
          variant="filled"
          size="small"
          autoComplete="off"
          noValidate
          onChange={onSearchUsers}
        />
        <SearchUserResultsPanel
          users={searchUsers}
          handleAction={handleAddUserToGroup}
          setShowSearchResults={setShowSearchResults}
          showSearchResults={showSearchResults}
          actionIcon={<AddPersonIcon />}
        />

        {/* ----------- Dialog Action Buttons ---------------- */}

        <Stack mt={2}>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleClose}
            startIcon={<CloseIcon />}
            sx={{ alignSelf: "flex-end" }}
          >
            Close Dialog
          </Button>
        </Stack>
      </Box>
      <ToastAlert />
    </Dialog>
  );
};

const ChatNameSchema = Yup.object({
  name: Yup.string()
    .min(3, "Chat Name should have minimum of 3 characters")
    .max(40, "Chat Name should have maximum of 40 characters")
    .required("Chat Name is required"),
});

export default UpdateGroupChat;
