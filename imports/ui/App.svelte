<script>
  let message = "Hello from Svelte with DaisyUI & Tailwind CSS!";
  let count = 0;
  function handleClick() { count += 1; }
</script>

<div class="navbar bg-base-200 rounded-box mb-4">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Meteor Chat</a>
    </div>
</div>

/* Apply the custom debug styles */
<div class="p-debug-padding space-y-4 text-center bg-brand-debug">
    <h1 class="text-2xl font-bold mb-6">{message}</h1>
    <p class="mb-4">Clicked {count} {count === 1 ? 'time' : 'times'}</p>
    <button class="btn" on:click={handleClick}>Default Button</button>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-accent">Accent</button>
    <button class="btn btn-ghost">Ghost</button>
    <button class="btn btn-link">Link</button>
    <hr class="my-4"/>
    <button class="btn btn-info btn-sm">Info Small</button>
    <button class="btn btn-success">Success Normal</button>
    <button class="btn btn-warning btn-lg">Warning Large</button>
    <button class="btn btn-error btn-outline">Error Outline</button>
    <hr class="my-4"/>
    <button class="btn btn-primary" disabled>Disabled</button>
    <button class="btn btn-primary btn-active">Active State</button>
    <button class="btn loading">Loading</button>
</div>