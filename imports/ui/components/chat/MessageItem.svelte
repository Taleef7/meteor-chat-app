<script lang="ts">
  import type { Message } from '/imports/api/collections/messages'; // Import the Message interface
  import { Meteor } from 'meteor/meteor'; // For checking current user

  export let message: Message;

  // Determine if the current user sent this message
  $: isCurrentUser = message.userId === Meteor.userId();

  // Format the timestamp
  $: formattedTimestamp = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'sending...';
</script>

<div class="chat {isCurrentUser ? 'chat-end' : 'chat-start'}">
  <div class="chat-header">
    {message.username}
    <time class="text-xs opacity-50 ml-1">{formattedTimestamp}</time>
  </div>
  <div class="chat-bubble {isCurrentUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
    {message.text}
  </div>
  </div>