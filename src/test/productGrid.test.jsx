import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../components/ProductGrid';

describe('ProductGrid', () => {
  it('shows empty-state message when no products are provided', () => {
    render(<ProductGrid products={[]} loading={false} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting filters/i)).toBeInTheDocument();
  });

  it('shows skeleton cards when loading', () => {
    const { container } = render(<ProductGrid products={[]} loading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });
});
