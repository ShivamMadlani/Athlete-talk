import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  FormLabel,
} from "@mui/joy";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password form submitted for email:", email);
  };

  const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  };

  const formContainerStyle = {
    width: "500px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={pageContainerStyle}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={formContainerStyle}>
          <Typography level="title-lg" color="primary" textAlign="center" mb="20px">
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleChange}
              sx={{ mb: "20px" }}
              required
            />
            <Button type="submit" sx={{ width: "100%" }}>
              Reset Password
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default ForgotPassword;
