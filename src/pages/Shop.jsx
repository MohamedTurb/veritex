import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductGrid } from '../components/ProductGrid';
import PageTransition from '../components/PageTransition';
import products from '../data/products';
import { useDebounce } from '../hooks';

const categories = ['All', 'Electronics', 'Fashion', 'Furniture', 'Accessories', 'Home & Kitchen', 'Sports'];
const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('0');
  const [availability, setAvailability] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);
  const searchBoxRef = useRef(null);

  const managedProducts = useMemo(() => {
    const saved = localStorage.getItem('veritex_admin_products');
    if (!saved) {
      return products.map(product => ({ ...product, stock: product.stock ?? (product.id % 5 === 0 ? 0 : 12 + (product.id % 9)) }));
    }

    try {
      return JSON.parse(saved).map(product => ({ ...product, stock: product.stock ?? 0 }));
    } catch {
      return products;
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (category !== 'All') params.category = category;
    setSearchParams(params);
  }, [debouncedSearch, category]);

  useEffect(() => {
    const closeOnOutsideClick = event => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const filtered = useMemo(() => {
    let list = [...managedProducts];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (minPrice !== '') list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice !== '') list = list.filter(p => p.price <= Number(maxPrice));
    list = list.filter(p => p.rating >= Number(minRating || 0));
    if (availability === 'in-stock') list = list.filter(p => (p.stock ?? 0) > 0);
    if (availability === 'out-of-stock') list = list.filter(p => (p.stock ?? 0) === 0);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [availability, category, debouncedSearch, managedProducts, maxPrice, minPrice, minRating, sort]);

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return [];
    }

    const bucket = new Set();
    for (const product of managedProducts) {
      if (product.title.toLowerCase().includes(q)) {
        bucket.add(product.title);
      }
      if (product.category.toLowerCase().includes(q)) {
        bucket.add(product.category);
      }
      if (bucket.size >= 6) {
        break;
      }
    }

    return [...bucket].slice(0, 6);
  }, [managedProducts, search]);

  const visibleProducts = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  useEffect(() => {
    setVisibleCount(8);
  }, [category, debouncedSearch, sort, minPrice, maxPrice, minRating, availability]);

  useEffect(() => {
    const onScroll = () => {
      if (visibleCount >= filtered.length) {
        return;
      }

      const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 240;
      if (reachedBottom) {
        setVisibleCount(prev => prev + 8);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filtered.length, visibleCount]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSort('default');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('0');
    setAvailability('all');
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Shop</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Showing {visibleProducts.length} of {filtered.length} products</p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1" ref={searchBoxRef}>
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products..."
              className="input-field pl-10"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-xl border border-gray-100 bg-white p-2 shadow-xl dark:border-dark-600 dark:bg-dark-800">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-dark-700"
                    onClick={() => {
                      setSearch(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field sm:w-48"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" min="0" className="input-field" placeholder="Min price" />
            <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" min="0" className="input-field" placeholder="Max price" />
            <select value={minRating} onChange={e => setMinRating(e.target.value)} className="input-field">
              <option value="0">All ratings</option>
              <option value="3">3+ stars</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
            <select value={availability} onChange={e => setAvailability(e.target.value)} className="input-field">
              <option value="all">All availability</option>
              <option value="in-stock">In stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={clearFilters} className="btn-secondary px-4 py-2 text-sm">Clear filters</button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-500 text-gray-600 dark:text-gray-300 hover:border-brand-400'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <ProductGrid products={visibleProducts} loading={loading} />

        {!loading && filtered.length > visibleProducts.length && (
          <div className="mt-8 text-center">
            <button type="button" className="btn-primary px-6 py-3 text-sm" onClick={() => setVisibleCount(prev => prev + 8)}>
              Load more products
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
