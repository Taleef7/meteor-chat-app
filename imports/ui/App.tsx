// imports/ui/App.tsx
import React from 'react';
import { Typography, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// A basic MUI theme (you can customize this much more later)
const theme = createTheme({
  palette: {
    mode: 'light', // Or 'dark'
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies baseline MUI styles and dark/light mode background */}
      <Container maxWidth="sm"> {/* Optional: centers content */}
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Meteor Chat (React + MUI)!
        </Typography>
        {/* We will build out the login form and chat interface here later */}
      </Container>
    </ThemeProvider>
  );
};

export default App;