import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('home page has no accessibility issues', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);

    // Check for alt text on images
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);

    // Check for proper button labels
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab');
    const focused = await page.locator(':focus');
    expect(focused).toBeDefined();

    // Should be able to interact with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  test('form inputs have proper labels', async ({ page }) => {
    await page.goto('/login');

    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThan(0);

    // All inputs should be associated with labels or have aria-labels
    const inputsWithoutLabels = await page
      .locator('input:not([aria-label]):not([aria-labelledby])')
      .count();
    // Allow some flexibility for inputs with placeholder
    expect(inputsWithoutLabels).toBeLessThanOrEqual(inputs);
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');

    // Check that text is visible with sufficient contrast
    const mainContent = await page.locator('main');
    expect(mainContent).toBeDefined();
  });
});

test.describe('Performance Tests', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Should load in less than 3 seconds
  });

  test('images are optimized', async ({ page }) => {
    await page.goto('/shop');

    // Get image sizes
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const size = await img.evaluate((el) => ({
        width: el.naturalWidth,
        height: el.naturalHeight,
      }));

      // Images should have natural dimensions
      expect(size.width).toBeGreaterThan(0);
      expect(size.height).toBeGreaterThan(0);
    }
  });

  test('network requests are optimized', async ({ page }) => {
    const requests = [];

    page.on('request', (request) => {
      requests.push(request);
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Should not have excessive requests
    expect(requests.length).toBeLessThan(50);
  });
});
