import { motion, AnimatePresence } from 'framer-motion';

export default function Logs({ logs }) {
  return (
    <div className="card p-5 md:p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Test Logs</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Recent execution output from the QA simulation.</p>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {logs.map((entry, index) => {
            const isPass = entry.startsWith('[PASS]');
            return (
              <motion.div
                key={`${entry}-${index}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-dark-700 bg-gray-50/80 dark:bg-dark-700/50 px-4 py-3"
              >
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isPass ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' : 'bg-rose-500/15 text-rose-600 dark:text-rose-300'}`}>
                  {isPass ? 'P' : 'F'}
                </span>
                <span className="font-mono text-sm text-gray-700 dark:text-gray-200">{entry}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
