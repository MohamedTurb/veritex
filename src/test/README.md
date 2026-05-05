# Test Files Documentation

This directory contains all test files for the Veritex project.

## Directory Structure

```
src/test/
├── a11y/                    # Accessibility (A11y) tests
│   ├── productCard.a11y.test.jsx
│   ├── navbar.a11y.test.jsx
│   └── checkout.a11y.test.jsx
├── performance/             # Performance tests
│   └── home-page.perf.test.jsx
├── mocks/                   # Mock Service Worker (MSW) setup
│   ├── server.js           # MSW server configuration
│   └── handlers.js         # API request handlers
├── setupTests.js           # Vitest global setup
├── test-utils.jsx          # Custom test utilities
├── performance-utils.js    # Performance measurement utilities
├── auth-flow.test.jsx      # Authentication tests
├── cartContext.test.jsx    # Cart context tests
├── checkout-flow.test.jsx  # Checkout flow tests
├── admin-dashboard.test.jsx # Admin dashboard tests
├── app.integration.test.jsx # Full app integration tests
└── productGrid.test.jsx    # Product grid tests
```

## Running Tests

### All Tests
```bash
npm run test:all
```

### Unit & Integration Tests
```bash
npm run test              # Run once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

### Accessibility Tests (A11y)
```bash
npm run test:a11y
```

Tests WCAG compliance and accessibility standards.

### Coverage Reports
Generated in `coverage/` directory:
- `coverage/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format for CI
- `coverage/coverage-summary.json` - JSON summary

## Test Coverage Standards

Minimum coverage targets (70%):
- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

## Writing Tests

### Using test-utils.jsx

```javascript
import { render, screen } from '../test-utils.jsx';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no a11y violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Performance Testing

```javascript
import { getPageMetrics } from '../performance-utils';

it('should load quickly', () => {
  const metrics = getPageMetrics();
  expect(metrics.domContentLoaded).toBeLessThan(1000);
});
```

### Mocking API Calls

The project uses Mock Service Worker (MSW) for API mocking.

```javascript
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

it('should fetch user data', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json({ id: '1', name: 'Test User' });
    })
  );

  // Your test code here
});
```

## Best Practices

1. **Write tests for new features** - Aim for 70%+ coverage
2. **Use descriptive test names** - Clearly describe what is being tested
3. **Keep tests focused** - One assertion per test when possible
4. **Mock external dependencies** - Use MSW for API calls
5. **Test user behavior** - Use @testing-library/react patterns
6. **Clean up after tests** - Clear localStorage, reset mocks
7. **Test accessibility** - Include A11y tests for components
8. **Consider edge cases** - Test error states and edge cases

## Integration with CI/CD

Tests are automatically run on:
- Every push to main/master/develop branches
- Every pull request
- Results uploaded to GitHub artifacts
- Coverage uploaded to Codecov

## Debugging Tests

### Run single test file
```bash
npm run test -- productGrid.test.jsx
```

### Run tests matching pattern
```bash
npm run test -- --grep "cart"
```

### Debug in VS Code
- Set breakpoint in test file
- Run with debugger:
```bash
node --inspect-brk ./node_modules/.bin/vitest run
```

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Mock Service Worker](https://mswjs.io)
