import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import UserCreate from "./UserCreate";
import UserSearch from "./UserSearch";
import AuditLog from "./AuditLog";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [logs, setLogs] = useState([]);

  const handleCreateCustomer = (customer) => {
    setCustomers([...customers, customer]);
    setLogs([...logs, `Created customer: ${customer.name}`]);
  };

  const handleDeleteCard = (cardNumber, reason) => {
    setCustomers(customers.filter((c) => c.cardNumber !== cardNumber));
    setLogs([...logs, `Deleted card ${cardNumber} due to: ${reason}`]);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Button color="inherit" component={Link} to="/">
            User Create
          </Button>
          <Button color="inherit" component={Link} to="/search">
            Search User
          </Button>
          <Button color="inherit" component={Link} to="/logs">
            Audit Logs
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={<UserCreate onCreate={handleCreateCustomer} />}
          />
          <Route
            path="/search"
            element={
              <UserSearch customers={customers} onDelete={handleDeleteCard} />
            }
          />
          <Route path="/logs" element={<AuditLog logs={logs} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
