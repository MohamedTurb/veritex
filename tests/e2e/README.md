# End-to-End Tests

This directory contains Playwright E2E tests for Veritex.

## Files

- `shop-and-qa.spec.js` - Core user flow tests
- `accessibility.spec.js` - Accessibility and performance tests
- `security.spec.js` - Security and data validation tests

## Running Tests

```bash
# Headless mode (all browsers)
npm run e2e

# Interactive UI
npm run e2e:ui

# Debug mode
npm run e2e:debug

# View HTML report
npm run e2e:report
```

## Test Coverage

### User Flows
- Shop page navigation
- Product browsing
- Cart management
- Checkout process
- Login/Authentication

### Accessibility
- Keyboard navigation
- ARIA labels
- Color contrast
- Screen reader support

### Performance
- Page load time
- Image optimization
- Network efficiency

### Security
- Data protection
- Form validation
- Authentication

## Writing E2E Tests

```javascript
import { test, expect } from '@playwright/test';

test('user can add product to cart', async ({ page }) => {
  await page.goto('/shop');
  await page.click('button:has-text("Add to Cart")');
  await expect(page.locator('.cart-counter')).toContainText('1');
});
```

## Multi-Browser Testing

Tests run on:
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Safari)
- Mobile Chrome (Pixel 5)

## CI/CD Integration

Tests run automatically on:
- Push to main/master/develop
- Pull requests
- Results: HTML reports, screenshots, videos

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
