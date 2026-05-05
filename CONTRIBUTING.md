# Contributing to Veritex

Thank you for your interest in contributing to Veritex! We welcome contributions from the community and appreciate your help in making this project better.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/veritex.git
   cd veritex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Workflow

### Code Style

We use ESLint and Prettier to maintain consistent code style.

```bash
# Check for linting issues
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Before Committing

Always run the full test suite before committing:

```bash
npm run test:all
```

This runs:
- ESLint checks
- Prettier formatting
- Unit tests with coverage
- Accessibility tests

### Testing Guidelines

- Write tests for all new features
- Update tests when modifying existing features
- Ensure all tests pass locally before pushing

**Test coverage targets:**
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# With coverage report
npm run test:coverage

# Accessibility tests
npm run test:a11y

# End-to-end tests
npm run e2e
npm run e2e:ui

# All testing tools
npm run test:all-tools
```

## Pull Request Process

1. Update the README.md with any new features or changes
2. Update the CHANGELOG.md with your changes
3. Ensure all tests pass and coverage targets are met
4. Request review from maintainers
5. Address review comments and re-request review

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add user wishlist feature
fix: Resolve cart item duplication bug
docs: Update testing documentation
refactor: Simplify cart context logic
test: Add accessibility tests for navbar
chore: Update dependencies
```

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Ask questions if unclear
- Help others in the community

## Reporting Bugs

1. Check if the bug has already been reported
2. Provide clear description of the issue
3. Include steps to reproduce
4. Provide any error messages or logs
5. Mention your environment (OS, Node version, etc.)

## Feature Requests

1. Clearly describe the feature
2. Explain the use case
3. Provide any mockups or examples
4. Consider backward compatibility

## Development Tips

### Debugging

```bash
# Run tests in debug mode
node --inspect-brk ./node_modules/.bin/vitest run

# Run Playwright in debug mode
npm run e2e:debug

# Open test report
npm run e2e:report
```

### Project Structure

```
src/
  components/     # Reusable UI components
  context/       # React Context providers
  pages/         # Page components
  test/          # Test files
  data/          # Mock data
```

### Key Technologies

- React 18
- Vite 5
- Vitest
- Playwright
- Cypress
- TailwindCSS

## Questions?

Feel free to open an issue or discussion for questions!

---

Thank you for contributing! 🎉
