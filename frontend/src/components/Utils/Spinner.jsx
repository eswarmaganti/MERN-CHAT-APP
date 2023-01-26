import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = ({ color }) => {
  return <CircularProgress size={24} sx={{ color }} />;
};

Spinner.defaultProps = {
  color: "white",
};

export default Spinner;
