import './App.css'
import { useState } from 'react'
import type { Product } from './types'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { products as mockProducts } from './data/products'

// Phase 2 & 3: Props + State & Events
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
        <HomePage
          products={mockProducts}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
