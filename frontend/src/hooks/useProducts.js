import { useState, useEffect, useCallback } from 'react';
import productApi from '../services/productApi.js';

export const useProducts = (initialPageSize = 10) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: initialPageSize, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await productApi.list({ search, page, pageSize: initialPageSize });
        setProducts(result.products);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    },
    [search, initialPageSize]
  );

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    products,
    pagination,
    search,
    setSearch,
    isLoading,
    error,
    refresh: fetchProducts,
  };
};

export default useProducts;
