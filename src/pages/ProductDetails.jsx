import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import toast from 'react-hot-toast';

const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem, items } = useCart();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
      </div>
    );
  }

  const inCart = items.find(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stars = Math.round(product.rating);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}x ${product.title} added to cart!`, {
      style: { borderRadius: '12px', background: '#f97316', color: '#fff' },
    });
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 flex-wrap">
          <Link to="/" className="hover:text-brand-500">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-500">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-500">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-dark-700 shadow-2xl">
              {!imgLoaded && <div className="absolute inset-0 skeleton" />}
              <img
                src={product.image}
                alt={product.title}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
            {product.badge && (
              <div className="absolute top-4 left-4 badge bg-brand-500 text-white text-sm px-3 py-1.5">{product.badge}</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
            <div>
              <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">{product.title}</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= stars} />)}
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">EGP {product.price.toFixed(2)}</span>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">In Stock</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">Quantity</span>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-dark-700 rounded-xl p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-dark-600 transition-colors font-bold text-gray-700 dark:text-gray-300">−</button>
                <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-dark-600 transition-colors font-bold text-gray-700 dark:text-gray-300">+</button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAddToCart} className="btn-primary flex-1 text-base py-4">
                {inCart ? 'Add More to Cart' : 'Add to Cart'}
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { handleAddToCart(); navigate('/cart'); }} className="btn-secondary flex-1 text-base py-4">
                Buy Now
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-dark-600">
              {[
                { icon: '🚚', text: 'Free shipping over EGP 50' },
                { icon: '↩️', text: '30-day easy returns' },
                { icon: '🔒', text: 'Secure checkout' },
                { icon: '⭐', text: '2-year warranty' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{f.icon}</span><span>{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
