import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import testsData from '../data/tests.json';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  const [runHistory, setRunHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('veritex_test_runs') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('veritex_test_runs', JSON.stringify(runHistory));
  }, [runHistory]);

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

  const createSnapshot = (snapshotTests, source = 'Manual') => {
    const passed = snapshotTests.filter(test => test.status === 'passed').length;
    const failed = snapshotTests.length - passed;
    const successRate = snapshotTests.length ? Math.round((passed / snapshotTests.length) * 100) : 0;

    return {
      id: `RUN-${Date.now()}`,
      source,
      createdAt: new Date().toISOString(),
      summary: {
        totalTests: snapshotTests.length,
        passedTests: passed,
        failedTests: failed,
        successRate,
      },
      tests: snapshotTests,
    };
  };

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
      setRunHistory(prev => [createSnapshot(nextTests), ...prev].slice(0, 25));
      setRunning(false);
      resolve(nextTests);
    }, 1600);
  });

  const compareRuns = (baseRunId, targetRunId) => {
    const baseRun = runHistory.find(run => run.id === baseRunId);
    const targetRun = runHistory.find(run => run.id === targetRunId);

    if (!baseRun || !targetRun) {
      return null;
    }

    return {
      baseRun,
      targetRun,
      delta: {
        passed: targetRun.summary.passedTests - baseRun.summary.passedTests,
        failed: targetRun.summary.failedTests - baseRun.summary.failedTests,
        successRate: targetRun.summary.successRate - baseRun.summary.successRate,
      },
    };
  };

  const exportRunsCsv = (runId) => {
    const run = runHistory.find(entry => entry.id === runId) || runHistory[0];
    if (!run) {
      return false;
    }

    const header = ['Run ID', 'Source', 'Date', 'Test ID', 'Scenario', 'Status'];
    const rows = run.tests.map(test => [
      run.id,
      run.source,
      run.createdAt,
      test.id,
      test.scenario,
      test.status,
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(item => `"${String(item).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${run.id.toLowerCase()}-report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    return true;
  };

  const exportRunsPdf = (runId) => {
    const run = runHistory.find(entry => entry.id === runId) || runHistory[0];
    if (!run) {
      return false;
    }

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`QA Report - ${run.id}`, 14, 16);
    doc.setFontSize(10);
    doc.text(`Source: ${run.source}`, 14, 22);
    doc.text(`Date: ${new Date(run.createdAt).toLocaleString()}`, 14, 27);
    doc.text(`Success Rate: ${run.summary.successRate}%`, 14, 32);

    autoTable(doc, {
      startY: 38,
      head: [['Test ID', 'Scenario', 'Status']],
      body: run.tests.map(test => [test.id, test.scenario, test.status.toUpperCase()]),
      theme: 'striped',
      styles: { fontSize: 9 },
    });

    doc.save(`${run.id.toLowerCase()}-report.pdf`);
    return true;
  };

  const importCiResults = (payload) => {
    let parsed = payload;
    if (typeof payload === 'string') {
      try {
        parsed = JSON.parse(payload);
      } catch {
        return { success: false, error: 'Invalid JSON format.' };
      }
    }

    if (!parsed || !Array.isArray(parsed.tests)) {
      return { success: false, error: 'CI payload must include a tests array.' };
    }

    const ciTestsById = new Map(parsed.tests.map(test => [test.id, test]));
    const nextTests = tests.map(test => {
      const ciTest = ciTestsById.get(test.id);
      if (!ciTest) {
        return test;
      }
      return {
        ...test,
        status: (ciTest.status || test.status).toLowerCase() === 'passed' ? 'passed' : 'failed',
      };
    });

    setTests(nextTests);
    setLogs(buildLogs(nextTests));
    setLastRunAt(new Date().toISOString());
    setRunHistory(prev => [createSnapshot(nextTests, parsed.source || 'CI'), ...prev].slice(0, 25));

    return { success: true, imported: parsed.tests.length };
  };

  const value = {
    tests,
    bugs,
    logs,
    running,
    lastRunAt,
    summary,
    coverage,
    charts,
    runHistory,
    runTests,
    compareRuns,
    exportRunsCsv,
    exportRunsPdf,
    importCiResults,
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
