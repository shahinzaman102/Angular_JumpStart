import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// 1. List all public routes in your Angular application
const routesToTest = [
    '/no-wai-aria',
    '/wai-aria',
];

test.describe('Accessibility Audits across all routes', () => {
    for (const route of routesToTest) {
        test(`accessibility scan for ${route}`, async ({ page }) => {
            // Navigate to each route
            await page.goto(route);

            // Optional: Wait for Angular network/rendering to settle
            await page.waitForLoadState('networkidle');

            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    }
});