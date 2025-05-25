// imports/ui/components/MessageItem.tsx
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material'; // Removed Avatar for now unless you add it
import { blue, grey } from '@mui/material/colors';

export interface Message {
  _id?: string;
  text: string;
  createdAt: Date;
  userId: string;
  username: string;
}

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const align = isCurrentUser ? 'right' : 'left';
  const bubbleColor = isCurrentUser ? blue[500] : grey[300];
  const textColor = isCurrentUser ? 'white' : 'black';

  return (
    // The outer Grid acts as a "row" to justify content
    <Grid container justifyContent={align} sx={{ mb: 1 }}>
      <Grid xs={8} sm={7} md={6}> 
        <Box display="flex" flexDirection="column" alignItems={align}>
          <Typography variant="caption" color="textSecondary" sx={{ mx: 1 }}>
            {message.username} - {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </Typography>
          <Paper
            elevation={2}
            sx={{
              p: 1.5,
              bgcolor: bubbleColor,
              color: textColor,
              borderRadius: isCurrentUser 
                ? '20px 20px 5px 20px' 
                : '20px 20px 20px 5px',
            }}
          >
            <Typography variant="body1" style={{ wordBreak: 'break-word' }}>{message.text}</Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MessageItem;