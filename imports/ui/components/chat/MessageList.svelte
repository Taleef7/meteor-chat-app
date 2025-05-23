<script lang="ts">
  import { Meteor } from 'meteor/meteor';
  import { MessagesCollection, type Message } from '/imports/api/collections/messages';
  import { onMount, onDestroy, afterUpdate, tick } from 'svelte'; // Added tick
  import MessageItem from './MessageItem.svelte';

  let messages: Message[] = [];
  let messageContainer: HTMLDivElement | null = null; // Initialize as null
  let subscriptionHandle: Meteor.SubscriptionHandle | null = null;
  let shouldScrollToBottom = true; // Flag to control auto-scroll

  onMount(() => {
    subscriptionHandle = Meteor.subscribe('messages.all', {
      onReady: async () => { // Make onReady async if needed
        console.log('Messages subscription ready.');
        // Initial scroll to bottom after a tick to ensure DOM is ready
        await tick(); // Wait for DOM updates
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      },
      onError: (error: Meteor.Error) => {
        console.error('Messages subscription error:', error);
      },
    });

    const cursor = MessagesCollection.find({}, { sort: { createdAt: 1 } });
    const computation = cursor.observeChanges({
      added: (id, fields) => {
        if (messageContainer && typeof messageContainer.scrollHeight === 'number') {
          const threshold = 50; // Pixels from bottom
          // Only set shouldScrollToBottom if user is already near the bottom
          shouldScrollToBottom = messageContainer.scrollHeight - messageContainer.scrollTop - messageContainer.clientHeight < threshold;
        } else {
          // If container isn't ready, assume we should scroll when it is
          shouldScrollToBottom = true;
        }
        messages = [...messages, { _id: id, ...fields } as Message];
      },
    });

    return () => {
      if (subscriptionHandle) {
        subscriptionHandle.stop();
      }
      computation.stop();
    };
  });

  // afterUpdate is called after the DOM has been updated
  afterUpdate(async () => {
    if (shouldScrollToBottom && messageContainer && typeof messageContainer.scrollHeight === 'number') {
      await tick(); // Ensure DOM is fully painted after message addition
      messageContainer.scrollTop = messageContainer.scrollHeight;
      shouldScrollToBottom = false; // Reset flag until next new message determines otherwise
    }
  });
</script>

<div
  class="flex-grow overflow-y-auto p-4 space-y-4 bg-base-200 rounded-lg shadow"
  bind:this={messageContainer}
>
  {#if messages.length === 0}
    <p class="text-center text-gray-500">No messages yet. Start the conversation!</p>
  {/if}
  {#each messages as message (message._id)}
    <MessageItem {message} />
  {/each}
</div>