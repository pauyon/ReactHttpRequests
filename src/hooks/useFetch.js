import { useEffect, useState } from 'react';

// Custom Hook: useFetch
// This hook abstracts the fetching logic and manages loading, error, and data states.
export function useFetch(fetchFunction, initialValue) {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchFunction();
        setData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data' });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction]);

  return { 
    isLoading, 
    data, 
    setData,
    error };
}