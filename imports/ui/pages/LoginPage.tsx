// imports/ui/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
// You might want to use a router later, but for now, let's handle display via App.tsx state
// import { Link as RouterLink } from 'react-router-dom'; // Example if using react-router
// Add the prop to the interface
interface LoginPageProps {
  onToggleView?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(
          // Meteor.Error has 'reason', but generic Error does not
          (err && typeof (err as any).reason === 'string')
            ? (err as any).reason
            : err.message || 'Failed to login'
        );
      } else {
        // Login successful, you might redirect or update UI state
        console.log('Login successful!');
        // For now, we'll just log; routing/state update will come later
      }
    });
  };

  // Basic styling using Box for centering (more advanced styling can be done)
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
          Login to Your Account
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username or Email"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
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
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <MuiLink href="#" variant="body2" onClick={(e) => {
                    e.preventDefault();
                    if (onToggleView) { // Use the passed prop
                    onToggleView();
                    }
                }}>
                    Don't have an account? Register here
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {'Copyright © '}
        Meteor Chat App {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
};

export default LoginPage;