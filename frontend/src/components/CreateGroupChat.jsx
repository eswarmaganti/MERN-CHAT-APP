import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  GroupAddRounded as CreateGroupIcon,
  CloseRounded as CloseIcon,
  PersonAddRounded as PersonAddIcon,
} from "@mui/icons-material";
import UserInfo from "./Utils/UserInfo";
import { useLazySearchUsersQuery } from "../app/services/authApi";
import { useCreateGroupChatMutation } from "../app/services/chatApi";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import ToastAlert from "./Utils/ToastAlert";
import Spinner from "./Utils/Spinner";
import SearchUserResultsPanel from "./SearchUserResultsPanel";
import DisplayGroupParticipants from "./DisplayGroupParticipants";

const CreateGroupChat = ({ open, handleClose }) => {
  const groupChatSchema = Yup.object({
    name: Yup.string()
      .min(3, "Chat Name must be at least 3 characters")
      .max(50, "Chat Name must be at most 50 characters")
      .required("Chat Name is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(groupChatSchema),
  });

  // selectiong the user info from redux store
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const [groupParticipents, setGroupParticipents] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // RTK Query to trigger the user search
  const [trigger, { data: searchUsers, isLoading, isError }] =
    useLazySearchUsersQuery();

  const [
    createGroupChat,
    {
      isLoading: isGroupChatLoading,
      isError: isGroupChatError,
      error: groupChatError,
      isSuccess: isGroupChatSuccess,
    },
  ] = useCreateGroupChatMutation();

  // RTL mutation to create a new group chat
  const removeParticipents = (id) => {
    const filteredParticipants = groupParticipents.filter(
      (item) => item._id !== id
    );

    setGroupParticipents([...filteredParticipants]);
  };
  const addParticipents = (user) => {
    if (!groupParticipents.some((item) => item._id === user._id))
      setGroupParticipents([...groupParticipents, user]);
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

  // handler callback to  create a new group chat
  const handleCreateGroupChat = async (data) => {
    // group participants validation
    if (groupParticipents.length < 2) {
      toast.error(
        "To create group chat, there should be minimun 2 participants"
      );
      return;
    }

    // making RTK mutation call
    await createGroupChat({
      name: data.name,
      users: groupParticipents,
      token: user.token,
    });
  };

  useEffect(() => {
    if (isGroupChatSuccess) toast.success("Group chat successfully created");
  }, [isGroupChatSuccess]);

  useEffect(() => {
    if (isGroupChatError) toast.error(groupChatError?.data?.message);
  }, [isGroupChatError]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <Box sx={styles.container}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: "500" }}>
          Create Group Chat
        </Typography>
        <form noValidate onSubmit={handleSubmit(handleCreateGroupChat)}>
          <TextField
            name="name"
            label="Chat Group Name"
            fullWidth
            variant="filled"
            margin="dense"
            size="small"
            autoComplete="off"
            noValidate
            {...register("name")}
            helperText={errors?.name?.message}
            error={Boolean(errors?.name?.message)}
          />
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

          {/* ------------ Component to display the Selected Users for creating a Group ---------- */}

          <DisplayGroupParticipants
            onDeleteHandler={removeParticipents}
            groupParticipants={groupParticipents}
          />
          {isLoading && <LinearProgress />}

          {/* --------- Component to display Search Results of Users ------ */}
          <SearchUserResultsPanel
            users={searchUsers}
            handleAction={addParticipents}
            setShowSearchResults={setShowSearchResults}
            showSearchResults={showSearchResults}
            actionIcon={<CreateGroupIcon />}
          />

          <Stack direction="row" sx={{ mt: 1 }} justifyContent="space-between">
            <Button
              variant="contained"
              size="small"
              startIcon={isGroupChatLoading ? <Spinner /> : <CreateGroupIcon />}
              type="submit"
              disabled={isGroupChatLoading}
            >
              Create Group
            </Button>
            <Button
              color="error"
              variant="text"
              size="small"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Close Dialog
            </Button>
          </Stack>
        </form>
      </Box>
      <ToastAlert />
    </Dialog>
  );
};

const styles = {
  container: {
    p: 2,
  },
};

export default CreateGroupChat;
