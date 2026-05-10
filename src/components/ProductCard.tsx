import type { Product } from '../types';
import './ProductCard.css';

// Phase 2: Props - callback function passed from parent
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">
        {product.description.substring(0, 100)}...
      </p>
      <p className="product-price">£{product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
