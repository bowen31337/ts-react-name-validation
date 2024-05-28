import { useState, useCallback, useRef } from 'react';

const useNameValidation = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const nameRegex = /^[A-Za-z\s]+$/;

  const validateNameWithAPI = (name: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name.toLowerCase() === 'john doe') {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 600);
    });
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    return (...args: any[]) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => func(...args), wait);
    };
  };

  const handleAsyncValidation = useCallback(
    debounce(async (value: string) => {
      setLoading(true);
      try {
        const isValid = await validateNameWithAPI(value);
        if (!isValid) {
          setError('Name already exists.');
        } else {
          setError(null);
        }
      } catch (error) {
        setError('Failed to validate name.');
      } finally {
        setLoading(false);
      }
    }, 800),
    []
  );

  const handleChange = (value = '') => {
    if (value.trim() === '') {
      setError(null);
      return;
    }
    if (!nameRegex.test(value)) {
      setError('Name must contain only letters and spaces.');
      return;
    } else {
      setError(null);
      handleAsyncValidation(value);
    }
  };

  return {
    name,
    error,
    loading,
    setName,
    handleChange,
  };
};

export default useNameValidation;
