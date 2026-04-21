import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    removeItem(item.id);
    toast.success(`${item.title} removed`, {
      style: { borderRadius: '12px' },
    });
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Add some products to get started.</p>
          <Link to="/shop" className="btn-primary inline-block mt-6">Browse Products</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="section-title mb-8">
          Your Cart
          <span className="ml-3 text-xl font-normal text-gray-400">({totalItems} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="card p-4 flex items-start gap-4"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 transition-colors line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.category}</p>
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-dark-600 transition-colors text-gray-700 dark:text-gray-300 font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-dark-600 transition-colors text-gray-700 dark:text-gray-300 font-bold text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 dark:text-white">
                          EGP {(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemove(item)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>EGP {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={totalPrice >= 50 ? 'text-green-600 font-medium' : ''}>
                    {totalPrice >= 50 ? 'FREE' : 'EGP 9.99'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>EGP {(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-dark-600 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>EGP {(totalPrice + (totalPrice < 50 ? 9.99 : 0) + totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 50 && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-sm text-amber-700 dark:text-amber-400">
                  Add EGP {(50 - totalPrice).toFixed(2)} more for free shipping!
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full text-base py-4"
              >
                Proceed to Checkout
              </motion.button>
              <Link to="/shop" className="block text-center mt-3 text-sm text-brand-500 hover:text-brand-600 font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
