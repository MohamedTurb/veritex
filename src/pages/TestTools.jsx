import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const testTools = [
  {
    id: 'vitest',
    title: 'Vitest',
    subtitle: 'Unit and integration tests for React components and context logic.',
    accent: 'from-sky-500 to-cyan-500',
    commands: ['npm run test', 'npm run test:watch', 'npm run test:coverage'],
    highlights: [
      'Best for component behavior and business logic checks.',
      'Fast watch mode for local development loops.',
      'Coverage mode helps verify untested flows.'
    ],
    files: ['src/test/', 'src/test/setupTests.js']
  },
  {
    id: 'playwright',
    title: 'Playwright',
    subtitle: 'End-to-end browser automation for complete user journeys.',
    accent: 'from-emerald-500 to-lime-500',
    commands: ['npm run e2e', 'npm run e2e:ui'],
    highlights: [
      'Covers full flows like navigation, auth, and checkout.',
      'UI mode is useful for debugging flaky steps quickly.',
      'Matches CI-friendly E2E execution.'
    ],
    files: ['tests/e2e/', 'playwright.config.js']
  },
  {
    id: 'cypress',
    title: 'Cypress',
    subtitle: 'Interactive end-to-end and smoke testing with time-travel debugging.',
    accent: 'from-indigo-500 to-blue-500',
    commands: ['npm run cy:open', 'npm run cy:run', 'npm run test:cypress'],
    highlights: [
      'Great interactive runner for quick feedback.',
      'Good for smoke checks before release.',
      'Combined script can auto-start the app server.'
    ],
    files: ['cypress/e2e/', 'cypress.config.js']
  },
  {
    id: 'postman',
    title: 'Postman / Newman',
    subtitle: 'HTTP smoke checks executed from collection files in CLI.',
    accent: 'from-orange-500 to-amber-500',
    commands: ['npm run postman:run', 'npm run test:postman'],
    highlights: [
      'Runs collection assertions in terminal output.',
      'Good for route/status smoke validation.',
      'Environment file controls local host and variables.'
    ],
    files: ['tests/postman/veritex-smoke.postman_collection.json', 'tests/postman/local.postman_environment.json']
  },
  {
    id: 'selenium',
    title: 'Selenium WebDriver',
    subtitle: 'Browser automation script for smoke validation using WebDriver.',
    accent: 'from-fuchsia-500 to-pink-500',
    commands: ['npm run selenium:run', 'npm run test:selenium'],
    highlights: [
      'Useful when validating WebDriver-based compatibility.',
      'Runs headless flow checks from a single script.',
      'Can be integrated into CI job steps.'
    ],
    files: ['tests/selenium/shop.smoke.test.mjs']
  }
];

function ToolCard({ tool, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="card p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.title}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tool.subtitle}</p>
        </div>
        <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${tool.accent} shadow-lg`} />
      </div>

      <div className="mt-4 space-y-2 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 dark:border-dark-700 dark:bg-dark-700/45">
        {tool.commands.map(cmd => (
          <div key={cmd} className="rounded-lg bg-white px-3 py-2 font-mono text-xs text-gray-700 dark:bg-dark-900/70 dark:text-gray-200">
            {cmd}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link to={`/testing-tools/${tool.id}`} className="btn-primary px-4 py-2 text-sm">
          Open {tool.title} Page
        </Link>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{tool.commands.length} commands</span>
      </div>
    </motion.article>
  );
}

export function TestToolsHub() {
  return (
    <PageTransition>
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_30%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-dark-700 dark:bg-dark-800/70">
            <p className="inline-flex rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
              QA toolkit
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Test Tools Center</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300">
              This page gives you a dedicated section for every testing tool in the project. Open any card to view the right command, scope, and test files.
            </p>
          </header>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export function TestToolPage() {
  const { toolId } = useParams();
  const tool = testTools.find(item => item.id === toolId);

  if (!tool) {
    return <Navigate to="/testing-tools" replace />;
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className={`h-2 w-full bg-gradient-to-r ${tool.accent}`} />
          <div className="p-6 md:p-8">
            <Link to="/testing-tools" className="text-sm font-semibold text-brand-500 hover:text-brand-600">
              ← Back to Test Tools Center
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{tool.title}</h1>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">{tool.subtitle}</p>

            <section className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Run Commands</h2>
              <div className="mt-3 space-y-2">
                {tool.commands.map(cmd => (
                  <div key={cmd} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-700 dark:border-dark-700 dark:bg-dark-700/50 dark:text-gray-100">
                    {cmd}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">When To Use</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {tool.highlights.map(item => (
                  <div key={item} className="rounded-xl border border-gray-100 p-4 text-sm text-gray-600 dark:border-dark-700 dark:text-gray-300">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Files</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.files.map(file => (
                  <span key={file} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-dark-600 dark:bg-dark-800 dark:text-gray-300">
                    {file}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
