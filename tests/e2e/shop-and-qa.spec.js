import { test, expect } from '@playwright/test';

test('shop page loads and can navigate to categories', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Shop by Category')).toBeVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();
});

test('testing dashboard is protected by login', async ({ page }) => {
  await page.goto('/testing-dashboard');

  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await page.getByPlaceholder('you@example.com').fill('testing@veritex.com');
  await page.getByPlaceholder('••••••••').fill('Testing123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Software Testing Dashboard')).toBeVisible();
});
