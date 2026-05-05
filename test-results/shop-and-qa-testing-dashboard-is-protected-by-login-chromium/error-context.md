# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shop-and-qa.spec.js >> testing dashboard is protected by login
- Location: tests\e2e\shop-and-qa.spec.js:11:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5174/testing-dashboard
Call log:
  - navigating to "http://127.0.0.1:5174/testing-dashboard", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('shop page loads and can navigate to categories', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
  6  |   await expect(page.getByText('Shop by Category')).toBeVisible();
  7  |   await page.getByRole('link', { name: 'Shop', exact: true }).click();
  8  |   await expect(page.getByRole('heading', { name: 'Shop', exact: true })).toBeVisible();
  9  | });
  10 | 
  11 | test('testing dashboard is protected by login', async ({ page }) => {
> 12 |   await page.goto('/testing-dashboard');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5174/testing-dashboard
  13 | 
  14 |   await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  15 |   await page.getByPlaceholder('you@example.com').fill('testing@veritex.com');
  16 |   await page.getByPlaceholder('••••••••').fill('Testing123');
  17 |   await page.getByRole('button', { name: 'Sign In' }).click();
  18 |   await expect(page.getByText('Software Testing Dashboard')).toBeVisible();
  19 | });
  20 | 
  21 | test('forgot password flow sends a reset confirmation', async ({ page }) => {
  22 |   await page.goto('/login');
  23 | 
  24 |   await page.getByRole('link', { name: /forgot password/i }).click();
  25 |   await expect(page.getByRole('heading', { name: /reset your password/i })).toBeVisible();
  26 | 
  27 |   await page.getByPlaceholder('you@example.com').fill('testing@veritex.com');
  28 |   await page.getByRole('button', { name: /send reset link/i }).click();
  29 | 
  30 |   await expect(page.getByText(/reset link sent/i)).toBeVisible();
  31 | });
  32 | 
  33 | test('checkout accepts an admin coupon and completes the order', async ({ page }) => {
  34 |   await page.addInitScript(() => {
  35 |     localStorage.setItem('veritex_cart', JSON.stringify([
  36 |       {
  37 |         id: 101,
  38 |         title: 'QA Hoodie',
  39 |         price: 100,
  40 |         quantity: 1,
  41 |         image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  42 |       },
  43 |     ]));
  44 |     localStorage.setItem('veritex_admin_offers', JSON.stringify([
  45 |       {
  46 |         id: 'OFR-QA',
  47 |         code: 'SAVE10',
  48 |         discount: 10,
  49 |         active: true,
  50 |         expiresAt: '2026-12-31',
  51 |       },
  52 |     ]));
  53 |   });
  54 | 
  55 |   await page.goto('/checkout');
  56 | 
  57 |   await page.getByPlaceholder('John').fill('John');
  58 |   await page.getByPlaceholder('Doe').fill('Doe');
  59 |   await page.getByPlaceholder('john@example.com').fill('john@example.com');
  60 |   await page.getByPlaceholder('+1 (555) 000-0000').fill('+1 (555) 123-4567');
  61 |   await page.getByPlaceholder('123 Main Street').fill('123 Main Street');
  62 |   await page.getByPlaceholder('New York').fill('New York');
  63 |   await page.getByPlaceholder('10001').fill('10001');
  64 |   await page.getByPlaceholder('NY').fill('NY');
  65 |   await page.getByRole('button', { name: /continue to payment/i }).click();
  66 | 
  67 |   await page.getByPlaceholder('SUMMER15').fill('SAVE10');
  68 |   await page.getByRole('button', { name: /apply code/i }).click();
  69 | 
  70 |   await expect(page.getByText(/applied: save10/i)).toBeVisible();
  71 |   await expect(page.getByRole('button', { name: /pay egp 99.00/i })).toBeVisible();
  72 | 
  73 |   await page.getByPlaceholder('John Doe').fill('John Doe');
  74 |   await page.getByPlaceholder('1234 5678 9012 3456').fill('4111 1111 1111 1111');
  75 |   await page.getByPlaceholder('MM/YY').fill('12/29');
  76 |   await page.getByPlaceholder('123').fill('123');
  77 |   await page.getByRole('button', { name: /pay egp 99.00/i }).click();
  78 | 
  79 |   await expect(page.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
  80 | });
  81 | 
```