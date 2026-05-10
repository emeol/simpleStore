import { useState, useEffect } from 'react';

// Phase 4: Custom hook for reusable API fetching logic
// Demonstrates: useEffect, dependency arrays, async fetching, error handling
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Abort controller to handle cleanup (prevent state updates on unmounted components)
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, { signal: controller.signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Ignore abort errors (normal cleanup)
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function: abort the fetch if component unmounts
    return () => controller.abort();
  }, [url]); // Re-run effect if URL changes

  return { data, loading, error };
}

export default useFetch;
