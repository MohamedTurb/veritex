import PageTransition from '../components/PageTransition';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (!items || items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-gray-500">Add products to your wishlist to review them later.</p>
          <div className="mt-6">
            <Link to="/shop" className="btn-primary px-4 py-2">Browse shop</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="section-title">Wishlist</h1>
          <button onClick={clearWishlist} className="btn-secondary px-3 py-2">Clear wishlist</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <div key={p.id} className="card p-4">
              <div className="aspect-square bg-gray-50 overflow-hidden rounded-lg mb-3">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{p.title}</h3>
                <p className="text-xs text-gray-500">{p.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold">EGP {p.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => addItem(p)} className="btn-primary px-3 py-1.5 text-xs">Add to cart</button>
                    <button onClick={() => removeFromWishlist(p.id)} className="btn-secondary px-3 py-1.5 text-xs">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
