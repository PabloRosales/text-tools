import { test, expect } from '@playwright/test';
import CONFIG from '../../sites/text-tools/config';

test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('h1');
  await expect(title).toHaveText(CONFIG.appName);
});
