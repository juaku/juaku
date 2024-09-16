import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/NewAppScreen': 'react-native-web/dist/exports/NewAppScreen'
    }
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});