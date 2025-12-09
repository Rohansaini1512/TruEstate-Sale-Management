import React, { useState } from 'react';

interface SalesFiltersProps {
  onFiltersChange: (filters: any) => void;
  filterOptions?: any;
}

const SalesFilters: React.FC<SalesFiltersProps> = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [category, setCategory] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [segment, setSegment] = useState<string>('');
  const [shipMode, setShipMode] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minSales, setMinSales] = useState<string>('');
  const [maxSales, setMaxSales] = useState<string>('');

  const categories = ['Furniture', 'Technology', 'Office Supplies'];
  const regions = ['East', 'West', 'Central', 'South'];
  const segments = ['Consumer', 'Corporate', 'Home Office'];
  const shipModes = ['Standard Class', 'Second Class', 'First Class', 'Same Day'];

  const handleApplyFilters = () => {
    const filters: any = {};
    if (category) filters.category = category;
    if (region) filters.region = region;
    if (state) filters.state = state;
    if (segment) filters.segment = segment;
    if (shipMode) filters.ship_mode = shipMode;
    if (searchQuery) filters.search = searchQuery;
    if (minSales) filters.min_sales = parseFloat(minSales);
    if (maxSales) filters.max_sales = parseFloat(maxSales);
    onFiltersChange(filters);
  };

  const handleReset = () => {
    setCategory('');
    setRegion('');
    setState('');
    setSegment('');
    setShipMode('');
    setSearchQuery('');
    setMinSales('');
    setMaxSales('');
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:text-primary-100 transition-colors duration-200"
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, customer, order ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
              >
                <option value="">All Regions</option>
                {regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Segment
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
              >
                <option value="">All Segments</option>
                {segments.map((seg) => (
                  <option key={seg} value={seg}>
                    {seg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ship Mode
              </label>
              <select
                value={shipMode}
                onChange={(e) => setShipMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
              >
                <option value="">All Ship Modes</option>
                {shipModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sales Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={minSales}
                  onChange={(e) => setMinSales(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
                />
                <input
                  type="number"
                  value={maxSales}
                  onChange={(e) => setMaxSales(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleApplyFilters}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesFilters;
