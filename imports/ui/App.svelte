<script lang="ts">
  import { Meteor } from 'meteor/meteor';
  import { onMount, onDestroy } from 'svelte';
  import { Tracker } from 'meteor/tracker';

  import LoginForm from './components/auth/LoginForm.svelte';
  import RegisterForm from './components/auth/RegisterForm.svelte';

  // Define a type for User (can be expanded later)
  // Meteor.User includes username?: string; emails?: { address: string; verified: boolean; }[]; etc.
  let currentUser: Meteor.User | null = null;
  let currentUserId: string | null = null;
  let showLogin: boolean = true;

  let userComputation: Tracker.Computation; // Explicitly type Tracker.Computation

  onMount(() => {
    userComputation = Tracker.autorun(() => {
      currentUser = Meteor.user(); // Meteor.user() can return Meteor.User or null
      currentUserId = Meteor.userId(); // Meteor.userId() can return string or null
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

  <main class="flex-grow flex flex-col items-center justify-center p-4 md:p-10">
    {#if currentUserId}
      <div class="card w-full max-w-2xl bg-base-100 shadow-xl p-6 text-center">
        <h2 class="text-2xl font-bold text-primary mb-4">Chat Room</h2>
        <p>The awesome chat interface will go here soon!</p>
        <div class="divider">User Info</div>
        <p class="mt-4 text-sm">Your User ID: {currentUserId}</p>
        {#if currentUser?.emails}
          <p class="text-sm">Your Email: {currentUser.emails[0].address}</p>
        {/if}
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
    /* min-height: calc(100vh - (navbar_height + footer_height)); /* Adjust if needed */
  }
</style>