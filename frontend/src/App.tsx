import React, { useState, useCallback } from 'react';
import SalesFilters from './components/SalesFilters';
import SalesTable from './components/SalesTable';
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">📊 Sales Management</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <SalesFilters
                onFiltersChange={handleFiltersChange}
                filterOptions={filterOptions}
              />
            </div>
          </aside>

          {/* Table Content */}
          <section className="lg:col-span-3">
            <SalesTable
              data={data}
              loading={loading}
              error={error}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
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
  );
}

export default App;
