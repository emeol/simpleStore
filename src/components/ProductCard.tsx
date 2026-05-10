import type { Product } from '../types';
import './ProductCard.css';

// Phase 1: Hardcoded product for demonstration
// In Phase 2, this will accept a product prop
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">
        {product.description.substring(0, 100)}...
      </p>
      <p className="product-price">£{product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
