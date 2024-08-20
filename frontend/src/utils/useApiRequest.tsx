import { useState } from 'react';

function useApiRequest<T>(apiFunction: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, execute };
}

export default useApiRequest;
