import { products } from '../data/products';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
