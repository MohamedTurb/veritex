import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProductCard from '../../components/ProductCard';

expect.extend(toHaveNoViolations);

describe('ProductCard Accessibility', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    description: 'A test product',
    rating: 4.5,
    reviews: 10,
    badge: 'Sale',
  };

  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <ProductCard product={mockProduct} onAddToCart={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper image alt text', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const image = screen.getByAltText(mockProduct.title);
    expect(image).toBeInTheDocument();
  });

  it('should have semantic button elements', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
