// imports/ui/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';

// Interface to define props for toggling view, if needed from App.tsx
interface RegisterPageProps {
  onToggleView?: () => void; // Optional callback to switch to login view
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onToggleView }) => {
  const [username, setUsername] = useState(''); // Or email, depending on your preference
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    if (!username.trim()) { // Adding a simple validation for username
        setError('Username is required.');
        return;
    }
    if (!email.trim()) {
        setError('Email is required.');
        return;
    }
    if (password.length < 6) { // Example: Meteor's default minimum password length
        setError('Password must be at least 6 characters long.');
        return;
    }

    const userData = {
      username: username, // If you want a separate username
      email: email,
      password: password,
      // You can add profile data here if you like:
      // profile: {
      //   displayName: username, // Or some other display name
      // }
    };

    Accounts.createUser(userData, (err) => {
      if (err) {
        setError(
          // Meteor.Error has 'reason', but generic Error does not
          (err && typeof (err as any).reason === 'string')
            ? (err as any).reason
            : err.message || 'Failed to Register'
        );
      } else {
        // Registration successful! User is automatically logged in.
        console.log('Registration successful!');
        // You might want to redirect to the chat interface or main app view here
        // For now, App.tsx will handle showing the chat interface upon login
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Create Your Account
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <MuiLink href="#" variant="body2" onClick={(e) => {
                e.preventDefault();
                if (onToggleView) {
                  onToggleView();
                }
              }}>
                Already have an account? Login
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;