# Veritex Features Guide

## ✨ Recently Added Features

### 1. **Wishlist System** ❤️
- Save favorite products for later
- Quick access from navbar with badge counter
- Persistent storage with localStorage
- Add/remove items from cart directly from wishlist

**Location**: 
- Context: `src/context/WishlistContext.jsx`
- Page: `src/pages/Wishlist.jsx`
- UI: Heart button on product cards

### 2. **Customer Reviews & Ratings** ⭐
- Leave detailed product reviews
- Rate products on a 5-star scale
- View all reviews for a product
- Delete your own reviews
- User-submitted content with timestamps

**Location**:
- Context: `src/context/ReviewsContext.jsx`
- Component: `src/components/ReviewsSection.jsx`
- Integrated in: `src/pages/ProductDetails.jsx`

### 3. **Newsletter Subscription** 📧
- Subscribe to get updates and offers
- Email validation
- Located in footer
- Persistent subscriber list

**Location**:
- Context: `src/context/NewsletterContext.jsx`
- Component: `src/components/NewsletterSignup.jsx`
- Footer: `src/components/Footer.jsx`

### 4. **Progressive Web App (PWA)** 📱
- Install as standalone app
- Works offline with service worker
- Installable on mobile devices
- Optimized performance with caching strategies

**Location**:
- Service Worker: `public/sw.js`
- Manifest: `public/manifest.json`
- Utils: `src/utils/pwa.js`
- HTML: `index.html` (manifest link)

### 5. **Performance Optimization** ⚡
- Lazy loading for images
- Service worker caching
- Code splitting support
- Performance monitoring utilities

**Location**:
- LazyImage: `src/components/LazyImage.jsx`
- Performance Utils: `src/utils/performance.js`
- PWA Utils: `src/utils/pwa.js`

### 6. **SEO Improvements** 🔍
- Dynamic meta tags
- Structured data (JSON-LD)
- OpenGraph tags
- Twitter card support

**Location**:
- Utils: `src/utils/seo.js`
- HTML: `index.html`

### 7. **CI/CD Pipeline** 🚀
- GitHub Actions workflow
- Automated testing on push/PR
- Lint and format checks
- Coverage reporting
- E2E test execution

**Location**:
- Workflow: `.github/workflows/ci.yml`

## 🎯 Quick Start

### Using Wishlist
```javascript
import { useWishlist } from '../context/WishlistContext';

function MyComponent() {
  const { items, toggleWishlist, isInWishlist } = useWishlist();
  
  const handleWishlist = (product) => {
    toggleWishlist(product);
  };
}
```

### Using Reviews
```javascript
import { useReviews } from '../context/ReviewsContext';

function MyComponent() {
  const { getProductReviews, addReview } = useReviews();
  
  const reviews = getProductReviews(productId);
  addReview({ productId, rating: 5, title: '...', text: '...' });
}
```

### Using Newsletter
```javascript
import { useNewsletter } from '../context/NewsletterContext';

function MyComponent() {
  const { subscribe } = useNewsletter();
  
  const handleSubscribe = (email) => {
    if (subscribe(email)) {
      // Success!
    }
  };
}
```

## 🔧 Configuration

### Environment Variables
See `.env.example` for available options:
- `VITE_ENABLE_PWA` - Enable/disable PWA
- `VITE_ENABLE_OFFLINE` - Enable offline mode
- `VITE_API_BASE_URL` - API endpoint

### Service Worker
The service worker (`public/sw.js`) implements:
- Cache-first strategy for static assets
- Network-first for API calls
- Automatic cache cleanup
- Update notifications

## 📊 Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Accessibility tests
npm run test:a11y

# E2E tests
npm run e2e

# All tests
npm run test:all
```

## 🚀 Performance Tips

1. **Image Optimization**
   - Use LazyImage component for product images
   - Consider WebP format with fallbacks
   - Implement responsive images

2. **Bundle Size**
   - Code splitting for routes
   - Dynamic imports where possible
   - Tree-shake unused code

3. **Caching**
   - Service worker handles static assets
   - localStorage for user preferences
   - Browser cache headers

## 🔐 Data Storage

- **localStorage** - Used for:
  - Cart items (`veritex_cart`)
  - Wishlist items (`veritex_wishlist`)
  - Reviews (`veritex_reviews`)
  - Newsletter subscribers (`veritex_newsletter`)
  - Admin products (`veritex_admin_products`)

All data is automatically persisted and synced across tabs.

## 🤝 Contributing

When adding new features:
1. Create corresponding context in `src/context/`
2. Add components in `src/components/`
3. Update providers in `src/App.jsx`
4. Add tests in `src/test/`
5. Update this guide

## 📝 Notes

- All features use React Context for state management
- Persistent storage uses localStorage (no backend required)
- Components are fully responsive and accessible
- Dark mode support integrated throughout
