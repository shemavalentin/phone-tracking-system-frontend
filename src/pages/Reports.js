import React from "react";
import { Container, Typography, Button } from "@mui/material";

const Reports = ({ showNotification }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => showNotification("Reports feature coming soon!", "info")}
      >
        Show Notification
      </Button>
    </Container>
  );
};

export default Reports;
