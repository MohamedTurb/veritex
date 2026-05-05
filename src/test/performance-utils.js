/**
 * Performance Testing Utilities
 * Measures Web Vitals and performance metrics
 */

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const lastEntry = list.getEntries().pop();
      resolve(lastEntry.renderTime || lastEntry.loadTime);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // Timeout after 5 seconds
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, 5000);
  });
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  return new Promise((resolve) => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    setTimeout(() => {
      observer.disconnect();
      resolve(clsValue);
    }, 5000);
  });
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID() {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const firstEntry = list.getEntries()[0];
      resolve(firstEntry.processingDuration);
    });

    observer.observe({ entryTypes: ['first-input'] });

    // Timeout after 5 seconds
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, 5000);
  });
}

/**
 * Get page load metrics
 */
export function getPageMetrics() {
  const navigation = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');

  return {
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    firstPaint: paint.find((p) => p.name === 'first-paint')?.startTime,
    firstContentfulPaint: paint.find((p) => p.name === 'first-contentful-paint')?.startTime,
  };
}

/**
 * Assert performance budget
 */
export function assertPerformanceBudget(metric, value, budget) {
  if (value > budget) {
    throw new Error(`${metric} exceeded budget: ${value}ms > ${budget}ms`);
  }
}
