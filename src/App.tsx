import './App.css'
import { useState } from 'react'
import type { Product } from './types'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import { products as mockProducts } from './data/products'

// Phase 2: Props - App manages cart state and passes props down the tree
function App() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const storeName = 'SimpleStore'

  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.title}`)
    setCartItems([...cartItems, product])
  }

  return (
    <div className="app">
      <Header storeName={storeName} cartCount={cartItems.length} />
      <main className="main-content">
        <h1 className="page-title">Welcome to {storeName}</h1>
        <ProductList 
          products={mockProducts}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
