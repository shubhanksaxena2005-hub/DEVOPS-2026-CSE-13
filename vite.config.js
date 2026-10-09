import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    css: true,
    // Only run the app's own tests (ignore copies like ./agrisathi/)
    include: ['src/**/*.test.{js,jsx}'],
    // Console output for humans + JUnit XML that Jenkins reads for test reports
    reporters: ['default', 'junit'],
    outputFile: { junit: 'reports/junit.xml' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/setupTests.js', 'src/main.jsx'],
      // text-summary -> Jenkins console, cobertura -> machine-readable, html -> archived report
      reporter: ['text-summary', 'cobertura', 'html'],
      reportsDirectory: 'reports/coverage',
    },
  },
})
