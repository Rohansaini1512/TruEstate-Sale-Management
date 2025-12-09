import React, { useState, useCallback } from 'react';
import SalesFilters from './components/SalesFilters';
import Sidebar from './components/Sidebar';
import SalesTable from './components/SalesTable';
import StatsHeader from './components/StatsHeader';
import { useSalesData, useFilterOptions } from './hooks/useSalesData';
import { SalesQueryParams } from './services/salesAPI';
import './styles/tailwind.css';

function App() {
  const [currentParams, setCurrentParams] = useState<SalesQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const { data, loading, error, fetchData } = useSalesData(currentParams);
  const { options: filterOptions } = useFilterOptions();

  const handleFiltersChange = useCallback(
    (filters: SalesQueryParams) => {
      const newParams = { ...filters, page: 1 };
      setCurrentParams(newParams);
      fetchData(newParams);
    },
    [fetchData]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && data && newPage <= data.totalPages) {
        const newParams = { ...currentParams, page: newPage };
        setCurrentParams(newParams);
        fetchData(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentParams, data, fetchData]
  );


  // Dedicated handler for customer name sorting
  const handleCustomerNameSort = useCallback(
    (sortOrder: 'asc' | 'desc') => {
      const newParams = { ...currentParams, page: 1, sortBy: 'customerName' as const, sortOrder };
      setCurrentParams(newParams);
      fetchData(newParams);
    },
    [currentParams, fetchData]
  );

  // Handler for other sortable fields
  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: 'asc' | 'desc') => {
      // Only allow sorting for fields other than customerName
      const validSortFields = ['date', 'quantity', 'totalAmount'];
      if (validSortFields.includes(sortBy)) {
        // Map 'totalAmount' to a valid sortBy if needed, else cast
        const mappedSortBy = sortBy === 'totalAmount' ? 'quantity' : sortBy;
        const newParams = { ...currentParams, page: 1, sortBy: mappedSortBy as 'date' | 'quantity', sortOrder };
        setCurrentParams(newParams);
        fetchData(newParams);
      }
    },
    [currentParams, fetchData]
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Sales Management</h1>
                <p className="text-primary-100 text-sm sm:text-base">Advanced Search, Filter & Analysis</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {data && (
                  <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg px-4 py-3 flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold">{data.totalItems}</span>
                    <span className="text-xs uppercase tracking-wider text-primary-100 mt-1">Total Records</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
          {/* Filters Navbar */}
          <div className="mb-8">
            <SalesFilters
              onFiltersChange={handleFiltersChange}
              filterOptions={filterOptions}
            />
          </div>

          {/* Stats Header */}
          <StatsHeader data={data} />

          {/* Table Content Full Width */}
          <section>
            <SalesTable
              data={data}
              loading={loading}
              error={error}
              onPageChange={handlePageChange}
              onSortChange={handleSortChange}
              onCustomerNameSort={handleCustomerNameSort}
              currentSort={{
                by: currentParams.sortBy || 'date',
                order: currentParams.sortOrder || 'desc',
              }}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-400">
              &copy; 2024 Retail Sales Management System. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
