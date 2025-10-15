import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'define' block is the crucial fix for the runtime error.
  // It tells Vite to find the API_KEY variable during the build process on Netlify
  // and replace 'process.env.API_KEY' in your code with its actual string value.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
