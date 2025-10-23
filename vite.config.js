
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages at https://<user>.github.io/<repo>/,
// set base to '/<repo>/' (replace <repo> with your repository name).
// Example: base: '/react-memory-match/'
export default defineConfig({
  plugins: [react()],
  base: ''
})
