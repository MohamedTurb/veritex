import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';

const Field = ({ label, name, type = 'text', placeholder, value, onChange, error, span = 1 }) => (
  <div className={span === 2 ? 'sm:col-span-2' : ''}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'cardNumber') v = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (name === 'expiry') v = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
    if (name === 'cvv') v = value.replace(/\D/g, '').slice(0, 4);
    setForm(f => ({ ...f, [name]: v }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Invalid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.cardName.trim()) e.cardName = 'Required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Invalid card number';
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Format: MM/YY';
    if (form.cvv.length < 3) e.cvv = 'Invalid CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    navigate('/success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="section-title mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-10">
          {[{ n: 1, label: 'Shipping' }, { n: 2, label: 'Payment' }].map(s => (
            <div key={s.n} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step === s.n ? 'text-brand-500' : step > s.n ? 'text-green-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  step === s.n ? 'border-brand-500 bg-brand-500 text-white' :
                  step > s.n ? 'border-green-500 bg-green-500 text-white' :
                  'border-gray-300 dark:border-dark-500'
                }`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="font-medium text-sm hidden sm:block">{s.label}</span>
              </div>
              {s.n < 2 && <div className={`w-16 h-0.5 ${step > s.n ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-600'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} error={errors.firstName} />
                    <Field label="Last Name" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} error={errors.lastName} />
                    <Field label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                    <Field label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} error={errors.phone} />
                    <Field label="Address" name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange} error={errors.address} span={2} />
                    <Field label="City" name="city" placeholder="New York" value={form.city} onChange={handleChange} error={errors.city} />
                    <Field label="ZIP Code" name="zip" placeholder="10001" value={form.zip} onChange={handleChange} error={errors.zip} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label>
                      <select name="country" value={form.country} onChange={handleChange} className="input-field">
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                    <Field label="State / Province" name="state" placeholder="NY" value={form.state} onChange={handleChange} error={errors.state} />
                  </div>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext} className="btn-primary mt-6 w-full py-4">
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Payment Details</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                    <span>🔒</span> Your payment info is encrypted and secure.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name on Card" name="cardName" placeholder="John Doe" value={form.cardName} onChange={handleChange} error={errors.cardName} span={2} />
                    <Field label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} error={errors.cardNumber} span={2} />
                    <Field label="Expiry Date" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} error={errors.expiry} />
                    <Field label="CVV" name="cvv" placeholder="123" value={form.cvv} onChange={handleChange} error={errors.cvv} />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-4">← Back</button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : `Pay EGP ${total.toFixed(2)}`}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">EGP {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 dark:border-dark-600 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>EGP {totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `EGP ${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax</span><span>EGP {tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-dark-600">
                <span>Total</span><span>EGP {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
