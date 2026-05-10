import type { Product } from '../types';
import './CartSummary.css';

// Phase 5: Cart total derived from cart items (NOT state)
interface CartSummaryProps {
  cartItems: Product[];
}

function CartSummary({ cartItems }: CartSummaryProps) {
  // Derived values: computed from cartItems, not stored as state
  const itemCount = cartItems.length;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>
      <div className="summary-row">
        <span>Items ({itemCount})</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span className="free-shipping">Free</span>
      </div>
      <div className="summary-row summary-total">
        <span>Total</span>
        <span>£{subtotal.toFixed(2)}</span>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
}

export default CartSummary;
