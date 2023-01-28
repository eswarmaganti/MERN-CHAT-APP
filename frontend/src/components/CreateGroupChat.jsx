import React, { useState } from "react";
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
} from "@mui/material";
import {
  GroupAddRounded as CreateGroupIcon,
  CloseRounded as CloseIcon,
  PersonAddRounded as PersonAddIcon,
} from "@mui/icons-material";
import UserInfo from "./Utils/UserInfo";
import { useLazySearchUsersQuery } from "../app/services/authApi";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

const CreateGroupChat = ({ open, handleClose }) => {
  // selectiong the user info from redux store
  const { user } = useSelector((state) => state.chatAppUserInfo);

  const [groupParticipents, setGroupParticipents] = useState([]);

  const [showSearchResults, setShowSearchResults] = useState(false);

  // RTK Query to trigger the user search
  const [trigger, { data: searchUsers, isLoading, isError }] =
    useLazySearchUsersQuery();

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

  const onSearchUsers = (e) => {
    if (e.target.value) {
      setShowSearchResults(true);
      trigger({ searchText: e.target.value.trim(), token: user.token });
    } else {
      setShowSearchResults(false);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <Box sx={styles.container}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: "500" }}>
          Create Group Chat
        </Typography>
        <form>
          <TextField
            name="name"
            label="Chat Group Name"
            fullWidth
            variant="filled"
            margin="dense"
            size="small"
          />
        </form>
        <TextField
          label="Search Users"
          fullWidth
          margin="dense"
          variant="filled"
          size="small"
          onChange={onSearchUsers}
        />
        <SelectedGroupUsers
          removeParticipents={removeParticipents}
          groupParticipents={groupParticipents}
        />

        <SearchResultsPanel
          users={searchUsers}
          addParticipents={addParticipents}
          showSearchResults={showSearchResults}
          setShowSearchResults={setShowSearchResults}
        />

        <Stack direction="row" sx={{ mt: 1 }} justifyContent="space-between">
          <Button
            variant="contained"
            size="small"
            startIcon={<CreateGroupIcon />}
          >
            Create Group
          </Button>
          <Button
            color="error"
            variant="contained"
            size="small"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

const SearchResultsPanel = ({
  users,
  addParticipents,
  showSearchResults,
  setShowSearchResults,
}) => {
  return (
    <>
      {showSearchResults && (
        <Box
          sx={{
            backgroundColor: grey[200],
            borderRadius: "1rem",
            p: 0.5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            color="error"
            variant="text"
            size="small"
            startIcon={<CloseIcon />}
            sx={{ alignSelf: "flex-end" }}
            onClick={() => setShowSearchResults(false)}
          >
            Close
          </Button>
          <Box sx={{ maxHeight: "150px", overflow: "auto" }}>
            {users &&
              users.map((user) => (
                <Stack
                  key={user._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: grey[100],
                    },
                    borderBottom: `1px solid ${grey[300]}`,
                    "&:last-child": {
                      borderBottom: `none`,
                    },

                    cursor: "pointer",
                  }}
                  direction="row"
                  alignItems="center"
                >
                  <UserInfo user={user} />
                  <IconButton
                    color="primary"
                    onClick={() => addParticipents(user)}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Stack>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
};

const SelectedGroupUsers = ({ removeParticipents, groupParticipents }) => {
  return (
    <Grid container sx={{ my: 1 }}>
      {groupParticipents.map((item) => (
        <Grid item xs={3} sx={{ mb: 1 }} key={item._id}>
          <Chip
            label={item.name}
            variant="filled"
            color="info"
            onDelete={() => removeParticipents(item._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const styles = {
  container: {
    p: 2,
  },
};

export default CreateGroupChat;
