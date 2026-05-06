import { useState } from 'react';
import { useReviews } from '../context/ReviewsContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewsSection({ productId }) {
  const { getProductReviews, addReview, deleteReview } = useReviews();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const reviews = getProductReviews(productId);
  const userReview = reviews.find(r => r.userId === user?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    addReview({ productId, rating, title, text, userId: user.id, userName: user.name });
    toast.success('Review submitted!');
    setTitle('');
    setText('');
    setRating(5);
    setShowForm(false);
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-600">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

      {!userReview && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-4 py-2 mb-6"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="card p-6 mb-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRating(r)}
                    onMouseEnter={() => setHoverRating(r)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-3xl transition-colors ${
                      (hoverRating || rating) >= r ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Summary of your experience"
                className="input-field w-full"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Review</label>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="input-field w-full"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button type="submit" className="btn-primary px-4 py-2">Submit Review</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary px-4 py-2">Cancel</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map(review => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 border border-gray-100 dark:border-dark-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.userName}</span>
                    <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className={`text-lg ${s <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <h4 className="font-semibold mt-2">{review.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{review.text}</p>
                </div>
                {user?.id === review.userId && (
                  <button
                    onClick={() => { deleteReview(review.id); toast.success('Review deleted'); }}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
