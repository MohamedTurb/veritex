import { http, HttpResponse } from 'msw';

const API_BASE = process.env.VITE_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE}/auth/login`, () => {
    return HttpResponse.json(
      {
        success: true,
        user: {
          id: '1',
          email: 'testing@veritex.com',
          name: 'Test User',
          role: 'customer',
        },
        token: 'mock-jwt-token',
      },
      { status: 200 }
    );
  }),

  http.post(`${API_BASE}/auth/signup`, () => {
    return HttpResponse.json(
      {
        success: true,
        user: {
          id: '2',
          email: 'newuser@veritex.com',
          name: 'New User',
          role: 'customer',
        },
        token: 'mock-jwt-token',
      },
      { status: 201 }
    );
  }),

  // Products endpoints
  http.get(`${API_BASE}/products`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: 1,
            title: 'Premium Wireless Headphones',
            price: 129.99,
            category: 'Electronics',
            rating: 4.8,
          },
          {
            id: 2,
            title: 'Minimalist Leather Watch',
            price: 249.99,
            category: 'Accessories',
            rating: 4.9,
          },
        ],
      },
      { status: 200 }
    );
  }),

  http.get(`${API_BASE}/products/:id`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: 1,
          title: 'Premium Wireless Headphones',
          price: 129.99,
          category: 'Electronics',
          rating: 4.8,
          description: 'High-quality wireless headphones with ANC',
        },
      },
      { status: 200 }
    );
  }),

  // Orders endpoints
  http.post(`${API_BASE}/orders`, () => {
    return HttpResponse.json(
      {
        success: true,
        orderId: 'ORD-123456',
        total: 129.99,
        status: 'pending',
      },
      { status: 201 }
    );
  }),

  http.get(`${API_BASE}/orders/:id`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: 'ORD-123456',
          total: 129.99,
          status: 'processing',
          items: [{ id: 1, title: 'Premium Wireless Headphones', quantity: 1 }],
        },
      },
      { status: 200 }
    );
  }),

  // Wishlist endpoints
  http.get(`${API_BASE}/wishlists`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: [],
      },
      { status: 200 }
    );
  }),

  http.post(`${API_BASE}/wishlists`, () => {
    return HttpResponse.json(
      {
        success: true,
        id: 'wl-1',
      },
      { status: 201 }
    );
  }),

  // Reviews endpoints
  http.get(`${API_BASE}/reviews/product/:productId`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: 1,
            rating: 5,
            title: 'Great product!',
            comment: 'Very satisfied with this purchase.',
            author: 'John Doe',
            date: '2026-05-01',
          },
        ],
      },
      { status: 200 }
    );
  }),

  http.post(`${API_BASE}/reviews`, () => {
    return HttpResponse.json(
      {
        success: true,
        id: 'rev-1',
      },
      { status: 201 }
    );
  }),
];
