import { useRouter } from "next/router";
import jwt from 'jsonwebtoken';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const ResetPasswordForm = () => {

  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const onResetPassword = async (event) => {
    event.preventDefault();
    

        const body = {
            Token : token,
            password: newPassword,
        };

        if(newPassword === confirmPassword)
        {
            const response = await fetch(`/api/resetpassword/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const responseData = await response.json();

            if(response.ok)
            {
                setIsSnackbarOpen(true);
                return router.push('/login');
            }
           
            return alert(error);

        }
       
        return alert("password and confirm password are not same");
        
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            borderRadius: theme.shape.borderRadius,
            p: 4,
          }}
        >
          <form method="post" onSubmit={onResetPassword} sx={{ width: '100%' }}>
            {error && (
              <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={error}
              />
            )}
            <Typography variant="h5" color="primary" sx={{ mb: 4 }}>
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Enter your new password below.
            </Typography>
            <TextField
              label="New Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPasswordForm;
