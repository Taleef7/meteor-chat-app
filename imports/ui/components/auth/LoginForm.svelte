<script lang="ts">
  import { Meteor } from 'meteor/meteor';

  let userIdentifier: string = ''; // Can be username or email
  let password: string = '';
  let errorMessage: string | null = null;

  function handleLogin(): void {
    errorMessage = null;
    if (!userIdentifier || !password) {
      errorMessage = 'Please fill in all fields.';
      return;
    }

    Meteor.loginWithPassword(userIdentifier, password, (error?: Meteor.Error | Meteor.TypedError) => { // Typed the error
      if (error) {
        errorMessage = (error as Meteor.Error).reason || error.message || 'Unknown error during login.';
      } else {
        // Login successful
        userIdentifier = '';
        password = '';
      }
    });
  }
</script>

<div class="card w-full max-w-md bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-2xl mb-4">Login to Your Account</h2>

    {#if errorMessage}
      <div role="alert" class="alert alert-error mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! {errorMessage}</span>
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin}>
      <div class="form-control">
        <label class="label" for="user-login">
          <span class="label-text">Username or Email</span>
        </label>
        <input type="text" id="user-login" placeholder="Username or Email" class="input input-bordered" bind:value={userIdentifier} />
      </div>
      <div class="form-control mt-4">
        <label class="label" for="password-login">
          <span class="label-text">Password</span>
        </label>
        <input type="password" id="password-login" placeholder="Enter password" class="input input-bordered" bind:value={password} />
      </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</div>