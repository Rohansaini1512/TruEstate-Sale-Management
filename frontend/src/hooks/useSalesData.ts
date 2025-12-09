import { useState, useEffect } from 'react';
import salesAPI, { SalesQueryParams, PaginatedResponse, FilterOptions, Sale } from '../services/salesAPI';


export type { Sale } from '../services/salesAPI';

export function useSalesData(initialParams?: SalesQueryParams) {
  const [data, setData] = useState<PaginatedResponse<Sale> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (params: SalesQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await salesAPI.fetchSalesRecords(params);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Re-run when initialParams changes. If none provided, fetch first page.
    if (initialParams) {
      fetchData(initialParams);
    } else {
      fetchData({ page: 1, limit: 10 });
    }
    // include initialParams so ESLint/react-hooks rule is satisfied
  }, [initialParams]);

  return { data, loading, error, fetchData };
}

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await salesAPI.fetchFilterOptions();
        setOptions(result);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch filter options');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { options, loading, error };
}
