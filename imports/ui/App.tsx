// imports/ui/App.tsx
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; // Import useTracker
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import { Typography, Box, Button } from '@mui/material'; // For the chat page placeholder

const theme = createTheme({
  palette: {
    mode: 'light', // Or 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Placeholder for your main chat interface
const ChatInterface: React.FC = () => {
  const user = useTracker(() => Meteor.user());
  const handleLogout = () => Meteor.logout();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Welcome to the Chat, {user?.username || user?.emails?.[0]?.address}!</Typography>
      <Button variant="outlined" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
      {/* Chat messages and input will go here */}
    </Box>
  );
};


const App: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  
  // Use useTracker to reactively get the current user
  const user = useTracker(() => Meteor.user());
  const isLoadingUser = useTracker(() => Meteor.loggingIn() || !Meteor.userId() && !Meteor.user());


  const toggleView = () => {
    setShowRegister(!showRegister);
  };

  // If user data is still loading, you might want to show a loading spinner
  // For simplicity, we'll just rely on the user object being null/defined.
  // A more robust loading state would check Meteor.loggingIn()

  if (user) {
    // If user is logged in, show the main chat interface
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatInterface /> {/* Replace with your actual chat page later */}
      </ThemeProvider>
    );
  }

  // If no user, show Login or Register page
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showRegister ? (
        <RegisterPage onToggleView={toggleView} />
      ) : (
        <LoginPage onToggleView={toggleView} /> 
        // We need to add onToggleView to LoginPage props too
      )}
    </ThemeProvider>
  );
};

export default App;