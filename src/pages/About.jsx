import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const values = [
  { icon: '🎯', title: 'Quality First', desc: 'Every product is hand-curated to meet our strict quality standards before it reaches your door.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Same-day dispatch for orders placed before 2pm, with real-time tracking every step of the way.' },
  { icon: '💚', title: 'Sustainability', desc: 'We offset 100% of our shipping emissions and partner with eco-conscious brands.' },
  { icon: '🤝', title: 'Community', desc: 'Over 2 million happy customers who trust us to deliver quality products at fair prices.' },
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-dark-800 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-brand-500/20 text-brand-400 mb-4">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Redefining the way<br />
              <span className="text-gradient">you shop online.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Veritex was founded in 2020 with a simple mission: make premium products accessible to everyone, without compromise on quality or experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '2M+', label: 'Happy Customers' },
            { value: '50k+', label: 'Products Listed' },
            { value: '99%', label: 'Satisfaction Rate' },
            { value: '45', label: 'Countries Served' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-brand-500">{stat.value}</div>
              <div className="mt-1 text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 dark:bg-dark-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What We Stand For</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="section-title mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          We believe everyone deserves access to great products at honest prices. By working directly with manufacturers
          and cutting out unnecessary middlemen, we're able to pass real savings on to you — without ever compromising
          on the quality or experience you deserve.
        </p>
      </section>
    </PageTransition>
  );
}
