import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="store-name">SimpleStore</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/cart" className="nav-link">
            Cart
            <span className="cart-badge">0</span>
          </a>
          <a href="/login" className="nav-link">Login</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
