/* eslint-disable no-undef */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

const seedAdminUser = () => {
  localStorage.setItem('veritex_user', JSON.stringify({
    id: 'admin-qa',
    name: 'QA Admin',
    email: 'qa-admin@veritex.com',
    role: 'admin',
    joined: new Date().toISOString(),
  }));
};

describe('Admin dashboard QA flows', () => {
  beforeEach(() => {
    localStorage.clear();
    seedAdminUser();
  });

  it('allows an admin to add a new product', async () => {
    window.history.pushState({}, '', '/admin');

    render(<App />);

    fireEvent.change(await screen.findByPlaceholderText('Product title'), {
      target: { value: 'QA Test Product' },
    });
    fireEvent.change(screen.getByPlaceholderText('Category'), {
      target: { value: 'Testing' },
    });
    fireEvent.change(screen.getByPlaceholderText('Price'), {
      target: { value: '49.99' },
    });
    fireEvent.change(screen.getByPlaceholderText('Rating'), {
      target: { value: '4.8' },
    });
    fireEvent.change(screen.getByPlaceholderText('Stock'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    await waitFor(() => {
      expect(screen.getByText('QA Test Product')).toBeInTheDocument();
    });
  });

  it('allows an admin to create an active offer', async () => {
    window.history.pushState({}, '', '/admin');

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /offers/i }));

    fireEvent.change(screen.getByPlaceholderText('Code (e.g., SUMMER15)'), {
      target: { value: 'SAVE10' },
    });
    fireEvent.change(screen.getByPlaceholderText('Discount %'), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add offer/i }));

    await waitFor(() => {
      expect(screen.getByText('SAVE10')).toBeInTheDocument();
    });
  });
});