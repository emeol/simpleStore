import { Link } from 'react-router-dom';
import type { Product } from '../types';
import './ProductCard.css';

// Phase 5: React Router - title/image wrapped in Link to detail page
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
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} className="product-image" />
        <h3 className="product-title">{product.title}</h3>
      </Link>
      <p className="product-description">
        {product.description.substring(0, 100)}...
      </p>
      <p className="product-price">£{product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
