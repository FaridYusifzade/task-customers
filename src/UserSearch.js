import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserSearch = ({ customers, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = () => {
    const customer = customers.find(
      (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSelectedCustomer(customer);
  };

  const toggleCardVisibility = () => {
    setShowCardNumber(!showCardNumber);
  };

  const handleDelete = () => {
    onDelete(selectedCustomer.cardNumber, cancellationReason);
    setDialogOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Search Customer
      </Typography>
      <TextField
        label="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {selectedCustomer && (
        <div>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <List>
            <ListItem>Name: {selectedCustomer.name}</ListItem>
            <ListItem>Surname: {selectedCustomer.surname}</ListItem>
            <ListItem>Birth Date: {selectedCustomer.birthDate}</ListItem>
            <ListItem>GSM Number: {selectedCustomer.gsmNumber}</ListItem>
            <ListItem>
              Card Number:{" "}
              {showCardNumber
                ? selectedCustomer.cardNumber
                : "**** **** **** ****"}
              <IconButton onClick={toggleCardVisibility}>
                {showCardNumber ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(true)}
          >
            Remove Card
          </Button>
        </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Remove Card</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please provide a cancellation reason:
          </Typography>
          <Select
            fullWidth
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          >
            <MenuItem value="">Select a reason</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
            <MenuItem value="Stolen">Stolen</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {cancellationReason === "Other" && (
            <TextField
              label="Other Reason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            disabled={!cancellationReason}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserSearch;
