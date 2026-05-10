import { Link } from 'react-router-dom';
import './Header.css';

// Phase 5: React Router - <Link> replaces <a> to prevent full page reload
interface HeaderProps {
  storeName: string;
  cartCount: number;
}

function Header({ storeName, cartCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="store-name-link">
          <h1 className="store-name">{storeName}</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
