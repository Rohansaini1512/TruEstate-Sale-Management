import React from 'react';
import { Sale } from '../hooks/useSalesData';
import { PaginatedResponse } from '../services/salesAPI';

interface SalesTableProps {
  data: PaginatedResponse<Sale> | null;
  loading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  currentSort?: { by: string; order: 'asc' | 'desc' };
}

const SalesTable: React.FC<SalesTableProps> = ({
  data,
  loading,
  error,
  onPageChange,
  onSortChange,
  currentSort,
}) => {
  const handleHeaderClick = (field: string) => {
    if (!onSortChange) return;
    
    const newOrder = currentSort?.by === field && currentSort?.order === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newOrder);
  };

  const getSortIcon = (field: string) => {
    if (!currentSort || currentSort.by !== field) {
      return <span className="ml-1 text-gray-300">⇅</span>;
    }
    return <span className="ml-1">{currentSort.order === 'asc' ? '↑' : '↓'}</span>;
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-primary-600 text-lg">Loading sales data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No sales records found</p>
      </div>
    );
  }

  const { currentPage: page, limit, totalPages } = data;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600 cursor-pointer hover:bg-primary-700" onClick={() => handleHeaderClick('date')}>Date {getSortIcon('date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600 cursor-pointer hover:bg-primary-700" onClick={() => handleHeaderClick('customerName')}>Customer name {getSortIcon('customerName')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Product Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600 cursor-pointer hover:bg-primary-700" onClick={() => handleHeaderClick('quantity')}>Quantity {getSortIcon('quantity')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600 cursor-pointer hover:bg-primary-700" onClick={() => handleHeaderClick('totalAmount')}>Total Amount {getSortIcon('totalAmount')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Customer region</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Product ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 z-20 bg-primary-600">Employee name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.items.map((record: Sale, index: number) => (
              <tr
                key={(record.transactionId || record.productId || index) as string | number}
                className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {record.productId ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.date ? new Date(record.date).toLocaleString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.customerId ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.customerName ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.phoneNumber ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.gender ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {typeof record.age === 'number' ? record.age : record.age ? Number(record.age) : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.productCategory ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                  {record.quantity ?? 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  ${typeof record.totalAmount === 'number' ? record.totalAmount.toFixed(2) : (record.totalAmount ? Number(record.totalAmount).toFixed(2) : '0.00')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.customerRegion ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.productId ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.employeeName ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(page * limit, data.totalItems)}</span> of{' '}
              <span className="font-medium">{data.totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    pageNum === page
                      ? 'z-10 bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
