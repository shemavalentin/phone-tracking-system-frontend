// src/components/common/Notification.js
import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Notification = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={severity === "success" ? 4000 : 3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          borderRadius: "8px",
          alignItems: "center",
          fontSize: "0.95rem",
          boxShadow: 3,
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
