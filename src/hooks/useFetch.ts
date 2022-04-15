import { useState } from 'react';

export default function UseFetch(callback: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);

      await callback();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetching, isLoading, errorMessage };
}
