import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-9xl font-black text-brand-500 leading-none">404</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Page Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Looks like this page got lost in the warehouse.</p>
          <div className="flex gap-3 justify-center mt-8">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/shop" className="btn-secondary">Browse Shop</Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
