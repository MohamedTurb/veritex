import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { TestingProvider, useTesting } from '../context/TestingContext';
import SummaryCards from '../components/SummaryCards';
import TestTable from '../components/TestTable';
import Charts from '../components/Charts';
import BugList from '../components/BugList';
import Logs from '../components/Logs';
import { useTheme } from '../context/ThemeContext';

const themeIcon = {
  light: '☀',
  dark: '☾',
};

function DashboardContent() {
  const { dark, toggle } = useTheme();
  const { tests, bugs, logs, running, summary, coverage, charts, runTests } = useTesting();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tests.filter(test => {
      const matchesFilter = filter === 'all' || test.status === filter;
      const matchesSearch = !query || [test.id, test.scenario, test.steps, test.expectedResult, test.feature, test.name]
        .some(value => value.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [filter, search, tests]);

  const handleRunTests = async () => {
    const nextTests = await runTests();
    const passed = nextTests.filter(test => test.status === 'passed').length;
    const failed = nextTests.length - passed;

    toast.success(`Tests completed: ${passed} passed, ${failed} failed`, {
      duration: 3500,
    });
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.02),_transparent_20%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_18%)]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-dark-700 dark:bg-dark-800/75 dark:shadow-black/20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-orange-300">
              QA control center
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Software Testing Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Monitor regression coverage, run simulated test cycles, track defects, and inspect release readiness from a single operational view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg dark:border-dark-600 dark:bg-dark-700 dark:text-gray-200"
            >
              <span className="text-base">{themeIcon[dark ? 'dark' : 'light']}</span>
              {dark ? 'Dark' : 'Light'} Mode
            </button>
            <button
              onClick={handleRunTests}
              disabled={running}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {running && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />}
              {running ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>
        </motion.div>

        <div className="space-y-8">
          <SummaryCards summary={summary} />

          <section className="card p-5 md:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success Rate</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  The current pass rate is updated live when new test runs complete.
                </p>
              </div>
              <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-700 dark:text-orange-300">
                {summary.successRate}% complete
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-700">
              <motion.div
                key={summary.successRate}
                initial={{ width: 0 }}
                animate={{ width: `${summary.successRate}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-lime-500 to-amber-400"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{summary.passedTests} passing</span>
              <span>{summary.failedTests} failing</span>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
            <TestTable
              tests={filteredTests}
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
            />

            <div className="space-y-6">
              <div className="card p-5 md:p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Coverage</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Feature-level pass coverage from the current execution state.</p>
                </div>
                <div className="space-y-4">
                  {coverage.map(item => (
                    <div key={item.feature}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{item.feature}</span>
                        <span className="text-gray-500 dark:text-gray-400">{item.coverage}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-700">
                        <motion.div
                          key={`${item.feature}-${item.coverage}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.coverage}%` }}
                          transition={{ duration: 0.55 }}
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <BugList bugs={bugs} />
            </div>
          </div>

          <Charts pieData={charts.pie} barData={charts.bar} />

          <Logs logs={logs} />
        </div>

        <AnimatePresence>
          {running && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                className="w-[min(92vw,420px)] rounded-[1.75rem] border border-white/15 bg-white/95 p-8 text-center shadow-2xl dark:bg-dark-800/95"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Running simulated tests</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Randomizing pass and fail outcomes, refreshing charts, and updating logs.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TestingDashboard() {
  return (
    <TestingProvider>
      <DashboardContent />
    </TestingProvider>
  );
}
