import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const services = [
  { icon: '🚀', title: 'Express Delivery', desc: 'Same-day and next-day delivery available in major cities. Real-time GPS tracking on every order.', color: 'from-blue-500 to-indigo-600' },
  { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free returns. Just request a pickup and we handle the rest — no questions asked.', color: 'from-green-500 to-emerald-600' },
  { icon: '🛡️', title: 'Buyer Protection', desc: 'Every purchase is protected by our 100% satisfaction guarantee. If something\'s wrong, we make it right.', color: 'from-purple-500 to-violet-600' },
  { icon: '🤖', title: 'AI Recommendations', desc: 'Our smart engine learns your preferences and surfaces products you\'ll actually love.', color: 'from-pink-500 to-rose-600' },
  { icon: '💳', title: 'Flexible Payments', desc: 'Buy now, pay later with 0% interest. Split any purchase into 4 easy installments.', color: 'from-amber-500 to-orange-600' },
  { icon: '📦', title: 'Subscription Boxes', desc: 'Curated monthly boxes tailored to your interests, delivered at member-exclusive pricing.', color: 'from-teal-500 to-cyan-600' },
];

export default function Services() {
  return (
    <PageTransition>
      <section className="bg-gradient-to-br from-gray-900 to-dark-800 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-brand-500/20 text-brand-400 mb-4">What We Offer</span>
            <h1 className="text-5xl md:text-6xl font-bold">Services Built<br /><span className="text-gradient">For You</span></h1>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Everything you need for a seamless shopping experience, from discovery to delivery and beyond.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card p-8 hover:shadow-xl dark:hover:shadow-dark-900/60 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-brand-500 text-white py-20 mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto rounded-3xl mb-20">
        <div className="px-8 md:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Need Help Choosing?</h2>
          <p className="mt-3 text-orange-100 text-lg">Our product experts are available 24/7 to help you find exactly what you need.</p>
          <a href="/contact" className="inline-block mt-6 px-8 py-3 bg-white text-brand-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
            Talk to an Expert
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
