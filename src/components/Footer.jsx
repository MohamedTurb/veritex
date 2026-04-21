import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                veritex<span className="text-brand-500">.</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Modern shopping, reimagined. Quality products delivered to your doorstep.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'Electronics', 'Fashion', 'Furniture', 'Accessories'].map(item => (
                <li key={item}>
                  <Link
                    to={`/shop${item !== 'All Products' ? `?category=${item}` : ''}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Team', path: '/team' },
                { label: 'Services', path: '/services' },
                { label: 'Contact', path: '/contact' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Returns', 'Shipping Policy', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Veritex Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'Facebook'].map(social => (
              <a
                key={social}
                href="#"
                className="text-sm text-gray-400 hover:text-brand-500 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
