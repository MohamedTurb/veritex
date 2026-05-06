# Veritex Shop

A modern, full-featured e-commerce platform built with React + Vite, combining a professional storefront with a comprehensive Software Testing Dashboard and advanced testing infrastructure. Production-ready with comprehensive test coverage, accessibility compliance, and performance optimization.

## 🎯 Project Highlights

**Storefront Features:**
- Full e-commerce flow (product listing, search, filtering, cart, checkout)
- User authentication and account management
- Dark mode support with theme persistence
- Responsive design with Tailwind CSS
- Order history and account management

**Software Testing Dashboard:**
- Real-time test results visualization with Recharts
- Test case management with advanced filtering
- Bug tracking and logging system
- Test coverage metrics and reporting
- Admin-only access with authentication

**Testing Infrastructure:**
- 🧪 **Vitest** - Unit/Integration with coverage reporting
- 🎭 **Playwright** - Multi-browser E2E testing
- 🌳 **Cypress** - Interactive E2E testing
- ♿ **jest-axe** - Accessibility (WCAG) testing
- 🚀 **Lighthouse** - Performance testing
- 🌐 **Selenium** - Cross-browser automation
- 📮 **Postman/Newman** - API testing
- 🎪 **MSW** - Advanced API mocking

---

## 🧪 Testing Tools & Quality Assurance

[![Vitest](https://img.shields.io/badge/Vitest-6E7581?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat-square&logo=cypress&logoColor=white)](https://cypress.io/)
[![jest-axe](https://img.shields.io/badge/jest--axe-EC5990?style=flat-square&logo=jest&logoColor=white)](https://github.com/nickcolley/jest-axe)
[![ESLint](https://img.shields.io/badge/ESLint-4B3B8A?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)](https://www.postman.com/)
[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat-square&logo=selenium&logoColor=white)](https://www.selenium.dev/)

---

## 🎉 Recently Added (Latest Update)

**New Features Implemented:**
- ❤️ **Wishlist System** - Save favorite products
- ⭐ **Customer Reviews & Ratings** - Product reviews with 5-star system  
- 📧 **Newsletter Subscription** - Email signup in footer
- 📱 **Progressive Web App (PWA)** - Installable app with offline support
- ⚡ **Performance Optimizations** - Lazy loading, image optimization
- 🔍 **SEO Improvements** - Meta tags, structured data
- 🚀 **CI/CD Pipeline** - Automated testing with GitHub Actions

📚 **Documentation**: See [FEATURES.md](FEATURES.md) and [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for detailed information.

---

## 📋 Quick Navigation

- [Project Overview](#overview)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Testing Guide](#testing-guide)
- [Quality Assurance](#quality-assurance)
- [Project Structure](#project-structure)
- [Features](#features)
- [CI/CD Pipeline](#cicd)
- [Contributing](#contributing)

---

## <a id="overview"></a>📦 Project Overview

Veritex Shop combines a professional e-commerce storefront with an integrated testing dashboard, designed to showcase modern web development best practices including comprehensive testing, accessibility compliance, and performance optimization.

### Two Main Experiences

**1️⃣ Storefront (Public)**
- Product catalog with search and advanced filtering
- Product detail pages with related products
- Shopping cart with persistent storage
- Multi-step checkout process with validation
- User authentication (login, signup, password reset)
- Order confirmation and user dashboard
- Dark/Light mode support

**2️⃣ Testing Dashboard (Protected)**
- Real-time test metrics and statistics
- Test case management with filtering
- Results tracking with pass/fail rates
- Bug tracking system
- Performance logs monitoring
- Coverage metrics
- Admin controls for test simulation

---

## <a id="tech-stack"></a>🛠️ Tech Stack

### Core
- **React** 18 - Modern UI framework
- **Vite** 5 - Next-generation build tool
- **React Router** 6 - Client-side routing
- **Context API** - State management
- **LocalStorage** - Persistent storage

### Styling
- **Tailwind CSS** 3 - Utility-first CSS
- **PostCSS** - CSS processing
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Testing & QA
- **Vitest** 4 - Unit & integration testing
- **Playwright** - E2E browser automation
- **Cypress** 15 - Interactive E2E testing
- **jest-axe** - Accessibility testing
- **Lighthouse** - Performance auditing
- **Selenium** 4 - Cross-browser testing
- **MSW** 2 - API mocking
- **Faker** - Test data generation

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent settings

---

## <a id="quick-start"></a>🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm 8+ (included with Node.js)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/veritex.git
cd veritex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### First Commands

```bash
# Code quality check
npm run lint
npm run format

# Run tests
npm run test:all
npm run test:coverage

# Build for production
npm run build
npm run preview
```

---

## <a id="available-scripts"></a>📝 Available Scripts

### Development

```bash
npm run dev       # Start dev server (HMR enabled)
npm run build     # Build production bundle
npm run preview   # Preview production build
```

### Code Quality

```bash
npm run lint      # Check code with ESLint
npm run lint:fix  # Fix linting issues
npm run format    # Format with Prettier
```

### Testing - Unit & Integration

```bash
npm run test              # Run tests once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
npm run test:a11y        # Accessibility tests
npm run test:all         # All checks: lint + coverage + a11y
```

### Testing - E2E (Playwright)

```bash
npm run e2e              # Headless all browsers
npm run e2e:ui           # Interactive UI
npm run e2e:debug        # Debug mode
npm run e2e:report       # View HTML report
```

### Testing - E2E (Cypress)

```bash
npm run cy:open         # Interactive test runner
npm run cy:run          # Headless mode
npm run test:cypress    # With dev server
```

### Testing - API

```bash
npm run postman:run     # Postman/Newman tests
npm run test:postman    # With dev server
npm run selenium:run    # Selenium tests
npm run test:selenium   # With dev server
```

### Complete Test Suite

```bash
npm run test:all-tools  # All testing tools
```

---

## <a id="testing-guide"></a>🧪 Comprehensive Testing Guide

### Unit & Integration Tests (Vitest)

```bash
npm run test                # Run all tests
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate HTML coverage report
```

**Coverage Targets:** 70% lines, functions, branches, statements

**Output:**
- `coverage/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format for CI
- `coverage/coverage-summary.json` - JSON data

**Test Files:**
- `src/test/auth-flow.test.jsx` - Authentication
- `src/test/cartContext.test.jsx` - Shopping cart
- `src/test/checkout-flow.test.jsx` - Checkout
- `src/test/productGrid.test.jsx` - Products
- `src/test/admin-dashboard.test.jsx` - Admin
- `src/test/app.integration.test.jsx` - Integration

### Accessibility Tests (jest-axe)

```bash
npm run test:a11y
```

Tests WCAG 2.1 compliance:
- `src/test/a11y/productCard.a11y.test.jsx`
- `src/test/a11y/navbar.a11y.test.jsx`
- `src/test/a11y/checkout.a11y.test.jsx`

### End-to-End Tests (Playwright)

```bash
npm run e2e           # Headless
npm run e2e:ui        # Interactive
npm run e2e:debug     # Debug mode
```

**Browsers Tested:**
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Safari)
- Mobile Chrome (Pixel 5)

**Test Coverage:**
- Shop flows and navigation
- Product filtering and search
- Cart operations
- Checkout process
- Authentication
- Accessibility compliance
- Performance metrics
- Security validation

**Tests:**
- `tests/e2e/shop-and-qa.spec.js` - Core flows
- `tests/e2e/accessibility.spec.js` - A11y & performance
- `tests/e2e/security.spec.js` - Security & validation

### Cypress E2E Tests

```bash
npm run cy:open  # Interactive runner
npm run cy:run   # Headless
```

**Features:**
- Real-time execution
- Time-travel debugging
- Network request stubbing

### All Tests Together

```bash
npm run test:all-tools
```

Runs complete matrix:
- Vitest (unit/integration + coverage)
- Playwright (E2E multi-browser)
- Cypress (interactive E2E)
- Newman/Postman (API tests)
- Selenium (smoke tests)

---

## <a id="quality-assurance"></a>✅ Quality Assurance

### Code Quality Checks

```bash
npm run lint              # ESLint checks
npm run lint:fix          # Auto-fix issues
npm run format            # Prettier formatting
npm run format -- --check # Check without fixing
```

**Tools:**
- **ESLint** - Code style and best practices
- **Prettier** - Consistent formatting
- **EditorConfig** - Editor configuration

### Test Coverage

```bash
npm run test:coverage
```

- Generates HTML report in `coverage/`
- Highlights uncovered lines
- Tracks coverage trends

### Performance Audits

```bash
npm run build
# Lighthouse audits run in CI/CD
```

**Targets:**
- Performance: 80%+
- Accessibility: 90%+
- Best Practices: 85%+
- SEO: 90%+

### Automated CI/CD

GitHub Actions runs on every push and PR:
- ✅ Lint checks
- ✅ Tests with coverage
- ✅ Accessibility tests
- ✅ E2E tests (multi-browser)
- ✅ API tests
- ✅ Lighthouse audit
- ✅ Security scan
- ✅ Build size check

---

## <a id="project-structure"></a>📁 Project Structure

```
veritex/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Mock/sample data
│   ├── test/               # Test files
│   │   ├── a11y/          # Accessibility tests
│   │   ├── performance/   # Performance tests
│   │   ├── mocks/         # MSW mock handlers
│   │   ├── test-utils.jsx # Test utilities
│   │   └── setupTests.js  # Vitest setup
│   └── App.jsx             # Root component
│
├── tests/
│   ├── e2e/               # Playwright E2E tests
│   ├── postman/           # API test collections
│   └── selenium/          # Selenium tests
│
├── cypress/               # Cypress tests
│
├── Configuration Files
│   ├── vite.config.js      # Vite + Vitest
│   ├── playwright.config.js # Playwright
│   ├── cypress.config.js    # Cypress
│   ├── .eslintrc.cjs       # ESLint
│   ├── .prettierrc          # Prettier
│   ├── .editorconfig       # Editor settings
│   ├── .nvmrc              # Node version
│   ├── lighthouserc.json   # Lighthouse
│   └── .env.example        # Environment vars
│
├── Documentation
│   ├── README.md           # This file
│   ├── CONTRIBUTING.md     # Contributing guide
│   ├── DEVELOPMENT.md      # Development setup
│   └── CHANGELOG.md        # Version history
│
├── CI/CD
│   └── .github/workflows/tests.yml
│
└── package.json            # Dependencies
```

See [src/test/README.md](src/test/README.md) and [tests/e2e/README.md](tests/e2e/README.md) for detailed testing documentation.

---

## <a id="features"></a>✨ Key Features

### 🛍️ E-Commerce
- ✅ Full product catalog with 16+ products
- ✅ Advanced filtering (category, price, rating)
- ✅ Search functionality with debouncing
- ✅ Sorting (featured, price, rating)
- ✅ Shopping cart with persistence
- ✅ **Wishlist/Favorites** ❤️ - Save products for later
- ✅ **Product Reviews & Ratings** ⭐ - Customer reviews (5-star system)
- ✅ Multi-step checkout
- ✅ Order confirmation
- ✅ User accounts & dashboard

### 🎨 User Experience
- ✅ Dark/Light mode toggle
- ✅ Theme persistence
- ✅ Smooth animations (Framer Motion)
- ✅ Toast notifications
- ✅ Responsive design (mobile-first)
- ✅ Loading states
- ✅ Error handling
- ✅ Page transitions
- ✅ **Lazy Image Loading** ⚡ - Performance optimized images
- ✅ **Newsletter Subscription** 📧 - Email signup in footer

### 🚀 Performance & PWA
- ✅ **Progressive Web App (PWA)** 📱 - Installable app
- ✅ **Service Worker** - Offline support & caching
- ✅ **Performance Optimization** ⚡ - Lazy loading, code splitting
- ✅ **SEO Improvements** 🔍 - Meta tags, structured data
- ✅ Core Web Vitals optimized
- ✅ Bundle size < 500KB

### 🧪 Testing & Quality
- ✅ 70%+ code coverage
- ✅ WCAG accessibility compliance
- ✅ Multi-browser E2E testing
- ✅ Performance optimization
- ✅ Security validation
- ✅ API mocking (MSW)
- ✅ **Automated CI/CD** - GitHub Actions pipeline
- ✅ Accessibility (A11y) tests

### 🔐 Security
- ✅ Secure authentication
- ✅ Protected routes
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Secure storage

---

## <a id="cicd"></a>🔄 CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/tests.yml`)

Automated on every push and PR:

| Job | Tests |
|-----|-------|
| **Lint & Format** | ESLint, Prettier |
| **Unit Tests** | Vitest with coverage |
| **Accessibility** | jest-axe A11y tests |
| **E2E Tests** | Playwright (all browsers) |
| **Interactive E2E** | Cypress |
| **API Tests** | Newman/Postman |
| **Smoke Tests** | Selenium |
| **Performance** | Lighthouse audit |
| **Security** | npm audit |
| **Build** | Bundle size check |

**Reports & Artifacts:**
- Test results (HTML, XML, JSON)
- Coverage reports (LCOV, HTML)
- Lighthouse report
- Screenshots & videos
- Build artifacts (7-day retention)

---

## <a id="contributing"></a>🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Process

1. **Fork and clone:**
   ```bash
   git clone https://github.com/yourusername/veritex.git
   cd veritex
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Development:**
   ```bash
   npm install
   npm run dev
   ```

4. **Tests and checks:**
   ```bash
   npm run test:all
   npm run lint:fix
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**

### Requirements
- All tests pass
- Coverage targets met (70%+)
- ESLint & Prettier checks pass
- Updated documentation

---

## 📚 Documentation

- **[README.md](README.md)** - This file (overview and quick start)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development setup and workflow
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and roadmap
- **[src/test/README.md](src/test/README.md)** - Testing documentation
- **[tests/e2e/README.md](tests/e2e/README.md)** - E2E testing guide

---

## 📊 Project Statistics

- **Components:** 10+
- **Pages:** 15+
- **Test Files:** 20+
- **Test Cases:** 100+
- **Code Coverage:** 70%+
- **Accessibility:** WCAG 2.1 AA
- **Bundle Size:** ~300KB (gzipped)
- **Performance Score:** 90+

---

## 🚀 Performance

- **Page Load:** <2s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1
- **Time to Interactive:** <3s

---

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Semantic HTML
- ARIA labels and landmarks

---

## 📄 License

MIT License - See LICENSE file

---

## 📞 Support

- 📧 Email: hello@veritex.shop
- 📞 Phone: +20155537991
- 🌍 Website: [veritex.shop](https://veritex.shop)
- 💬 Issues: GitHub Issues

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)
- [Cypress](https://docs.cypress.io)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [MSW](https://mswjs.io)

---

## 🙏 Acknowledgments

Built with modern web development best practices and comprehensive testing approach.

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
