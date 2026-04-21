import { motion } from 'framer-motion';

const cardStyles = [
  'from-emerald-500/20 via-emerald-500/10 to-transparent border-emerald-500/20',
  'from-sky-500/20 via-sky-500/10 to-transparent border-sky-500/20',
  'from-rose-500/20 via-rose-500/10 to-transparent border-rose-500/20',
  'from-amber-500/20 via-amber-500/10 to-transparent border-amber-500/20',
];

const labels = [
  { title: 'Total Tests', helper: 'Execution count' },
  { title: 'Passed Tests', helper: 'Stable scenarios' },
  { title: 'Failed Tests', helper: 'Needs attention' },
  { title: 'Success Rate', helper: 'Overall quality' },
];

export default function SummaryCards({ summary }) {
  const values = [
    summary.totalTests,
    summary.passedTests,
    summary.failedTests,
    `${summary.successRate}%`,
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {labels.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className={`card bg-gradient-to-br ${cardStyles[index]} p-5 md:p-6 shadow-lg shadow-black/5 dark:shadow-black/20`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {values[index]}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.helper}</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-white/70 dark:bg-dark-700/80 border border-white/60 dark:border-dark-500/60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
