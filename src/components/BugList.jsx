import { motion } from 'framer-motion';

const severityClasses = {
  Low: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
  Medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  High: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
};

const statusClasses = {
  open: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
  fixed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
};

export default function BugList({ bugs }) {
  return (
    <div className="card p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bug Tracking</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Open defects and fixed issues from the latest QA cycles.</p>
      </div>

      <div className="space-y-3">
        {bugs.map((bug, index) => (
          <motion.div
            key={bug.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-gray-100 dark:border-dark-700 bg-gray-50/70 dark:bg-dark-700/50 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{bug.title}</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Root cause analysis and fix verification in progress.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${severityClasses[bug.severity]}`}>
                  {bug.severity}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses[bug.status]}`}>
                  {bug.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
