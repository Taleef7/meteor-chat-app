<script lang="ts">
  import { Meteor } from 'meteor/meteor';
  import { onMount, onDestroy } from 'svelte';
  import { Tracker } from 'meteor/tracker';

  // Import your auth components
  import LoginForm from './components/auth/LoginForm.svelte';
  import RegisterForm from './components/auth/RegisterForm.svelte';

  // Import your new chat components
  import MessageList from './components/chat/MessageList.svelte';
  import MessageInput from './components/chat/MessageInput.svelte';

  // DaisyUI utility components (if you plan to use them for modals, toasts globally from App.svelte)
  // For now, we don't have specific uses for these directly in App.svelte's template,
  // but they might be used by other components or future features.
  // If not used directly by App.svelte template or its direct children, they might not be strictly necessary here.
  // However, DaisyUI components are mostly class-based.
  // import { Modal, Toast, Drawer } from 'daisyui'; // DaisyUI doesn't export Svelte components like this

  let currentUser: Meteor.User | null = null;
  let currentUserId: string | null = null;
  let showLogin: boolean = true;

  let userComputation: Tracker.Computation;

  onMount(() => {
    userComputation = Tracker.autorun(() => {
      currentUser = Meteor.user();
      currentUserId = Meteor.userId();
    });
  });

  onDestroy(() => {
    if (userComputation) {
      userComputation.stop();
    }
  });

  function handleLogout(): void {
    Meteor.logout((error?: Meteor.Error | Meteor.TypedError) => {
      if (error) {
        console.error("Logout error:", (error as Meteor.Error).reason || error.message || error);
        alert(`Logout failed: ${(error as Meteor.Error).reason || error.message || 'Unknown error'}`);
      }
    });
  }
</script>

<div class="min-h-screen flex flex-col bg-base-200">
  <div class="navbar bg-base-300 text-base-content shadow-lg">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost text-xl normal-case">Meteor Chat</a>
    </div>
    <div class="flex-none">
      {#if currentUserId}
        <span class="mr-2 hidden sm:inline">
          Welcome, {currentUser?.username || currentUser?.emails?.[0]?.address || 'User'}!
        </span>
        <button class="btn btn-sm btn-error" on:click={handleLogout}>
          Logout
        </button>
      {:else}
        <a
          class="btn btn-sm btn-ghost"
          href="https://github.com/Taleef7/meteor-chat-app"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      {/if}
    </div>
  </div>

  <main class="flex-grow flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
    {#if currentUserId}
      <div class="card w-full max-w-3xl lg:max-w-4xl bg-base-100 shadow-xl flex flex-col" style="height: calc(100vh - 12rem); max-height: 700px;">
        <div class="p-4 border-b border-base-300">
            <h2 class="text-xl font-semibold text-center text-primary">Global Chat Room</h2>
            </div>

        <MessageList />

        <MessageInput />
      </div>
    {:else}
      <div class="w-full max-w-md">
        {#if showLogin}
          <LoginForm />
          <p class="text-center mt-6">
            Don't have an account?
            <button class="link link-secondary" on:click={() => showLogin = false}>Register here</button>
          </p>
        {:else}
          <RegisterForm />
          <p class="text-center mt-6">
            Already have an account?
            <button class="link link-secondary" on:click={() => showLogin = true}>Login here</button>
          </p>
        {/if}
      </div>
    {/if}
  </main>

  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved by Meteor Chat App</p>
    </aside>
  </footer>
</div>

<style lang="postcss">
  main {
    /* Ensures main content area uses available height if needed */
  }
  /* You might need to adjust the height of the chat card based on navbar/footer heights */
  /* The style attribute on the chat card div is one way to manage its height. */
</style>