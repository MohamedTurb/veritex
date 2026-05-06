export function measureWebVitals(callback) {
  if ('web-vital' in window) {
    const vital = window['web-vital'];
    callback({
      name: vital.name,
      value: vital.value,
      rating: vital.rating,
    });
  }
}

export function measurePerformance(name) {
  if ('performance' in window) {
    return {
      mark: () => performance.mark(`${name}-start`),
      measure: () => {
        performance.mark(`${name}-end`);
        try {
          performance.measure(name, `${name}-start`, `${name}-end`);
          const measure = performance.getEntriesByName(name)[0];
          return {
            duration: measure.duration,
            startTime: measure.startTime,
          };
        } catch (e) {
          if (import.meta.env.DEV) {
            console.error('Performance measurement failed:', e);
          }
          return null;
        }
      },
    };
  }
  return null;
}

export function getPerformanceMetrics() {
  if ('performance' in window && 'PerformanceObserver' in window) {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] || {};
      const paint = performance.getEntriesByType('paint') || [];
      return {
        navigationTiming: {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnection: navigation.connectEnd - navigation.connectStart,
        },
        paintTiming: paint.reduce((acc, p) => ({ ...acc, [p.name]: p.startTime }), {}),
      };
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function reportVitals() {
  if ('web-vitals' in window) {
    const vitals = window['web-vitals'];
    if (typeof vitals.getCLS === 'function') {
      const logVital = metric => {
        if (import.meta.env.DEV) {
          console.log(metric);
        }
      };

      vitals.getCLS(logVital);
      vitals.getFID(logVital);
      vitals.getFCP(logVital);
      vitals.getLCP(logVital);
      vitals.getTTFB(logVital);
    }
  }
}
