import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import toast from 'react-hot-toast';

const stats = [
  { label: 'Orders Placed', value: '12', icon: '📦' },
  { label: 'Wishlist Items', value: '8', icon: '❤️' },
  { label: 'Reviews Written', value: '5', icon: '⭐' },
  { label: 'Loyalty Points', value: '1,240', icon: '🏆' },
];

const recentOrders = [
  { id: 'VTX-A3B2C1', date: '2025-01-15', status: 'Delivered', total: 'EGP 189.97', items: 3 },
  { id: 'VTX-D4E5F6', date: '2025-01-08', status: 'In Transit', total: 'EGP 59.99', items: 1 },
  { id: 'VTX-G7H8I9', date: '2024-12-28', status: 'Delivered', total: 'EGP 344.95', items: 4 },
];

const statusColors = {
  'Delivered': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Processing': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-500/25">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hello, {user.name}! 👋</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:border-red-400">
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-5"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">Recent Orders</h2>
              <Link to="/shop" className="text-sm text-brand-500 hover:text-brand-600 font-medium">Shop More</Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl flex-wrap gap-3">
                  <div>
                    <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account & Cart */}
          <div className="space-y-4">
            {/* Cart Summary */}
            <div className="card p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Current Cart</h2>
              {totalItems > 0 ? (
                <>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <span>Items</span><span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Subtotal</span><span>EGP {totalPrice.toFixed(2)}</span>
                  </div>
                  <Link to="/cart" className="btn-primary w-full text-center block mt-4 py-2.5 text-sm">View Cart</Link>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Your cart is empty</p>
                  <Link to="/shop" className="btn-primary text-sm py-2 px-4 inline-block">Start Shopping</Link>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="card p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Profile</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.joined ? new Date(user.joined).getFullYear() : '2025'}
                  </span>
                </div>
              </div>
              <button className="btn-secondary w-full mt-4 text-sm py-2.5">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
