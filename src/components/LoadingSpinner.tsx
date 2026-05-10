import './LoadingSpinner.css';

// Phase 4: Simple loading spinner component
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
  );
}

export default LoadingSpinner;
