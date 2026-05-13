import { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Product } from '../types';
import useFetch from '../hooks/useFetch';
import { fetchProductById } from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';
import './ProductDetailPage.css';

// Phase 5: React Router - useParams to read :id from URL, useNavigate to redirect
interface ProductDetailPageProps {
  onAddToCart: (product: Product) => void;
}

function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  // useParams reads the :id segment from the current URL
  const { id } = useParams<{ id: string }>();

  // useNavigate returns a function to redirect programmatically
  const navigate = useNavigate();

  const productId = Number(id);

  const productFetcher = useCallback(() => {
    if (!Number.isInteger(productId) || productId <= 0) {
      return Promise.reject(new Error('Invalid product ID'));
    }

    return fetchProductById(productId);
  }, [productId]);

  const { data: product, loading, error } = useFetch<Product>(productFetcher);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product);
      // useNavigate: programmatic navigation after adding to cart
      navigate('/cart');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="detail-error">
        <p>Product not found.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="detail-content">
        <div className="detail-image-container">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">£{product.price.toFixed(2)}</p>
          <button className="detail-add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
