import { Link } from 'react-router-dom';
import type { Product } from '../types';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import './CartPage.css';

// Phase 5: React Router - dedicated cart page
interface CartPageProps {
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
}

function CartPage({ cartItems, onRemoveFromCart }: CartPageProps) {
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItem
              key={`${item.id}-${index}`}
              product={item}
              onRemove={onRemoveFromCart}
            />
          ))}
        </div>

        <CartSummary cartItems={cartItems} />
      </div>
    </div>
  );
}

export default CartPage;
