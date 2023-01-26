import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ToastAlert = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={open}
      onClose={() => onClose(!open)}
      autoHideDuration={5000}
    >
      <Alert
        elevation={4}
        onClose={() => onClose(!open)}
        sx={{ width: "100%" }}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ToastAlert.defaultProps = {
  severity: "error",
  open: true,
  onClose: () => {},
};

export default ToastAlert;
