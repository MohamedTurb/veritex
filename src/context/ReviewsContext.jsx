import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const ReviewsContext = createContext();

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return { ...state, reviews: action.payload };
    case 'ADD': {
      const newReview = { ...action.payload, id: Date.now(), date: new Date().toISOString() };
      return { ...state, reviews: [...state.reviews, newReview] };
    }
    case 'DELETE':
      return { ...state, reviews: state.reviews.filter(r => r.id !== action.payload) };
    case 'UPDATE':
      return {
        ...state,
        reviews: state.reviews.map(r => r.id === action.payload.id ? { ...r, ...action.payload.data } : r),
      };
    default:
      return state;
  }
};

export function ReviewsProvider({ children }) {
  const [state, dispatch] = useReducer(reviewsReducer, { reviews: [] });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('veritex_reviews') || '[]');
      if (Array.isArray(saved)) dispatch({ type: 'LOAD', payload: saved });
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('veritex_reviews', JSON.stringify(state.reviews));
    } catch (e) {}
  }, [state.reviews]);

  const addReview = (review) => dispatch({ type: 'ADD', payload: review });
  const deleteReview = (id) => dispatch({ type: 'DELETE', payload: id });
  const updateReview = (id, data) => dispatch({ type: 'UPDATE', payload: { id, data } });
  const getProductReviews = (productId) => state.reviews.filter(r => r.productId === productId);
  const getAverageRating = (productId) => {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  };

  return (
    <ReviewsContext.Provider value={{ reviews: state.reviews, addReview, deleteReview, updateReview, getProductReviews, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider');
  return ctx;
};
