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

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const onForgotPassword = async (event) => {
    event.preventDefault();

    const body = {
      email: email,
    };


    const response = await fetch(`/api/forgetpassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();

    if (response.ok) {
      return alert('reset link sent');
    }

    return alert(error);
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
          <form method="post" onSubmit={onForgotPassword} sx={{ width: '100%' }}>
            {error && (
              <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={error}
              />
            )}
            <Typography variant="h5" color="primary" sx={{ mb: 4 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Please use the email address that you used to{' '}
              <a href="/new-user">create your user</a>.
            </Typography>
            <TextField
              label="Email Address"
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPasswordForm;
