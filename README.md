# Veritex Shop

Modern e-commerce project built with React + Vite, featuring:
- Full storefront flow (products, cart, checkout, user account)
- A professional QA page called Software Testing Dashboard
- Authentication and signup using Context API + LocalStorage
- Dark mode support

## 1) Overview

The project is divided into two main parts:

1. Storefront experience
- Product listing and browsing
- Search, filtering, and sorting
- Product details page
- Cart and checkout flow
- Login and signup

2. Software Testing Dashboard
- Testing results summary
- Test cases table with Search/Filter
- Recharts data visualizations
- Run Tests simulation with live updates
- Bugs tracking, logs, and coverage metrics

## 2) Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 3
- Framer Motion
- Recharts
- React Hot Toast
- Context API
- LocalStorage

## 3) Run Locally

### Requirements
- Node.js 18+ (recommended)
- npm

### Steps

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## 4) Available Scripts

- `npm run dev`: Start the app in development mode
- `npm run build`: Build production assets
- `npm run preview`: Preview the production build

## 5) Project Structure

```text
src/
  components/
    BugList.jsx
    Charts.jsx
    Footer.jsx
    Logs.jsx
    Navbar.jsx
    PageTransition.jsx
    ProductCard.jsx
    ProductGrid.jsx
    SummaryCards.jsx
    TestTable.jsx

  context/
    AuthContext.jsx
    CartContext.jsx
    TestingContext.jsx
    ThemeContext.jsx

  data/
    products.js
    tests.json

  pages/
    About.jsx
    Cart.jsx
    Checkout.jsx
    Contact.jsx
    Dashboard.jsx
    Home.jsx
    Login.jsx
    NotFound.jsx
    ProductDetails.jsx
    Services.jsx
    Shop.jsx
    Signup.jsx
    Success.jsx
    Team.jsx
    TestingDashboard.jsx

  assets/
    team/

  App.jsx
  index.css
  main.jsx
```

## 6) Routes

Main routes:
- `/` Home page
- `/shop` Product listing
- `/product/:id` Product details
- `/cart` Cart
- `/checkout` Checkout
- `/success` Order success page
- `/about`
- `/services`
- `/contact`
- `/team`
- `/login`
- `/signup`
- `/dashboard` User account dashboard

Testing dashboard route:
- `/testing-dashboard`

Important: `/testing-dashboard` is protected and requires login.

## 7) Authentication

This project uses `AuthContext` with LocalStorage:
- Current user is stored in `veritex_user`
- Registered users are stored in `veritex_users`
- Login/signup are handled locally (frontend-only)

### Ready-to-use demo account

You can access the testing dashboard using:
- Email: `testing@veritex.com`
- Password: `Testing123`

If you open `/testing-dashboard` without authentication, you will be redirected to `/login`, then returned after successful login.

## 8) State Management (Context API)

### AuthContext
- `login(email, password)`
- `signup(name, email, password)`
- `logout()`
- `user`, `loading`

### CartContext
- Add/remove/update cart items
- Persist cart in LocalStorage (`veritex_cart`)
- Exposes `totalItems` and `totalPrice`

### ThemeContext
- Toggle light/dark mode
- Persist preference in LocalStorage (`veritex_theme`)

### TestingContext
- Loads testing data from `src/data/tests.json`
- Calculates:
  - Total tests
  - Passed / Failed counts
  - Success rate
  - Coverage per feature
- Runs `runTests` simulation to refresh results, logs, and bugs

## 9) Software Testing Dashboard

Page: `src/pages/TestingDashboard.jsx`

Includes:
- Header + description
- Summary Cards
- Dynamic progress bar
- Test cases table with Search + Filter
- Pie chart + bar chart using Recharts
- Run Tests button with loading overlay
- Bug Tracking
- Logs
- Coverage per feature
- Dark Mode Toggle
- Toast Notifications

## 10) Team Images

The Team page reads images from a local folder:
- `src/assets/team`

`src/pages/Team.jsx` uses:
- `import.meta.glob` to load images from that folder
- Fallback URLs if a local image is missing

You can replace team photos by adding files there and updating `imageFile` values in the `team` array.

## 11) Data Sources

### Products data
- `src/data/products.js`

### Testing dashboard data
- `src/data/tests.json`
- Contains:
  - `tests`
  - `bugs`
  - `logs`

## 12) Important Notes

- Displayed storefront currency is currently EGP.
- This is a frontend-only project; no real backend/API yet.
- User, cart, theme, and testing state are persisted in browser storage.

## 13) Future Improvements

- Connect to a real backend (Node.js / Laravel / Django / etc.)
- JWT + refresh tokens instead of local-only auth
- Real payment gateway integration
- Admin panel
- Unit + E2E testing (Jest + RTL + Cypress)

## 14) License

This project is for educational and development purposes.
