import React from "react";
import { Stack, Typography } from "@mui/material";
import { QuestionAnswerRounded as ChatLogoIcon } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

const AppLogo = () => {
  return (
    <Stack direction="row" gap={1}>
      <ChatLogoIcon fontSize="large" sx={{ color: indigo[600] }} />
      <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
        Talk Chat
      </Typography>
    </Stack>
  );
};

export default AppLogo;
