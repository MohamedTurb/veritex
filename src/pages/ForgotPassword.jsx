import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Valid email required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('veritex_users') || '[]');
    const exists = users.some(user => user.email?.toLowerCase() === normalizedEmail);

    if (!exists) {
      setError('We could not find an account with that email');
      setSent(false);
      return;
    }

    setError('');
    setSent(true);
    toast.success('Password reset link sent to your inbox.');
  };

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">veritex<span className="text-brand-500">.</span></span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">We will email you a reset link if the account exists.</p>
          </div>

          <div className="card p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full py-3.5"
              >
                Send Reset Link
              </motion.button>
            </form>

            {sent && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
                Reset link sent. Check your inbox and return to sign in.
              </div>
            )}

            <button type="button" onClick={() => navigate('/login')} className="text-sm font-semibold text-brand-500 hover:text-brand-600">
              Back to login
            </button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}