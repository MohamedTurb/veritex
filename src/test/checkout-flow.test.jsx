import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

const seedCheckoutState = () => {
  localStorage.setItem('veritex_cart', JSON.stringify([
    {
      id: 101,
      title: 'QA Hoodie',
      price: 100,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    },
  ]));

  localStorage.setItem('veritex_admin_offers', JSON.stringify([
    {
      id: 'OFR-QA',
      code: 'SAVE10',
      discount: 10,
      active: true,
      expiresAt: '2026-12-31',
    },
  ]));
};

describe('Checkout QA flow', () => {
  beforeEach(() => {
    localStorage.clear();
    seedCheckoutState();
  });

  it('applies an active coupon and completes checkout', async () => {
    window.history.pushState({}, '', '/checkout');

    render(<App />);

    fireEvent.change(await screen.findByPlaceholderText('John'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Doe'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 000-0000'), { target: { value: '+1 (555) 123-4567' } });
    fireEvent.change(screen.getByPlaceholderText('123 Main Street'), { target: { value: '123 Main Street' } });
    fireEvent.change(screen.getByPlaceholderText('New York'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByPlaceholderText('10001'), { target: { value: '10001' } });
    fireEvent.change(screen.getByPlaceholderText('NY'), { target: { value: 'NY' } });

    fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

    fireEvent.change(screen.getByPlaceholderText('SUMMER15'), { target: { value: 'SAVE10' } });
    fireEvent.click(screen.getByRole('button', { name: /apply code/i }));

    expect(await screen.findByText(/applied: save10/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pay egp 99.00/i })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), { target: { value: '12/29' } });
    fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /pay egp 99.00/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /order confirmed!/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});