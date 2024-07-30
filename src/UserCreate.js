import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const UserCreate = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gsmNumber, setGsmNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const generateCardNumber = () => {
    const newCardNumber = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setCardNumber(newCardNumber);
  };

  const handleCreate = () => {
    onCreate({
      name,
      surname,
      birthDate,
      gsmNumber,
      cardNumber,
    });
    setName("");
    setSurname("");
    setBirthDate("");
    setGsmNumber("");
    setCardNumber("");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create Customer
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Birth Date"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="GSM Number"
        value={gsmNumber}
        onChange={(e) => setGsmNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={generateCardNumber}>
        Generate Card Number
      </Button>
      {cardNumber && (
        <Typography variant="h6" gutterBottom>
          Card Number: {cardNumber}
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreate}
        disabled={!cardNumber}
      >
        Create User
      </Button>
    </Container>
  );
};

export default UserCreate;
