import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { Product } from './types'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'

// Phase 5: React Router - client-side routing with <Routes> and <Route>
function App() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const storeName = 'SimpleStore'

  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.title}`)
    setCartItems(prev => [...prev, product])
  }

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  return (
    <div className="app">
      <Header storeName={storeName} cartCount={cartItems.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
