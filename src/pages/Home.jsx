import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductGrid } from '../components/ProductGrid';
import PageTransition from '../components/PageTransition';
import products from '../data/products';

const categories = [
  { name: 'Electronics', emoji: '⚡', color: 'from-blue-500 to-indigo-600' },
  { name: 'Fashion', emoji: '👗', color: 'from-pink-500 to-rose-600' },
  { name: 'Furniture', emoji: '🛋️', color: 'from-amber-500 to-orange-600' },
  { name: 'Accessories', emoji: '⌚', color: 'from-purple-500 to-violet-600' },
  { name: 'Home & Kitchen', emoji: '🏠', color: 'from-green-500 to-emerald-600' },
  { name: 'Sports', emoji: '🏃', color: 'from-teal-500 to-cyan-600' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const featured = products.slice(0, 8);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-dark-800 to-gray-900 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Free shipping on orders over EGP 50
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Shop the
                <span className="block text-gradient">Future of</span>
                Commerce.
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
                Discover curated products across every category. Quality guaranteed, delivered fast, with a seamless experience from browse to doorstep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link to="/shop" className="btn-primary text-base">
                Shop Now →
              </Link>
              <Link to="/about" className="btn-secondary text-base">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 mt-12"
            >
              {[
                { value: '50k+', label: 'Products' },
                { value: '98%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Find exactly what you're looking for</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/shop?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-5 card hover:shadow-lg dark:hover:shadow-dark-900/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {cat.emoji}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Handpicked favorites from our collection</p>
          </div>
          <Link to="/shop" className="text-brand-500 hover:text-brand-600 font-semibold text-sm transition-colors">
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} loading={loading} />
      </section>

      {/* Banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mb-20 rounded-3xl overflow-hidden bg-gradient-to-r from-brand-500 to-orange-400 text-white">
        <div className="relative px-8 md:px-16 py-12 md:py-16">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
            <div className="w-full h-full bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
          </div>
          <div className="relative max-w-lg">
            <span className="badge bg-white/20 text-white mb-4">Limited Time</span>
            <h2 className="text-3xl md:text-4xl font-bold">Up to 40% Off</h2>
            <p className="mt-2 text-orange-100">On selected electronics and accessories. Don't miss out!</p>
            <Link to="/shop?category=Electronics" className="inline-block mt-6 px-6 py-3 bg-white text-brand-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
