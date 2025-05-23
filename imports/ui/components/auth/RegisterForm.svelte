<script lang="ts">
  import { Meteor } from 'meteor/meteor'; // Will use Meteor types
  import { Accounts } from 'meteor/accounts-base';

  let email: string = '';
  let password: string = '';
  let username: string = '';
  let errorMessage: string | null = null; // Can be string or null
  let successMessage: string | null = null;

  function handleRegister(): void {
    errorMessage = null;
    successMessage = null;
    if (!email || !password || !username) {
      errorMessage = 'Please fill in all fields.';
      return;
    }

    const options = {
      username: username,
      email: email,
      password: password,
    };

    Accounts.createUser(options, (error?: Meteor.Error | Meteor.TypedError) => { // Typed the error
      if (error) {
        errorMessage = (error as Meteor.Error).reason || error.message || 'Unknown error during registration.';
      } else {
        successMessage = 'Registration successful! You are now logged in.';
        email = '';
        password = '';
        username = '';
      }
    });
  }
</script>

<div class="card w-full max-w-md bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-2xl mb-4">Register New Account</h2>

    {#if errorMessage}
      <div role="alert" class="alert alert-error mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! {errorMessage}</span>
      </div>
    {/if}

    {#if successMessage}
      <div role="alert" class="alert alert-success mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Success! {successMessage}</span>
      </div>
    {/if}

    <form on:submit|preventDefault={handleRegister}>
      <div class="form-control">
        <label class="label" for="username-register">
          <span class="label-text">Username</span>
        </label>
        <input type="text" id="username-register" placeholder="Choose a username" class="input input-bordered" bind:value={username} />
      </div>
      <div class="form-control mt-4">
        <label class="label" for="email-register">
          <span class="label-text">Email</span>
        </label>
        <input type="email" id="email-register" placeholder="your@email.com" class="input input-bordered" bind:value={email} />
      </div>
      <div class="form-control mt-4">
        <label class="label" for="password-register">
          <span class="label-text">Password</span>
        </label>
        <input type="password" id="password-register" placeholder="Enter password" class="input input-bordered" bind:value={password} />
      </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</div>