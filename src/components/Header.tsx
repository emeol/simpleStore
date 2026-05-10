import './Header.css';

// Phase 2: Props - Header accepts storeName and cartCount from parent
interface HeaderProps {
  storeName: string;
  cartCount: number;
}

function Header({ storeName, cartCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="store-name">{storeName}</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/cart" className="nav-link">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
          <a href="/login" className="nav-link">Login</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
