import type { Product } from '../types';
import './CartItem.css';

// Phase 5: Cart item row with remove button
interface CartItemProps {
  product: Product;
  onRemove: (productId: number) => void;
}

function CartItem({ product, onRemove }: CartItemProps) {
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.title} className="cart-item-image" />
      <div className="cart-item-info">
        <h3 className="cart-item-title">{product.title}</h3>
        <span className="cart-item-category">{product.category}</span>
      </div>
      <p className="cart-item-price">£{product.price.toFixed(2)}</p>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(product.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
