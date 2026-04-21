import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@veritex.shop', href: 'mailto:hello@veritex.shop' },
  { icon: '📞', label: 'Phone', value: '+20155537991', href: 'tel:+20155537991' },
  { icon: '📍', label: 'Address', value: 'Egyptian Chinese Universty', href: '#' },
  { icon: '🕒', label: 'Hours', value: 'Mon–Fri, 9am–6pm EST', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    toast.success('Message sent! We\'ll get back to you within 24 hours.', {
      duration: 4000,
      style: { borderRadius: '12px', background: '#f97316', color: '#fff' },
    });
  };

  return (
    <PageTransition>
      <section className="bg-gradient-to-br from-gray-900 to-dark-800 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-brand-500/20 text-brand-400 mb-4">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-bold">We'd Love to<br /><span className="text-gradient">Hear From You</span></h1>
            <p className="mt-6 text-gray-400 text-lg">Have a question, feedback, or just want to say hi? Drop us a message.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Info</h2>
            {contactInfo.map(info => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-xl shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-gray-900 dark:text-white font-medium hover:text-brand-500 transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-dark-600">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                  <a key={s} href="#" className="px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-dark-500 text-gray-600 dark:text-gray-400 rounded-lg hover:border-brand-400 hover:text-brand-500 transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={`input-field ${errors.subject ? 'border-red-400' : ''}`} />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us more..." className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                <p className="text-xs text-gray-400 mt-1">{form.message.length}/500</p>
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                ) : 'Send Message →'}
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
