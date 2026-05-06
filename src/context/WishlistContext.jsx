import { createContext, useContext, useEffect, useReducer } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.payload };
    case 'ADD': {
      if (state.items.find(i => i.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('veritex_wishlist') || 'null');
      if (Array.isArray(saved)) dispatch({ type: 'LOAD', payload: saved });
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('veritex_wishlist', JSON.stringify(state.items));
    } catch (e) {}
  }, [state.items]);

  const addToWishlist = (product) => dispatch({ type: 'ADD', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR' });
  const isInWishlist = (id) => state.items.some(i => i.id === id);
  const toggleWishlist = (product) => (isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product));

  return (
    <WishlistContext.Provider value={{ items: state.items, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
