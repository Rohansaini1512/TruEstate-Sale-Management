import React, { useState } from 'react';import React, { useState } from 'react';

import { SalesQueryParams } from '../services/salesAPI';import { SalesQueryParams } from '../services/salesAPI';



interface SalesFiltersProps {  background-color: var(--bg-white);import '../styles/filters.css';

  onFiltersChange: (filters: SalesQueryParams) => void;

  filterOptions: {  border-radius: 0.5rem;

    customerRegions: string[];

    genders: string[];  overflow: hidden;interface SalesFiltersProps {

    productCategories: string[];

    paymentMethods: string[];  box-shadow: var(--shadow-sm);  onFiltersChange: (filters: SalesQueryParams) => void;

    tags: string[];

    ageRange: { min: number; max: number };  border: 1px solid var(--border-color);  filterOptions: {

    dateRange: { min: string; max: string };

  } | null;  margin-bottom: 2rem;    customerRegions: string[];

}

}    genders: string[];

interface FilterState {

  search: string;    productCategories: string[];

  regions: string[];

  genders: string[];/* Filter Section */    paymentMethods: string[];

  categories: string[];

  paymentMethods: string[];.filter-section {    tags: string[];

  tags: string[];

  minAge: string;  border-bottom: 1px solid var(--border-color);    ageRange: { min: number; max: number };

  maxAge: string;

  startDate: string;}    dateRange: { min: string; max: string };

  endDate: string;

  sortBy: string;  } | null;

  sortOrder: string;

}.filter-section:last-child {  onSortChange?: (sortBy: string, sortOrder: string) => void;



export const SalesFilters: React.FC<SalesFiltersProps> = ({  border-bottom: none;}

  onFiltersChange,

  filterOptions,}

}) => {

  const [filters, setFilters] = useState<FilterState>({interface FilterState {

    search: '',

    regions: [],.filter-section-header {  search: string;

    genders: [],

    categories: [],  padding: 1rem;  regions: string[];

    paymentMethods: [],

    tags: [],  background-color: var(--bg-lighter);  gender: string;

    minAge: '',

    maxAge: '',  cursor: pointer;  ageMin: number | undefined;

    startDate: '',

    endDate: '',  display: flex;  ageMax: number | undefined;

    sortBy: 'date',

    sortOrder: 'desc',  justify-content: space-between;  categories: string[];

  });

  align-items: center;  tags: string[];

  const [expandedSections, setExpandedSections] = useState({

    search: true,  user-select: none;  paymentMethods: string[];

    filters: true,

    sorting: false,  transition: background-color 0.2s ease;  dateFrom: string;

  });

}  dateTo: string;

  const toggleSection = (section: keyof typeof expandedSections) => {

    setExpandedSections(prev => ({  sortBy: 'date' | 'quantity' | 'customerName';

      ...prev,

      [section]: !prev[section],.filter-section-header:hover {  sortOrder: 'asc' | 'desc';

    }));

  };  background-color: #e8f0f8;}



  const handleMultiSelectToggle = (}

    field: 'regions' | 'genders' | 'categories' | 'paymentMethods' | 'tags',

    value: stringexport const SalesFilters: React.FC<SalesFiltersProps> = ({

  ) => {

    setFilters(prev => ({.filter-section-title {  onFiltersChange,

      ...prev,

      [field]: prev[field].includes(value)  font-weight: 600;  filterOptions,

        ? prev[field].filter(v => v !== value)

        : [...prev[field], value],  color: var(--text-primary);  onSortChange,

    }));

  };  font-size: 0.95rem;}) => {



  const handleApplyFilters = () => {  display: flex;  const [filters, setFilters] = useState<FilterState>({

    const queryParams: SalesQueryParams = {

      page: 1,  align-items: center;    search: '',

      limit: 10,

      sortBy: filters.sortBy,  gap: 0.5rem;    regions: [],

      sortOrder: filters.sortOrder as 'asc' | 'desc',

    };}    gender: '',



    if (filters.search) queryParams.search = filters.search;    ageMin: undefined,

    if (filters.regions.length) queryParams.customerRegion = filters.regions;

    if (filters.genders.length) queryParams.gender = filters.genders;.badge-count {    ageMax: undefined,

    if (filters.categories.length) queryParams.productCategory = filters.categories;

    if (filters.paymentMethods.length) queryParams.paymentMethod = filters.paymentMethods;  background-color: var(--primary-color);    categories: [],

    if (filters.tags.length) queryParams.tags = filters.tags;

    if (filters.minAge) queryParams.minAge = parseInt(filters.minAge);  color: white;    tags: [],

    if (filters.maxAge) queryParams.maxAge = parseInt(filters.maxAge);

    if (filters.startDate) queryParams.startDate = filters.startDate;  font-size: 0.7rem;    paymentMethods: [],

    if (filters.endDate) queryParams.endDate = filters.endDate;

  padding: 0.2rem 0.4rem;    dateFrom: '',

    onFiltersChange(queryParams);

  };  border-radius: 9999px;    dateTo: '',



  const handleClearFilters = () => {  font-weight: 700;    sortBy: 'date',

    setFilters({

      search: '',}    sortOrder: 'desc',

      regions: [],

      genders: [],  });

      categories: [],

      paymentMethods: [],.toggle-icon {

      tags: [],

      minAge: '',  color: var(--text-secondary);  const [expandedSections, setExpandedSections] = useState<

      maxAge: '',

      startDate: '',  font-size: 0.8rem;    Record<string, boolean>

      endDate: '',

      sortBy: 'date',  transition: transform 0.2s ease;  >({

      sortOrder: 'desc',

    });}    search: true,

    onFiltersChange({

      page: 1,    filters: true,

      limit: 10,

      sortBy: 'date',.filter-section-content {    sorting: true,

      sortOrder: 'desc',

    });  padding: 1rem;  });

  };

  background-color: var(--bg-white);

  const activeFilterCount = 

    (filters.search ? 1 : 0) +}  const toggleSection = (section: string) => {

    filters.regions.length +

    filters.genders.length +    setExpandedSections((prev) => ({

    filters.categories.length +

    filters.paymentMethods.length +/* Filter Group */      ...prev,

    filters.tags.length +

    (filters.minAge || filters.maxAge ? 1 : 0) +.filter-group {      [section]: !prev[section],

    (filters.startDate || filters.endDate ? 1 : 0);

  margin-bottom: 1.25rem;    }));

  return (

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">}  };

      {/* Header */}

      <div className="bg-primary-600 text-white px-4 py-3">

        <h2 className="text-lg font-bold flex items-center justify-between">

          <span>🔍 Filters</span>.filter-group:last-child {  const applyFilters = () => {

          {activeFilterCount > 0 && (

            <span className="bg-white text-primary-600 text-xs font-bold rounded-full px-2 py-1">  margin-bottom: 0;    const queryParams: SalesQueryParams = {

              {activeFilterCount}

            </span>}      search: filters.search || undefined,

          )}

        </h2>      customerRegions:

      </div>

.filter-label {        filters.regions.length > 0 ? filters.regions : undefined,

      {/* Search Section */}

      <div className="border-b border-gray-200">  display: block;      gender: filters.gender || undefined,

        <button

          className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"  font-weight: 600;      ageMin: filters.ageMin,

          onClick={() => toggleSection('search')}

        >  color: var(--text-primary);      ageMax: filters.ageMax,

          <span className="font-semibold text-gray-800">Search</span>

          <span className="text-gray-500">{expandedSections.search ? '▼' : '▶'}</span>  font-size: 0.875rem;      productCategories:

        </button>

        {expandedSections.search && (  margin-bottom: 0.5rem;        filters.categories.length > 0 ? filters.categories : undefined,

          <div className="px-4 pb-4">

            <input  text-transform: uppercase;      tags: filters.tags.length > 0 ? filters.tags : undefined,

              type="text"

              placeholder="Search by name or phone..."  letter-spacing: 0.3px;      paymentMethods:

              value={filters.search}

              onChange={(e) => setFilters({ ...filters, search: e.target.value })}}        filters.paymentMethods.length > 0

              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

            />          ? filters.paymentMethods

          </div>

        )}/* Search Input */          : undefined,

      </div>

.search-input {      dateFrom: filters.dateFrom || undefined,

      {/* Filters Section */}

      <div className="border-b border-gray-200">  width: 100%;      dateTo: filters.dateTo || undefined,

        <button

          className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"  padding: 0.75rem 1rem;      sortBy: filters.sortBy,

          onClick={() => toggleSection('filters')}

        >  border: 1px solid var(--border-color);      sortOrder: filters.sortOrder,

          <span className="font-semibold text-gray-800">Filters</span>

          <span className="text-gray-500">{expandedSections.filters ? '▼' : '▶'}</span>  border-radius: 0.375rem;      page: 1,

        </button>

        {expandedSections.filters && (  font-size: 0.875rem;      limit: 10,

          <div className="px-4 pb-4 space-y-4">

            {/* Customer Regions */}  background-color: var(--bg-white);    };

            {filterOptions?.customerRegions && filterOptions.customerRegions.length > 0 && (

              <div>  color: var(--text-primary);

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Customer Region  transition: all 0.2s ease;    onFiltersChange(queryParams);

                </label>

                <div className="flex flex-wrap gap-2">}  };

                  {filterOptions.customerRegions.map((region) => (

                    <button

                      key={region}

                      onClick={() => handleMultiSelectToggle('regions', region)}.search-input:focus {  const clearFilters = () => {

                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${

                        filters.regions.includes(region)  outline: none;    const clearedFilters: FilterState = {

                          ? 'bg-primary-600 text-white'

                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'  border-color: var(--primary-color);      search: '',

                      }`}

                    >  box-shadow: 0 0 0 3px var(--primary-light);      regions: [],

                      {region}

                    </button>}      gender: '',

                  ))}

                </div>      ageMin: undefined,

              </div>

            )}.search-input::placeholder {      ageMax: undefined,



            {/* Gender */}  color: var(--text-tertiary);      categories: [],

            {filterOptions?.genders && filterOptions.genders.length > 0 && (

              <div>}      tags: [],

                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>

                <div className="flex flex-wrap gap-2">      paymentMethods: [],

                  {filterOptions.genders.map((gender) => (

                    <button/* Checkbox Group */      dateFrom: '',

                      key={gender}

                      onClick={() => handleMultiSelectToggle('genders', gender)}.checkbox-group {      dateTo: '',

                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${

                        filters.genders.includes(gender)  display: flex;      sortBy: 'date',

                          ? 'bg-primary-600 text-white'

                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'  flex-direction: column;      sortOrder: 'desc',

                      }`}

                    >  gap: 0.5rem;    };

                      {gender}

                    </button>}

                  ))}

                </div>    setFilters(clearedFilters);

              </div>

            )}.checkbox-label {    onFiltersChange({



            {/* Product Categories */}  display: flex;      sortBy: 'date',

            {filterOptions?.productCategories && filterOptions.productCategories.length > 0 && (

              <div>  align-items: center;      sortOrder: 'desc',

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Product Category  gap: 0.5rem;      page: 1,

                </label>

                <div className="flex flex-wrap gap-2">  cursor: pointer;      limit: 10,

                  {filterOptions.productCategories.map((category) => (

                    <button  user-select: none;    });

                      key={category}

                      onClick={() => handleMultiSelectToggle('categories', category)}  font-size: 0.875rem;  };

                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${

                        filters.categories.includes(category)  color: var(--text-primary);

                          ? 'bg-primary-600 text-white'

                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'  transition: color 0.2s ease;  const handleMultiSelectToggle = (

                      }`}

                    >}    value: string,

                      {category}

                    </button>    field: 'regions' | 'categories' | 'tags' | 'paymentMethods'

                  ))}

                </div>.checkbox-label:hover {  ) => {

              </div>

            )}  color: var(--primary-color);    setFilters((prev) => {



            {/* Payment Methods */}}      const current = prev[field] as string[];

            {filterOptions?.paymentMethods && filterOptions.paymentMethods.length > 0 && (

              <div>      const updated = current.includes(value)

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Payment Method.checkbox-label input[type='checkbox'] {        ? current.filter((item) => item !== value)

                </label>

                <div className="flex flex-wrap gap-2">  width: 16px;        : [...current, value];

                  {filterOptions.paymentMethods.map((method) => (

                    <button  height: 16px;      return { ...prev, [field]: updated };

                      key={method}

                      onClick={() => handleMultiSelectToggle('paymentMethods', method)}  cursor: pointer;    });

                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${

                        filters.paymentMethods.includes(method)  accent-color: var(--primary-color);  };

                          ? 'bg-primary-600 text-white'

                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}

                      }`}

                    >  const getActiveFilterCount = () => {

                      {method}

                    </button>/* Select Inputs */    let count = 0;

                  ))}

                </div>.filter-select,    if (filters.search) count++;

              </div>

            )}.filter-input {    if (filters.regions.length > 0) count++;



            {/* Age Range */}  width: 100%;    if (filters.gender) count++;

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>  padding: 0.5rem 0.75rem;    if (filters.ageMin !== undefined || filters.ageMax !== undefined)

              <div className="grid grid-cols-2 gap-2">

                <input  border: 1px solid var(--border-color);      count++;

                  type="number"

                  placeholder="Min"  border-radius: 0.375rem;    if (filters.categories.length > 0) count++;

                  value={filters.minAge}

                  onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}  font-size: 0.875rem;    if (filters.tags.length > 0) count++;

                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

                />  background-color: var(--bg-white);    if (filters.paymentMethods.length > 0) count++;

                <input

                  type="number"  color: var(--text-primary);    if (filters.dateFrom || filters.dateTo) count++;

                  placeholder="Max"

                  value={filters.maxAge}  transition: all 0.2s ease;    return count;

                  onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}

                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"}  };

                />

              </div>

            </div>

.filter-select:focus,  const activeCount = getActiveFilterCount();

            {/* Date Range */}

            <div>.filter-input:focus {

              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>

              <div className="grid grid-cols-2 gap-2">  outline: none;  return (

                <input

                  type="date"  border-color: var(--primary-color);    <div className="filters-panel">

                  value={filters.startDate}

                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}  box-shadow: 0 0 0 3px var(--primary-light);      {/* Search Bar */}

                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

                />}      <div className="filter-section">

                <input

                  type="date"        <div

                  value={filters.endDate}

                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}/* Range Inputs */          className="filter-section-header"

                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

                />.range-inputs {          onClick={() => toggleSection('search')}

              </div>

            </div>  display: flex;        >

          </div>

        )}  align-items: center;          <span className="filter-section-title">🔍 Search</span>

      </div>

  gap: 0.5rem;          <span className="toggle-icon">

      {/* Sorting Section */}

      <div className="border-b border-gray-200">}            {expandedSections.search ? '▼' : '▶'}

        <button

          className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"          </span>

          onClick={() => toggleSection('sorting')}

        >.range-input {        </div>

          <span className="font-semibold text-gray-800">Sorting</span>

          <span className="text-gray-500">{expandedSections.sorting ? '▼' : '▶'}</span>  flex: 1;        {expandedSections.search && (

        </button>

        {expandedSections.sorting && (  padding: 0.5rem 0.75rem;          <div className="filter-section-content">

          <div className="px-4 pb-4 space-y-3">

            <div>  border: 1px solid var(--border-color);            <input

              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>

              <select  border-radius: 0.375rem;              type="text"

                value={filters.sortBy}

                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}  font-size: 0.875rem;              className="search-input"

                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

              >  background-color: var(--bg-white);              placeholder="Search by customer name or phone..."

                <option value="date">Date</option>

                <option value="quantity">Quantity</option>  color: var(--text-primary);              value={filters.search}

                <option value="customerName">Customer Name</option>

              </select>  transition: all 0.2s ease;              onChange={(e) =>

            </div>

            <div>}                setFilters({ ...filters, search: e.target.value })

              <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>

              <select              }

                value={filters.sortOrder}

                onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}.range-input:focus {            />

                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"

              >  outline: none;          </div>

                <option value="asc">Ascending</option>

                <option value="desc">Descending</option>  border-color: var(--primary-color);        )}

              </select>

            </div>  box-shadow: 0 0 0 3px var(--primary-light);      </div>

          </div>

        )}}

      </div>

      {/* Filters Section */}

      {/* Action Buttons */}

      <div className="px-4 py-4 space-y-2">.range-separator {      <div className="filter-section">

        <button

          onClick={handleApplyFilters}  color: var(--text-tertiary);        <div

          className="filter-btn filter-btn-primary w-full"

        >  font-weight: 600;          className="filter-section-header"

          Apply Filters

        </button>}          onClick={() => toggleSection('filters')}

        <button

          onClick={handleClearFilters}        >

          className="filter-btn filter-btn-secondary w-full"

        >/* Date Inputs */          <span className="filter-section-title">

          Clear All

        </button>.date-inputs {            ⚙️ Filters {activeCount > 0 && <span className="badge-count">{activeCount}</span>}

      </div>

    </div>  display: flex;          </span>

  );

};  flex-direction: column;          <span className="toggle-icon">


  gap: 0.5rem;            {expandedSections.filters ? '▼' : '▶'}

}          </span>

        </div>

/* Tags Container */

.tags-container {        {expandedSections.filters && (

  display: flex;          <div className="filter-section-content">

  flex-wrap: wrap;            {/* Customer Region */}

  gap: 0.5rem;            <div className="filter-group">

}              <label className="filter-label">Customer Region</label>

              <div className="checkbox-group">

.tag-button {                {filterOptions?.customerRegions.map((region) => (

  padding: 0.5rem 0.875rem;                  <label key={region} className="checkbox-label">

  border: 1px solid var(--border-color);                    <input

  border-radius: 9999px;                      type="checkbox"

  background-color: var(--bg-lighter);                      checked={filters.regions.includes(region)}

  color: var(--text-primary);                      onChange={() =>

  cursor: pointer;                        handleMultiSelectToggle(region, 'regions')

  font-size: 0.8rem;                      }

  font-weight: 500;                    />

  transition: all 0.2s ease;                    <span>{region}</span>

}                  </label>

                ))}

.tag-button:hover {              </div>

  border-color: var(--primary-color);            </div>

  background-color: var(--primary-light);

  color: var(--primary-dark);            {/* Gender */}

}            <div className="filter-group">

              <label className="filter-label">Gender</label>

.tag-button.active {              <select

  background-color: var(--primary-color);                className="filter-select"

  color: white;                value={filters.gender}

  border-color: var(--primary-color);                onChange={(e) =>

}                  setFilters({ ...filters, gender: e.target.value })

                }

/* Sort Order Buttons */              >

.sort-order-buttons {                <option value="">All Genders</option>

  display: flex;                {filterOptions?.genders.map((g) => (

  gap: 0.5rem;                  <option key={g} value={g}>

}                    {g}

                  </option>

.sort-btn {                ))}

  flex: 1;              </select>

  padding: 0.5rem;            </div>

  border: 1px solid var(--border-color);

  border-radius: 0.375rem;            {/* Age Range */}

  background-color: var(--bg-lighter);            <div className="filter-group">

  color: var(--text-primary);              <label className="filter-label">Age Range</label>

  cursor: pointer;              <div className="range-inputs">

  font-weight: 500;                <input

  font-size: 0.875rem;                  type="number"

  transition: all 0.2s ease;                  className="range-input"

}                  placeholder="Min"

                  value={filters.ageMin ?? ''}

.sort-btn:hover {                  onChange={(e) =>

  border-color: var(--primary-color);                    setFilters({

  background-color: var(--primary-light);                      ...filters,

}                      ageMin: e.target.value

                        ? parseInt(e.target.value)

.sort-btn.active {                        : undefined,

  background-color: var(--primary-color);                    })

  color: white;                  }

  border-color: var(--primary-color);                  min={filterOptions?.ageRange.min}

}                  max={filterOptions?.ageRange.max}

                />

/* Filter Actions */                <span className="range-separator">-</span>

.filter-actions {                <input

  display: flex;                  type="number"

  gap: 0.75rem;                  className="range-input"

  padding: 1rem;                  placeholder="Max"

  background-color: var(--bg-lighter);                  value={filters.ageMax ?? ''}

  border-top: 1px solid var(--border-color);                  onChange={(e) =>

}                    setFilters({

                      ...filters,

.btn-primary,                      ageMax: e.target.value

.btn-secondary {                        ? parseInt(e.target.value)

  flex: 1;                        : undefined,

  padding: 0.75rem 1rem;                    })

  border: none;                  }

  border-radius: 0.375rem;                  min={filterOptions?.ageRange.min}

  font-size: 0.875rem;                  max={filterOptions?.ageRange.max}

  font-weight: 600;                />

  cursor: pointer;              </div>

  transition: all 0.2s ease;            </div>

}

            {/* Product Category */}

.btn-primary {            <div className="filter-group">

  background-color: var(--primary-color);              <label className="filter-label">Product Category</label>

  color: white;              <div className="checkbox-group">

}                {filterOptions?.productCategories.map((cat) => (

                  <label key={cat} className="checkbox-label">

.btn-primary:hover {                    <input

  background-color: var(--primary-dark);                      type="checkbox"

  box-shadow: var(--shadow-md);                      checked={filters.categories.includes(cat)}

}                      onChange={() =>

                        handleMultiSelectToggle(cat, 'categories')

.btn-secondary {                      }

  background-color: var(--bg-white);                    />

  color: var(--text-primary);                    <span>{cat}</span>

  border: 1px solid var(--border-color);                  </label>

}                ))}

              </div>

.btn-secondary:hover {            </div>

  background-color: var(--bg-lighter);

  border-color: var(--primary-color);            {/* Tags */}

}            <div className="filter-group">

              <label className="filter-label">Tags (Any Match)</label>

/* Responsive */              <div className="tags-container">

@media (max-width: 768px) {                {filterOptions?.tags.map((tag) => (

  .range-inputs {                  <button

    flex-direction: column;                    key={tag}

    gap: 0.5rem;                    className={`tag-button ${

  }                      filters.tags.includes(tag) ? 'active' : ''

                    }`}

  .filter-actions {                    onClick={() => handleMultiSelectToggle(tag, 'tags')}

    flex-direction: column;                  >

  }                    {tag}

                  </button>

  .filter-section-title {                ))}

    font-size: 0.85rem;              </div>

  }            </div>

}

            {/* Payment Method */}
            <div className="filter-group">
              <label className="filter-label">Payment Method</label>
              <div className="checkbox-group">
                {filterOptions?.paymentMethods.map((method) => (
                  <label key={method} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.paymentMethods.includes(method)}
                      onChange={() =>
                        handleMultiSelectToggle(method, 'paymentMethods')
                      }
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="filter-group">
              <label className="filter-label">Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  className="filter-input"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="filter-input"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sorting Section */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection('sorting')}
        >
          <span className="filter-section-title">📊 Sorting</span>
          <span className="toggle-icon">
            {expandedSections.sorting ? '▼' : '▶'}
          </span>
        </div>

        {expandedSections.sorting && (
          <div className="filter-section-content">
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                className="filter-select"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as any,
                  })
                }
              >
                <option value="date">Date</option>
                <option value="quantity">Quantity</option>
                <option value="customerName">Customer Name</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort Order</label>
              <div className="sort-order-buttons">
                <button
                  className={`sort-btn ${
                    filters.sortOrder === 'asc' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, sortOrder: 'asc' })
                  }
                >
                  ↑ Ascending
                </button>
                <button
                  className={`sort-btn ${
                    filters.sortOrder === 'desc' ? 'active' : ''
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, sortOrder: 'desc' })
                  }
                >
                  ↓ Descending
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="filter-actions">
        <button className="btn-primary" onClick={applyFilters}>
          🔍 Apply Filters
        </button>
        <button className="btn-secondary" onClick={clearFilters}>
          ✕ Clear All
        </button>
      </div>
    </div>
  );
};
