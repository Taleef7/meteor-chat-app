<script lang="ts">
  import { Meteor } from 'meteor/meteor';
  import { createEventDispatcher } from 'svelte';

  let messageText: string = '';
  let sending: boolean = false;
  let errorMessage: string | null = null;

  const dispatch = createEventDispatcher();

  async function sendMessage() {
    if (!messageText.trim()) return;

    sending = true;
    errorMessage = null;

    Meteor.call('messages.send', messageText.trim(), (error?: Meteor.Error | Meteor.TypedError) => {
      sending = false;
      if (error) {
        errorMessage = (error as Meteor.Error).reason || error.message || 'Failed to send message.';
        console.error('Error sending message:', errorMessage);
        // Optionally dispatch an error event or show a toast
      } else {
        messageText = ''; // Clear input on success
        dispatch('messagesent'); // Notify parent that message was sent (e.g., for UI updates like focusing input)
      }
    });
  }
</script>

{#if errorMessage}
  <div role="alert" class="alert alert-error text-sm p-2 mt-2 mb-2">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{errorMessage}</span>
    </div>
  </div>
{/if}

<form class="flex items-center space-x-2 p-4 bg-base-100 border-t border-base-300" on:submit|preventDefault={sendMessage}>
  <input
    type="text"
    placeholder="Type a message..."
    class="input input-bordered flex-grow"
    bind:value={messageText}
    disabled={sending}
  />
  <button type="submit" class="btn btn-primary" disabled={sending || !messageText.trim()}>
    {#if sending}
      <span class="loading loading-spinner"></span>
      Sending...
    {:else}
      Send
    {/if}
  </button>
</form>