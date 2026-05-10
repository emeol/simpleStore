import type { Product } from '../types';
import ProductCard from './ProductCard';
import './ProductList.css';

// Phase 2: Props - ProductList accepts products and callback from parent
interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
