import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e', // Only run tests inside the e2e directory
    use: {
        baseURL: 'http://localhost:4200',
        headless: true,
    },
    webServer: {
        command: 'npm start',
        url: 'http://localhost:4200',
        reuseExistingServer: true, // Uses your active local server if already running
    },
});