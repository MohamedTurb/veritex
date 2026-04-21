import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Success() {
  const orderId = `VTX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8"
        >
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <div className="mt-8 card p-6 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Order ID</span>
              <span className="font-mono font-bold text-brand-500">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Processing</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Estimated Delivery</span>
              <span className="font-semibold text-gray-900 dark:text-white">3–5 business days</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-2xl text-sm text-brand-700 dark:text-brand-400">
            📧 A confirmation email has been sent to your inbox.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link to="/" className="btn-secondary flex-1 text-center py-3">Back to Home</Link>
            <Link to="/shop" className="btn-primary flex-1 text-center py-3">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
