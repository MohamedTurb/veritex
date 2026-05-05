import { test, expect } from '@playwright/test';

test('shop page loads and can navigate to categories', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Shop by Category')).toBeVisible();
  await page.getByRole('link', { name: 'Shop', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Shop', exact: true })).toBeVisible();
});

test('testing dashboard is protected by login', async ({ page }) => {
  await page.goto('/testing-dashboard');

  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await page.getByPlaceholder('you@example.com').fill('testing@veritex.com');
  await page.getByPlaceholder('••••••••').fill('Testing123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Software Testing Dashboard')).toBeVisible();
});

test('forgot password flow sends a reset confirmation', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('link', { name: /forgot password/i }).click();
  await expect(page.getByRole('heading', { name: /reset your password/i })).toBeVisible();

  await page.getByPlaceholder('you@example.com').fill('testing@veritex.com');
  await page.getByRole('button', { name: /send reset link/i }).click();

  await expect(page.getByText(/reset link sent/i)).toBeVisible();
});

test('checkout accepts an admin coupon and completes the order', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('veritex_cart', JSON.stringify([
      {
        id: 101,
        title: 'QA Hoodie',
        price: 100,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      },
    ]));
    localStorage.setItem('veritex_admin_offers', JSON.stringify([
      {
        id: 'OFR-QA',
        code: 'SAVE10',
        discount: 10,
        active: true,
        expiresAt: '2026-12-31',
      },
    ]));
  });

  await page.goto('/checkout');

  await page.getByPlaceholder('John').fill('John');
  await page.getByPlaceholder('Doe').fill('Doe');
  await page.getByPlaceholder('john@example.com').fill('john@example.com');
  await page.getByPlaceholder('+1 (555) 000-0000').fill('+1 (555) 123-4567');
  await page.getByPlaceholder('123 Main Street').fill('123 Main Street');
  await page.getByPlaceholder('New York').fill('New York');
  await page.getByPlaceholder('10001').fill('10001');
  await page.getByPlaceholder('NY').fill('NY');
  await page.getByRole('button', { name: /continue to payment/i }).click();

  await page.getByPlaceholder('SUMMER15').fill('SAVE10');
  await page.getByRole('button', { name: /apply code/i }).click();

  await expect(page.getByText(/applied: save10/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /pay egp 99.00/i })).toBeVisible();

  await page.getByPlaceholder('John Doe').fill('John Doe');
  await page.getByPlaceholder('1234 5678 9012 3456').fill('4111 1111 1111 1111');
  await page.getByPlaceholder('MM/YY').fill('12/29');
  await page.getByPlaceholder('123').fill('123');
  await page.getByRole('button', { name: /pay egp 99.00/i }).click();

  await expect(page.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
});
