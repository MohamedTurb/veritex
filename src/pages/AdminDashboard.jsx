import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import productsSeed from '../data/products';
import { useLocalStorage } from '../hooks';

const tabs = [
  { key: 'products', label: 'Products' },
  { key: 'orders', label: 'Orders' },
  { key: 'users', label: 'Users' },
  { key: 'offers', label: 'Offers' },
];

const defaultOrders = [
  { id: 'ORD-1001', customer: 'Mona Ibrahim', total: 870.5, shippingStatus: 'processing', date: '2026-04-15' },
  { id: 'ORD-1002', customer: 'Ahmed Samir', total: 2199.99, shippingStatus: 'in-transit', date: '2026-04-16' },
  { id: 'ORD-1003', customer: 'Laila Salem', total: 149.0, shippingStatus: 'delivered', date: '2026-04-17' },
  { id: 'ORD-1004', customer: 'Omar Hany', total: 349.95, shippingStatus: 'pending', date: '2026-04-19' },
];

const defaultOffers = [
  { id: 'OFR-1', code: 'SPRING10', discount: 10, active: true, expiresAt: '2026-05-15' },
  { id: 'OFR-2', code: 'FREESHIP', discount: 0, active: true, expiresAt: '2026-04-30' },
  { id: 'OFR-3', code: 'VIP20', discount: 20, active: false, expiresAt: '2026-06-01' },
];

const shippingStatuses = ['pending', 'processing', 'in-transit', 'delivered', 'cancelled'];

const formatMoney = value => `EGP ${Number(value || 0).toFixed(2)}`;

function ProductsPanel({ products, setProducts }) {
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState({ title: '', price: '', category: '', rating: '4.5', stock: '15' });
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return products;
    }
    return products.filter(product =>
      product.title.toLowerCase().includes(q) || product.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  const resetDraft = () => {
    setDraft({ title: '', price: '', category: '', rating: '4.5', stock: '15' });
    setEditingId(null);
  };

  const onSubmit = event => {
    event.preventDefault();

    if (!draft.title.trim() || !draft.category.trim()) {
      toast.error('Please fill product title and category.');
      return;
    }

    const payload = {
      title: draft.title.trim(),
      category: draft.category.trim(),
      price: Number(draft.price) || 0,
      rating: Math.max(0, Math.min(5, Number(draft.rating) || 0)),
      stock: Math.max(0, Number(draft.stock) || 0),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
      description: 'Managed from Admin Dashboard.',
      reviews: 0,
      badge: null,
    };

    if (editingId) {
      setProducts(prev => prev.map(product => (
        product.id === editingId ? { ...product, ...payload } : product
      )));
      toast.success('Product updated successfully.');
    } else {
      const nextId = Math.max(...products.map(p => Number(p.id)), 0) + 1;
      setProducts(prev => [{ id: nextId, ...payload }, ...prev]);
      toast.success('Product added successfully.');
    }

    resetDraft();
  };

  const onEdit = product => {
    setEditingId(product.id);
    setDraft({
      title: product.title,
      price: String(product.price),
      category: product.category,
      rating: String(product.rating),
      stock: String(product.stock ?? 10),
    });
  };

  const onDelete = id => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success('Product deleted.');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="card p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingId ? 'Edit Product' : 'Add Product'}
          </h3>
          {editingId && (
            <button type="button" className="text-sm font-semibold text-gray-500" onClick={resetDraft}>Cancel</button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} className="input-field lg:col-span-2" placeholder="Product title" />
          <input value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value }))} className="input-field" placeholder="Category" />
          <input value={draft.price} onChange={e => setDraft(d => ({ ...d, price: e.target.value }))} type="number" step="0.01" min="0" className="input-field" placeholder="Price" />
          <input value={draft.rating} onChange={e => setDraft(d => ({ ...d, rating: e.target.value }))} type="number" step="0.1" min="0" max="5" className="input-field" placeholder="Rating" />
          <input value={draft.stock} onChange={e => setDraft(d => ({ ...d, stock: e.target.value }))} type="number" min="0" className="input-field" placeholder="Stock" />
        </div>
        <button type="submit" className="btn-primary mt-4">{editingId ? 'Save Changes' : 'Add Product'}</button>
      </form>

      <div className="card p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Products Inventory</h3>
          <input value={query} onChange={e => setQuery(e.target.value)} className="input-field sm:w-72" placeholder="Search product or category" />
        </div>

        {!filtered.length ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-dark-500 dark:text-gray-400">
            No products found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-dark-700 dark:text-gray-400">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3 pr-4">Rating</th>
                  <th className="py-3 pr-4">Stock</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-dark-700">
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{product.title}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{formatMoney(product.price)}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{product.rating}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{product.stock ?? 0}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => onEdit(product)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-dark-500 dark:text-gray-200">Edit</button>
                        <button type="button" onClick={() => onDelete(product.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-500/40 dark:text-red-400">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersPanel({ orders, setOrders }) {
  const updateStatus = (id, nextStatus) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, shippingStatus: nextStatus } : order));
    toast.success('Shipping status updated.');
  };

  return (
    <div className="card p-5 md:p-6">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Orders & Shipping Status</h3>
      {!orders.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-dark-500 dark:text-gray-400">
          No orders available yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="rounded-2xl border border-gray-100 p-4 dark:border-dark-700">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.id} · {order.customer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.date} · {formatMoney(order.total)}</p>
                </div>
                <select
                  className="input-field sm:w-48"
                  value={order.shippingStatus}
                  onChange={e => updateStatus(order.id, e.target.value)}
                >
                  {shippingStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsersPanel({ users, setUsers }) {
  const updateRole = (id, role) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, role } : user));
    toast.success('User role updated.');
  };

  return (
    <div className="card p-5 md:p-6">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Users Management</h3>
      {!users.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-dark-500 dark:text-gray-400">
          No users registered yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-500 dark:border-dark-700 dark:text-gray-400">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-dark-700">
                  <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 pr-4">
                    <select className="input-field w-40" value={user.role || 'user'} onChange={e => updateRole(user.id, e.target.value)}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{new Date(user.joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function OffersPanel({ offers, setOffers }) {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('10');
  const [expiresAt, setExpiresAt] = useState('');

  const addOffer = event => {
    event.preventDefault();
    if (!code.trim()) {
      toast.error('Offer code is required.');
      return;
    }

    setOffers(prev => [
      {
        id: `OFR-${Date.now()}`,
        code: code.trim().toUpperCase(),
        discount: Number(discount) || 0,
        active: true,
        expiresAt: expiresAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      },
      ...prev,
    ]);

    setCode('');
    setDiscount('10');
    setExpiresAt('');
    toast.success('Offer created.');
  };

  const toggleOffer = id => {
    setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, active: !offer.active } : offer));
  };

  const removeOffer = id => {
    setOffers(prev => prev.filter(offer => offer.id !== id));
    toast.success('Offer removed.');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addOffer} className="card p-5 md:p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create Offer</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input-field" placeholder="Code (e.g., SUMMER15)" value={code} onChange={e => setCode(e.target.value)} />
          <input className="input-field" type="number" min="0" max="100" placeholder="Discount %" value={discount} onChange={e => setDiscount(e.target.value)} />
          <input className="input-field" type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary mt-4">Add Offer</button>
      </form>

      <div className="card p-5 md:p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Offers Management</h3>
        {!offers.length ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-dark-500 dark:text-gray-400">
            No offers available.
          </div>
        ) : (
          <div className="space-y-3">
            {offers.map(offer => (
              <div key={offer.id} className="rounded-2xl border border-gray-100 p-4 dark:border-dark-700">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{offer.code}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {offer.discount ? `${offer.discount}% off` : 'Free shipping'} · expires {offer.expiresAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => toggleOffer(offer.id)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-dark-500 dark:text-gray-200">
                      {offer.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button type="button" onClick={() => removeOffer(offer.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-500/40 dark:text-red-400">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useLocalStorage('veritex_admin_products', productsSeed.map(product => ({
    ...product,
    stock: product.stock ?? (product.id % 5 === 0 ? 0 : 12 + (product.id % 9)),
  })));
  const [orders, setOrders] = useLocalStorage('veritex_admin_orders', defaultOrders);
  const [users, setUsers] = useLocalStorage('veritex_users', []);
  const [offers, setOffers] = useLocalStorage('veritex_admin_offers', defaultOffers);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-dark-700 dark:bg-dark-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage products, shipping statuses, users, and marketing offers from one place.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'bg-brand-500 text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-brand-400 dark:border-dark-500 dark:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'products' && <ProductsPanel products={products} setProducts={setProducts} />}
        {activeTab === 'orders' && <OrdersPanel orders={orders} setOrders={setOrders} />}
        {activeTab === 'users' && <UsersPanel users={users} setUsers={setUsers} />}
        {activeTab === 'offers' && <OffersPanel offers={offers} setOffers={setOffers} />}
      </div>
    </PageTransition>
  );
}
