import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Welcome to SimpleStore</h1>
        <ProductList />
      </main>
      <Footer />
    </div>
  )
}

export default App
