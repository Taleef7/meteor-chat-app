// imports/ui/components/MessageItem.tsx
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
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
    <Grid container justifyContent={align} sx={{ mb: 1 }}>
      {/* Corrected Grid sizing prop for MUI v6/v7 */}
      <Grid size={{ xs: 4, sm: 2, md: 1.25 }}> 
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
                ? '20px 25px 3px 20px' 
                : '20px 20px 20px 3px',
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