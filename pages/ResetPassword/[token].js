import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const onResetPassword = async (event) => {
    event.preventDefault();

    const body = {
      Token: token,
      password: newPassword,
    };

    if (newPassword === confirmPassword) {
      const response = await fetch(`/api/resetpassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();

      if (response.ok) {
        setIsSnackbarOpen(true);
        return router.push("/login");
      }

      return alert(error);
    }

    return alert("password and confirm password are not same");
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

export default ResetPasswordForm;
