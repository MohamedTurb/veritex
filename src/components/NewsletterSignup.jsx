import { useState } from 'react';
import { useNewsletter } from '../context/NewsletterContext';
import toast from 'react-hot-toast';

export default function NewsletterSignup() {
  const { subscribe } = useNewsletter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (subscribe(email)) {
        toast.success('Subscribed to newsletter!');
        setEmail('');
      } else {
        toast.error('Invalid email or already subscribed');
      }
    } catch (err) {
      toast.error('Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-semibold text-white">Subscribe to Newsletter</h3>
      <p className="text-sm text-gray-300">Get the latest updates and exclusive offers</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-4 py-2 disabled:opacity-50"
        >
          {loading ? '...' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}
