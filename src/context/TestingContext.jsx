import { createContext, useContext, useMemo, useState } from 'react';
import testsData from '../data/tests.json';

const TestingContext = createContext(null);

const featureOrder = ['Authentication', 'Cart', 'Checkout'];

const initialTests = testsData.tests.map(test => ({
  ...test,
  status: test.status.toLowerCase(),
}));

const initialBugs = testsData.bugs.map(bug => ({
  ...bug,
  status: bug.status.toLowerCase(),
}));

const initialLogs = testsData.logs;

const buildLogs = tests => tests.map(test => {
  const label = test.status === 'passed' ? '[PASS]' : '[FAIL]';
  return `${label} ${test.name}`;
});

const calculateCoverage = tests => featureOrder.map(feature => {
  const featureTests = tests.filter(test => test.feature === feature);
  const passedCount = featureTests.filter(test => test.status === 'passed').length;
  const coverage = featureTests.length ? Math.round((passedCount / featureTests.length) * 100) : 0;

  return {
    feature,
    coverage,
    total: featureTests.length,
  };
});

export function TestingProvider({ children }) {
  const [tests, setTests] = useState(initialTests);
  const [bugs, setBugs] = useState(initialBugs);
  const [logs, setLogs] = useState(initialLogs);
  const [running, setRunning] = useState(false);
  const [lastRunAt, setLastRunAt] = useState(null);

  const summary = useMemo(() => {
    const totalTests = tests.length;
    const passedTests = tests.filter(test => test.status === 'passed').length;
    const failedTests = totalTests - passedTests;
    const successRate = totalTests ? Math.round((passedTests / totalTests) * 100) : 0;

    return {
      totalTests,
      passedTests,
      failedTests,
      successRate,
    };
  }, [tests]);

  const coverage = useMemo(() => calculateCoverage(tests), [tests]);

  const charts = useMemo(() => ({
    pie: [
      { name: 'Passed', value: summary.passedTests },
      { name: 'Failed', value: summary.failedTests },
    ],
    bar: featureOrder.map(feature => {
      const featureTests = tests.filter(test => test.feature === feature);
      return {
        feature,
        total: featureTests.length,
        passed: featureTests.filter(test => test.status === 'passed').length,
        failed: featureTests.filter(test => test.status === 'failed').length,
      };
    }),
  }), [summary.failedTests, summary.passedTests, tests]);

  const runTests = () => new Promise(resolve => {
    if (running) {
      resolve(tests);
      return;
    }

    setRunning(true);

    window.setTimeout(() => {
      const nextTests = tests.map(test => ({
        ...test,
        status: Math.random() > 0.32 ? 'passed' : 'failed',
      }));

      const nextBugs = bugs.map(bug => ({
        ...bug,
        status: Math.random() > 0.45 ? 'fixed' : 'open',
      }));

      setTests(nextTests);
      setBugs(nextBugs);
      setLogs(buildLogs(nextTests));
      setLastRunAt(new Date().toISOString());
      setRunning(false);
      resolve(nextTests);
    }, 1600);
  });

  const value = {
    tests,
    bugs,
    logs,
    running,
    lastRunAt,
    summary,
    coverage,
    charts,
    runTests,
  };

  return <TestingContext.Provider value={value}>{children}</TestingContext.Provider>;
}

export function useTesting() {
  const context = useContext(TestingContext);

  if (!context) {
    throw new Error('useTesting must be used within a TestingProvider');
  }

  return context;
}
