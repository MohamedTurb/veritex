import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const StarIcon = ({ filled }) => (
  <svg className={`w-3.5 h-3.5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const badgeColors = {
  'Best Seller': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Premium': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Top Rated': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'New': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Sale': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      style: { borderRadius: '12px', background: '#f97316', color: '#fff' },
    });
  };

  const stars = Math.round(product.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="card overflow-hidden transition-shadow duration-300 group-hover:shadow-xl dark:group-hover:shadow-dark-900/60">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50 dark:bg-dark-700 overflow-hidden">
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <motion.img
              src={product.image}
              alt={product.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {product.badge && (
              <span className={`absolute top-3 left-3 badge text-xs font-semibold ${badgeColors[product.badge] || 'bg-gray-100 text-gray-700'}`}>
                {product.badge}
              </span>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="p-4">
            <span className="text-xs font-medium text-brand-500 dark:text-brand-400 uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="mt-1 font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <StarIcon key={s} filled={s <= stars} />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price + Cart */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                EGP {product.price.toFixed(2)}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors duration-200 shadow-md shadow-brand-500/25"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
