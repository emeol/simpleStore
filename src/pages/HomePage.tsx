import { useState, useMemo } from 'react';
import type { Product } from '../types';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import './HomePage.css';

// Phase 3: State & Events - Lifting state up, deriving filtered products
interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function HomePage({ products, onAddToCart }: HomePageProps) {
  // Local state for search and category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories from products (derived once on every render)
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // DERIVED STATE: Filter products based on search term and category
  // This is NOT state - it's computed from state on every render
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

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
