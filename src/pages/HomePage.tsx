import { useState, useMemo } from 'react';
import type { Product } from '../types';
import useFetch from '../hooks/useFetch';
import { fetchCategories, fetchProducts } from '../services/productService';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

// Phase 4: Effects & API Fetching - fetch products and categories from API
interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

function HomePage({ onAddToCart }: HomePageProps) {
  // Fetch products from API using custom hook
  const {
    data: products,
    loading: productsLoading,
    error: productsError
  } = useFetch<Product[]>(fetchProducts);

  // Fetch categories from API using custom hook
  const {
    data: categoryList,
    loading: categoriesLoading,
    error: categoriesError
  } = useFetch<string[]>(fetchCategories);

  // Local state for search and category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Use fetched categories, or empty array if loading/error
  const categories = useMemo(() => {
    return categoryList || [];
  }, [categoryList]);

  // DERIVED STATE: Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Show loading spinner while fetching
  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  // Show error message if fetch fails
  if (productsError || categoriesError) {
    return (
      <div className="error-container">
        <p className="error-message">
          ❌ Failed to load products. Please try again later.
        </p>
        {productsError && <p className="error-detail">{productsError}</p>}
        {categoriesError && <p className="error-detail">{categoriesError}</p>}
      </div>
    );
  }

  return (
    <div className="home-page">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

export default HomePage;
