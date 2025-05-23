/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './imports/ui/**/*.{html,js,svelte,ts}',
    './client/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-debug': '#FF00FF', // A very obvious magenta color
      },
      spacing: {
        'debug-padding': '5rem', // A very large padding
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
    logs: true,
  },
};