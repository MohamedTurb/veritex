import { AnimatePresence, motion } from 'framer-motion';

const statusClasses = {
  passed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  failed: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
};

export default function TestTable({ tests, search, setSearch, filter, setFilter }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-gray-100 dark:border-dark-700 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Test Cases</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Search and filter your QA suite in real time.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search by test, scenario, or step"
              className="input-field w-full sm:w-80"
            />
            <select
              value={filter}
              onChange={event => setFilter(event.target.value)}
              className="input-field w-full sm:w-44"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-dark-700">
          <thead className="bg-gray-50/80 dark:bg-dark-800/60">
            <tr>
              {['Test ID', 'Scenario', 'Steps', 'Expected Result', 'Status'].map(column => (
                <th
                  key={column}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-700 bg-white dark:bg-dark-800">
            <AnimatePresence mode="popLayout">
              {tests.length ? tests.map((test, index) => (
                <motion.tr
                  key={test.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, delay: index * 0.015 }}
                  className="hover:bg-gray-50/80 dark:hover:bg-dark-700/60"
                >
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                    {test.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="font-medium text-gray-900 dark:text-white">{test.scenario}</div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{test.feature}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <pre className="whitespace-pre-wrap font-sans leading-6">{test.steps}</pre>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {test.expectedResult}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses[test.status]}`}>
                      {test.status}
                    </span>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-5 py-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    No test cases match your search.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
