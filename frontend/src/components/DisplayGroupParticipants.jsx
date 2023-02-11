import React from "react";
import { Grid, Chip, Avatar } from "@mui/material";

const DisplayGroupParticipants = ({ groupParticipants, onDeleteHandler }) => {
  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
      {groupParticipants &&
        groupParticipants.map((user) => (
          <Grid item xs={3} key={user._id}>
            <Chip
              avatar={<Avatar src={user.profilePicture} />}
              key={user._id}
              label={user.name}
              variant="filled"
              color="info"
              onDelete={() => onDeleteHandler(user._id)}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default DisplayGroupParticipants;
