import { React } from "react";
import { Box, Button, Stack, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CloseRounded as CloseIcon } from "@mui/icons-material";

import UserInfo from "./Utils/UserInfo";

const SearchUserResultsPanel = ({
  users,
  handleAction,
  showSearchResults,
  setShowSearchResults,
  actionIcon,
}) => {
  if (users && users.length > 0 && showSearchResults) {
    return (
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
        <Box sx={{ height: "100%", maxHeight: "150px", overflow: "auto" }}>
          {users.map((user) => (
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
              <IconButton color="primary" onClick={() => handleAction(user)}>
                {actionIcon}
              </IconButton>
            </Stack>
          ))}
        </Box>
      </Box>
    );
  }
};

export default SearchUserResultsPanel;
