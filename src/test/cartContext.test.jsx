import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

function CartProbe() {
  const { addItem, totalItems, totalPrice } = useCart();

  return (
    <div>
      <button
        type="button"
        onClick={() => addItem({ id: 1, title: 'Wireless Mouse', price: 120 })}
      >
        Add Item
      </button>
      <span data-testid="items">{totalItems}</span>
      <span data-testid="total">{totalPrice}</span>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates totals when adding items', () => {
    render(
      <CartProvider>
        <CartProbe />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));

    expect(screen.getByTestId('items')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('240');
  });
});
