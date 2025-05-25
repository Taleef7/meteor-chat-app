// imports/ui/App.tsx
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; // Import useTracker
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import ChatPage from './pages/ChatPage'; // <--- Import ChatPage
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
  const user = useTracker(() => Meteor.user());
  // const isLoadingUser = useTracker(() => Meteor.loggingIn() || (!Meteor.userId() && !Meteor.user()) ); // More robust loading

  const toggleView = () => {
    setShowRegister(!showRegister);
  };

  // You might want a more sophisticated loading indicator here
  // if (isLoadingUser && !user) { 
  //   return <Typography>Loading...</Typography>; // Or a spinner
  // }

  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatPage /> {/* <--- Use ChatPage here */}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showRegister ? (
        <RegisterPage onToggleView={toggleView} />
      ) : (
        <LoginPage onToggleView={toggleView} />
      )}
    </ThemeProvider>
  );
};

export default App;