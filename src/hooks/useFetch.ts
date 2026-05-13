import { useState, useEffect } from 'react';

// Phase 4: Custom hook for reusable API fetching logic
// Demonstrates: useEffect, dependency arrays, async fetching, error handling
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type FetchSource<T> = string | (() => Promise<T>);

function useFetch<T>(source: FetchSource<T>): UseFetchResult<T> {
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

        const result =
          typeof source === 'string'
            ? await (async () => {
                const response = await fetch(source, { signal: controller.signal });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json() as Promise<T>;
              })()
            : await source();

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
  }, [source]); // Re-run effect if source changes

  return { data, loading, error };
}

export default useFetch;
