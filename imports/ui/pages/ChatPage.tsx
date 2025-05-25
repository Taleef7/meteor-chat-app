// imports/ui/pages/ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { 
  Box, Typography, TextField, Button, Paper, List, CircularProgress, 
  AppBar, Toolbar, IconButton 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageItem, { Message } from '../components/MessageItem';
import { MessagesCollection } from '../../../imports/api/collections/messages'; // Adjust path if needed

const ChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // --- Enhanced useTracker with detailed logging ---
  const trackerData = useTracker(() => {
    const currentUser = Meteor.user();
    console.log('[ChatPage Tracker] Hook triggered. Current User ID:', currentUser?._id);

    if (!currentUser) {
      console.log('[ChatPage Tracker] No current user found by Meteor.user(). This should not happen if App.tsx gates this component.');
      return { user: null, messages: [], isLoading: true, publicationReady: false, errorSubscribing: false };
    }

    console.log('[ChatPage Tracker] Subscribing to "allMessages"...');
    const handler = Meteor.subscribe('messages.all', {
      onStop: (error:"string") => {
        if (error) {
          console.error('[ChatPage Tracker] Subscription "allMessages" stopped with error:', error);
          // We might want to set an error state here
        } else {
          // console.log('[ChatPage Tracker] Subscription "allMessages" stopped without error (e.g., component unmount).');
        }
      }
    });
    
    const isPublicationReady = handler.ready();
    console.log('[ChatPage Tracker] Publication "allMessages" ready status:', isPublicationReady);

    let fetchedMessages: Message[] = [];
    if (isPublicationReady) {
      fetchedMessages = MessagesCollection.find({}, { sort: { createdAt: 1 } }).fetch() as Message[];
      console.log('[ChatPage Tracker] Fetched Messages Count:', fetchedMessages.length);
      // console.log('[ChatPage Tracker] Fetched Messages Sample:', fetchedMessages.slice(0, 2)); // Log first 2 messages
    }
    
    return { 
      user: currentUser, 
      messages: fetchedMessages, 
      isLoading: !isPublicationReady, // isLoading is true if publication is NOT ready
      publicationReady: isPublicationReady, // For direct checking
      errorSubscribing: handler.subscriptionId && !isPublicationReady && Meteor.status().status !== 'connected' // Basic check
    };
  }, []); // Empty dependency array: runs on mount & reactive Meteor changes

  const { user, messages, isLoading, publicationReady, errorSubscribing } = trackerData;

  // --- Logging for render cycle ---
  console.log(`[ChatPage Render] isLoading: ${isLoading}, publicationReady: ${publicationReady}, Messages count: ${messages.length}, User: ${user?.username}, ErrorSubscribing: ${errorSubscribing}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isLoading && messages.length > 0) { // Only scroll if not loading and there are messages
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newMessage.trim() || !user) return;

    Meteor.call('messages.send', newMessage, (error?: Meteor.Error | null) => {
      if (error) {
        console.error('Message send failed:', error.reason);
        alert(`Error sending message: ${error.reason}`); // Simple alert for user feedback
      } else {
        setNewMessage('');
      }
    });
  };

  const handleLogout = () => {
    Meteor.logout((err?: Error) => {
        if (err) {
            console.error('Logout failed: ', err.message);
        }
        // App.tsx will react to Meteor.user() becoming null
    });
  };

  // --- Render Logic ---
  if (errorSubscribing) {
    return (
       <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error connecting to the server or subscription failed.</Typography>
        <Typography color="error">Please check your connection or server logs.</Typography>
      </Box>
    )
  }
  
  if (isLoading) { 
    console.log('[ChatPage Render] Showing loading spinner.');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading messages...</Typography>
      </Box>
    );
  }
  
  console.log('[ChatPage Render] Rendering main chat interface.');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'grey.100' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meteor Chat - ({user?.username || user?.emails?.[0]?.address})
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{mt: 2}}>
                No messages yet. Be the first to say hello!
            </Typography>
        )}
        <List>
          {messages.map((msg) => (
            <MessageItem key={msg._id} message={msg} isCurrentUser={msg.userId === user?._id} />
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Paper component="form" onSubmit={handleSendMessage} elevation={6} sx={{ p: '10px 15px', display: 'flex', alignItems: 'center', borderTop: '1px solid #ddd' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ mr: 1, bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatPage;