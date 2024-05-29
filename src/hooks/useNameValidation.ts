import { useState, useCallback, useRef } from 'react';

const useNameValidation = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const latestValue = useRef<string>(name);

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
      if (value.trim() === '') {
        setError(null);
        return;
      }
      if (!nameRegex.test(value)) {
        setError('Name must contain only letters and spaces.');
        return;
      }
      setLoading(true);
      latestValue.current = value;  // Update latest value before making API call

      try {

        const isValid = await validateNameWithAPI(value);
        if (latestValue.current === value) {  // Only update if the latest value matches
          if (!isValid) {
            setError('Name already exists.');
          } else {
            setError(null);
          }
          setLoading(false);  // Set loading to false only if it's the latest value
        }
      } catch (error) {
        if (latestValue.current === value) {  // Only update if the latest value matches
          setError('Failed to validate name.');
          setLoading(false);  // Set loading to false only if it's the latest value
        }
      }
    }, 800),
    []
  );

  const handleChange = (value = '') => {
    setName(value);
    latestValue.current = value;  // Update latest value on change
    setError(null);
    handleAsyncValidation(value);
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
