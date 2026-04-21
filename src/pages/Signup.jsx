import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import toast from 'react-hot-toast';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (form.password.length < 6) errs.password = 'At least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = signup(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success('Account created! Welcome to Veritex!', { style: { borderRadius: '12px', background: '#f97316', color: '#fff' } });
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">veritex<span className="text-brand-500">.</span></span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Join millions of happy shoppers</p>
          </div>
          <div className="card p-8">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-800">{errors.general}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
                { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: '••••••••' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                  <input name={field.name} type={field.type} value={form[field.name]} onChange={handleChange}
                    placeholder={field.placeholder} className={`input-field ${errors[field.name] ? 'border-red-400' : ''}`} />
                  {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
                </div>
              ))}
              <p className="text-xs text-gray-400">By signing up, you agree to our <a href="#" className="text-brand-500">Terms</a> and <a href="#" className="text-brand-500">Privacy Policy</a>.</p>
              <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                {loading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating...</> : 'Create Account'}
              </motion.button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account? <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
