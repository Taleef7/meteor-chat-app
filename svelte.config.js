// svelte.config.js
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */ // The @sveltejs/kit type is a common convention but not strictly needed for just preprocess
const config = {
  preprocess: sveltePreprocess({
    typescript: {
      tsconfigFile: './tsconfig.json',
    },
    postcss: true,
  }),
};

export default config;