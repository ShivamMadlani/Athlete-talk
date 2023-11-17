import React, { useState } from "react";
import { Box, Typography, Input, Button, FormLabel } from "@mui/joy";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Password form submitted with password:", password);
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
          <Typography
            level="title-lg"
            color="primary"
            textAlign="center"
            mb="20px"
          >
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormLabel>New Password</FormLabel>
            <Input
              placeholder="New Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              sx={{ mb: "20px" }}
              required
            />
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              sx={{ mb: "20px" }}
              required
            />
            <Button type="submit" sx={{ width: "100%" }}>
              Update Password
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default ResetPassword;
