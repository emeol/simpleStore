import { Link } from 'react-router-dom';
import './NotFoundPage.css';

// Phase 5: React Router - catch-all route for unknown URLs
function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-message">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="not-found-link">← Go back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
