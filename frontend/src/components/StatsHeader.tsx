import React from 'react';
import { Sale, PaginatedResponse } from '../services/salesAPI';

interface StatsHeaderProps {
  data: PaginatedResponse<Sale> | null;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  // Calculate stats from the current page items
  const totalQuantity = data.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalAmount = data.items.reduce((sum, item) => sum + (typeof item.totalAmount === 'number' ? item.totalAmount : 0), 0);
  const totalDiscount = data.items.reduce((sum, item) => {
    const discount = typeof item.discountPercentage === 'number' ? item.discountPercentage : 0;
    const amount = typeof item.totalAmount === 'number' ? item.totalAmount : 0;
    return sum + (amount * discount / 100);
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Units Sold */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
        <p className="text-sm font-medium text-gray-600 mb-1">Total Units Sold</p>
        <p className="text-2xl font-bold text-gray-900">{totalQuantity}</p>
        <p className="text-xs text-gray-500 mt-2">Current page</p>
      </div>

      {/* Total Amount */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
        <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-2">Revenue this page</p>
      </div>

      {/* Total Discount */}
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
        <p className="text-sm font-medium text-gray-600 mb-1">Total Discount</p>
        <p className="text-2xl font-bold text-gray-900">${totalDiscount.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-2">Savings this page</p>
      </div>
    </div>
  );
};

export default StatsHeader;
