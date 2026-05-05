# Development Guide

This guide explains how to set up your development environment and work on Veritex.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/veritex.git
cd veritex
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React and related libraries
- Testing frameworks (Vitest, Playwright, Cypress)
- Development tools (ESLint, Prettier)
- Build tools (Vite)

### 3. Set Up Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your local configuration:

```
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_ENABLE_MOCK_API=true
VITE_LOG_LEVEL=debug
```

## Running the Application

### Development Server

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot module replacement (HMR).

### Production Build

```bash
npm run build
npm run preview
```

## Testing

### All Tests with Coverage

```bash
npm run test:all
```

### Unit & Integration Tests

```bash
npm run test              # Run once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

**Coverage reports** are generated in `coverage/` directory:
- `coverage/index.html` - HTML report
- `coverage/lcov.info` - LCOV format

### Accessibility Tests

```bash
npm run test:a11y
```

Tests WCAG compliance using axe-core.

### End-to-End Tests

#### Playwright (Multi-browser)

```bash
npm run e2e           # Headless mode
npm run e2e:ui        # Interactive UI
npm run e2e:debug     # Debug mode
npm run e2e:report    # View HTML report
```

#### Cypress (Interactive)

```bash
npm run cy:open       # Interactive test runner
npm run cy:run        # Headless mode
```

### All Testing Tools

```bash
npm run test:all-tools
```

Runs the complete test matrix:
- Vitest (Unit/Integration)
- Playwright (E2E)
- Cypress (E2E Interactive)
- Postman/Newman (API)
- Selenium (Cross-browser)

## Code Quality

### Linting

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### Code Formatting

```bash
npm run format        # Format all files
```

## Project Structure

```
veritex/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Mock data & fixtures
│   ├── test/               # Test utilities & setup
│   │   ├── a11y/          # Accessibility tests
│   │   ├── performance/   # Performance tests
│   │   ├── mocks/         # MSW mock handlers
│   │   └── test-utils.jsx # Test helpers
│   └── App.jsx             # Root component
├── tests/
│   ├── e2e/               # Playwright E2E tests
│   ├── postman/           # API test collections
│   └── selenium/          # Selenium tests
├── cypress/               # Cypress tests
├── vite.config.js         # Vite configuration
├── vitest.config.js       # (in vite.config.js)
├── playwright.config.js   # Playwright configuration
├── cypress.config.js      # Cypress configuration
├── .eslintrc.cjs          # ESLint configuration
├── .prettierrc             # Prettier configuration
└── .editorconfig          # Editor configuration
```

## Common Development Tasks

### Adding a New Feature

1. **Create feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Write tests first** (TDD approach)
   ```bash
   npm run test:watch
   ```

3. **Implement the feature**

4. **Run all tests**
   ```bash
   npm run test:all
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: Add my feature"
   git push origin feature/my-feature
   ```

### Debugging

#### Browser DevTools

The app includes React and Redux DevTools extensions support.

#### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Veritex",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

#### Vitest Debugging

```bash
node --inspect-brk ./node_modules/.bin/vitest run
```

Then open `chrome://inspect` in Chrome.

#### Playwright Debugging

```bash
npm run e2e:debug
```

### Working with Git

```bash
# Check status
git status

# View changes
git diff

# Stage changes
git add .

# Commit
git commit -m "message"

# Push to branch
git push origin feature-branch

# Pull latest
git pull origin main
```

## Useful VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode
- **Thunder Client** - rangav.vscode-thunder-client
- **Playwright Test for VSCode** - ms-playwright.playwright

## Performance Optimization

### Analyzing Bundle Size

```bash
npm run build
# Check dist/ folder for bundle analysis
```

### Measuring Performance

```bash
npm run test:performance
```

## Troubleshooting

### Dependencies Issue

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Change port in dev command
npm run dev -- --port 3000
```

### Test Failures

```bash
# Clear test cache
npm run test -- --clearCache

# Run with verbose output
npm run test -- --reporter=verbose
```

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Docs](https://playwright.dev)
- [Cypress Documentation](https://docs.cypress.io)
- [TailwindCSS](https://tailwindcss.com)

## Getting Help

- Check existing GitHub issues
- Search project documentation
- Ask in discussions
- Review similar code patterns in codebase

---

Happy coding! 🚀
