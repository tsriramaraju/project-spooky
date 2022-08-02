import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  base: 'project-spooky',
  server: {
    host: '0.0.0.0',
  },
});
