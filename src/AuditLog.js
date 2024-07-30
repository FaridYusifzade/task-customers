import React from "react";
import { Container, Typography, List, ListItem } from "@mui/material";

const AuditLog = ({ logs }) => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Audit Logs
      </Typography>
      <List>
        {logs.map((log, index) => (
          <ListItem key={index}>{log}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AuditLog;
