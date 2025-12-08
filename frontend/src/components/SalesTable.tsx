import React from 'react';import React from 'react';

import { SalesRecord, PaginatedResponse } from '../services/salesAPI';import { SalesRecord, PaginatedResponse } from '../services/salesAPI';



interface SalesTableProps {interface SalesTableProps {

  data: PaginatedResponse<SalesRecord> | null;  data: PaginatedResponse<SalesRecord> | null;

  loading: boolean;  loading: boolean;

  error: string | null;  error: string | null;

  onPageChange: (page: number) => void;  onPageChange: (page: number) => void;

}}



export const SalesTable: React.FC<SalesTableProps> = ({export const SalesTable: React.FC<SalesTableProps> = ({

  data,  data,

  loading,  loading,

  error,  error,

  onPageChange,  onPageChange,

}) => {}) => {

  if (loading) {  if (loading) {

    return (    return (

      <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">      <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">

        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>

        <p className="mt-4 text-gray-600 font-medium">Loading data...</p>        <p className="mt-4 text-gray-600 font-medium">Loading data...</p>

      </div>      </div>

    );    );

  }  }



  if (error) {  if (error) {

    return (    return (

      <div className="flex flex-col justify-center items-center min-h-96 bg-red-50 rounded-lg border border-red-200">      <div className="flex flex-col justify-center items-center min-h-96 bg-red-50 rounded-lg border border-red-200">

        <div className="text-4xl mb-4">⚠️</div>        <div className="text-4xl mb-4">⚠️</div>

        <p className="text-lg font-bold text-red-800">Error Loading Data</p>        <p className="text-lg font-bold text-red-800">Error Loading Data</p>

        <p className="text-sm text-red-600 mt-2">{error}</p>        <p className="text-sm text-red-600 mt-2">{error}</p>

      </div>      </div>

    );    );

  }  }



  if (!data || data.items.length === 0) {  if (!data || data.items.length === 0) {

    return (    return (

      <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">      <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">

        <div className="text-5xl mb-4">📋</div>        <div className="text-5xl mb-4">📋</div>

        <p className="text-lg font-bold text-gray-800">No Records Found</p>        <p className="text-lg font-bold text-gray-800">No Records Found</p>

        <p className="text-sm text-gray-600 mt-2">Try adjusting your filters or search terms</p>        <p className="text-sm text-gray-600 mt-2">Try adjusting your filters or search terms</p>

      </div>      </div>

    );    );

  }  }



  const pageSize = 10;  const pageSize = 10;

  const startIndex = (data.currentPage - 1) * pageSize + 1;  const startIndex = (data.currentPage - 1) * pageSize + 1;

  const endIndex = Math.min(data.currentPage * pageSize, data.totalItems);  const endIndex = Math.min(data.currentPage * pageSize, data.totalItems);



  return (  return (

    <div className="bg-white rounded-lg shadow-sm p-0 overflow-x-auto">    <div className="bg-white rounded-lg shadow-sm p-0 overflow-x-auto">

      {/* Table Stats */}      {/* Table Stats */}

      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-gray-50">      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-gray-50">

        <span className="text-sm text-gray-600">        <span className="text-sm text-gray-600">

          Showing <span className="font-bold">{startIndex}-{endIndex}</span> of <span className="font-bold">{data.totalItems}</span> records          Showing <span className="font-bold">{startIndex}-{endIndex}</span> of <span className="font-bold">{data.totalItems}</span> records

        </span>        </span>

        <span className="text-sm text-gray-600">        <span className="text-sm text-gray-600">

          Page <span className="font-bold">{data.currentPage}</span> of <span className="font-bold">{data.totalPages}</span>          Page <span className="font-bold">{data.currentPage}</span> of <span className="font-bold">{data.totalPages}</span>

        </span>        </span>

      </div>      </div>



      {/* Data Table */}      {/* Data Table */}

      <table className="min-w-full text-sm">      <table className="min-w-full text-sm">

        <thead className="bg-primary-50 sticky top-0 z-10">        <thead className="bg-primary-50 sticky top-0 z-10">

          <tr>          <tr>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Transaction ID</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Transaction ID</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Date</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Date</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Customer ID</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Customer ID</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Customer Name</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Customer Name</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Phone</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Phone</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Gender</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Gender</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Age</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Age</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Category</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Category</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Quantity</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Quantity</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Amount</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Amount</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Region</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Region</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Product ID</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Product ID</th>

            <th className="px-3 py-2 font-semibold text-left text-primary-700">Employee</th>            <th className="px-3 py-2 font-semibold text-left text-primary-700">Employee</th>

          </tr>          </tr>

        </thead>        </thead>

        <tbody>        <tbody>

          {data.items.map((record) => (          {data.items.map((record) => (

            <tr key={record.transactionId} className="border-b last:border-b-0 hover:bg-primary-50/40">            <tr key={record.transactionId} className="border-b last:border-b-0 hover:bg-primary-50/40">

              <td className="px-3 py-2 text-gray-900 font-mono">{record.transactionId}</td>              <td className="px-3 py-2 text-gray-900 font-mono">{record.transactionId}</td>

              <td className="px-3 py-2 text-gray-700">{record.date}</td>              <td className="px-3 py-2 text-gray-700">{record.date}</td>

              <td className="px-3 py-2 text-gray-700">{record.customerId}</td>              <td className="px-3 py-2 text-gray-700">{record.customerId}</td>

              <td className="px-3 py-2 text-gray-900 font-semibold">{record.customerName}</td>              <td className="px-3 py-2 text-gray-900 font-semibold">{record.customerName}</td>

              <td className="px-3 py-2 text-gray-700">{record.phoneNumber}</td>              <td className="px-3 py-2 text-gray-700">{record.phoneNumber}</td>

              <td className="px-3 py-2">              <td className="px-3 py-2">

                <span className={`badge ${record.gender === 'Male' ? 'badge-primary' : 'badge-success'}`}>{record.gender}</span>                <span className={`badge ${record.gender === 'Male' ? 'badge-primary' : 'badge-success'}`}>{record.gender}</span>

              </td>              </td>

              <td className="px-3 py-2 text-gray-700">{record.age}</td>              <td className="px-3 py-2 text-gray-700">{record.age}</td>

              <td className="px-3 py-2">              <td className="px-3 py-2">

                <span className="badge badge-primary">{record.productCategory}</span>                <span className="badge badge-primary">{record.productCategory}</span>

              </td>              </td>

              <td className="px-3 py-2 text-right font-bold text-primary-700">{record.quantity}</td>              <td className="px-3 py-2 text-right font-bold text-primary-700">{record.quantity}</td>

              <td className="px-3 py-2 text-right font-bold text-success">₹{record.finalAmount.toLocaleString()}</td>              <td className="px-3 py-2 text-right font-bold text-success">₹{record.finalAmount.toLocaleString()}</td>

              <td className="px-3 py-2">              <td className="px-3 py-2">

                <span className="badge badge-primary">{record.customerRegion}</span>                <span className="badge badge-primary">{record.customerRegion}</span>

              </td>              </td>

              <td className="px-3 py-2 text-gray-700">{record.productId}</td>              <td className="px-3 py-2 text-gray-700">{record.productId}</td>

              <td className="px-3 py-2 text-gray-700">{record.employeeName}</td>              <td className="px-3 py-2 text-gray-700">{record.employeeName}</td>

            </tr>            </tr>

          ))}          ))}

        </tbody>        </tbody>

      </table>      </table>



      {/* Pagination Controls */}      {/* Pagination Controls */}

      <div className="flex justify-center items-center gap-2 py-4">      <div className="flex justify-center items-center gap-2 py-4">

        <button        <button

          className="filter-btn filter-btn-secondary"          className="filter-btn filter-btn-secondary"

          disabled={data.currentPage === 1}          disabled={data.currentPage === 1}

          onClick={() => onPageChange(data.currentPage - 1)}          onClick={() => onPageChange(data.currentPage - 1)}

        >        >

          Previous          Previous

        </button>        </button>

        {Array.from({ length: data.totalPages }, (_, i) => (        {Array.from({ length: data.totalPages }, (_, i) => (

          <button          <button

            key={i + 1}            key={i + 1}

            className={`w-8 h-8 rounded-full text-sm font-bold mx-1 ${data.currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-primary-100'}`}            className={`w-8 h-8 rounded-full text-sm font-bold mx-1 ${data.currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-primary-100'}`}

            onClick={() => onPageChange(i + 1)}            onClick={() => onPageChange(i + 1)}

            disabled={data.currentPage === i + 1}            disabled={data.currentPage === i + 1}

          >          >

            {i + 1}            {i + 1}

          </button>          </button>

        ))}        ))}

        <button        <button

          className="filter-btn filter-btn-secondary"          className="filter-btn filter-btn-secondary"

          disabled={data.currentPage === data.totalPages}          disabled={data.currentPage === data.totalPages}

          onClick={() => onPageChange(data.currentPage + 1)}          onClick={() => onPageChange(data.currentPage + 1)}

        >        >

          Next          Next

        </button>        </button>

      </div>      </div>

    </div>    </div>

  );  );

};}

import { SalesRecord, PaginatedResponse } from '../services/salesAPI';

  background-color: var(--bg-white);import '../styles/table.css';

  border-radius: 0.5rem;

  box-shadow: var(--shadow-sm);interface SalesTableProps {

  border: 1px solid var(--border-color);  data: PaginatedResponse<SalesRecord> | null;

  overflow: hidden;  loading: boolean;

}  error: string | null;

  onPageChange: (page: number) => void;

/* Table Stats */}

.table-stats {

  display: flex;export const SalesTable: React.FC<SalesTableProps> = ({

  justify-content: space-between;  data,

  align-items: center;  loading,

  padding: 1rem 1.25rem;  error,

  background-color: var(--bg-lighter);  onPageChange,

  border-bottom: 1px solid var(--border-color);}) => {

}  if (loading) {

    return (

.stats-left,      <div className="table-container loading-state">

.stats-right {        <div className="spinner"></div>

  display: flex;        <p className="loading-text">Loading data...</p>

  gap: 1rem;      </div>

}    );

  }

.stat-label {

  font-size: 0.875rem;  if (error) {

  color: var(--text-secondary);    return (

}      <div className="table-container error-state">

        <div className="error-icon">⚠️</div>

.stat-label strong {        <p className="error-title">Error Loading Data</p>

  color: var(--text-primary);        <p className="error-message">{error}</p>

  font-weight: 600;      </div>

}    );

  }

/* Table Container */

.table-container {  if (!data || data.items.length === 0) {

  overflow-x: auto;    return (

}      <div className="table-container empty-state">

        <div className="empty-icon">📋</div>

.table-container.loading-state,        <p className="empty-title">No Records Found</p>

.table-container.error-state,        <p className="empty-message">Try adjusting your filters or search terms</p>

.table-container.empty-state {      </div>

  display: flex;    );

  flex-direction: column;  }

  justify-content: center;

  align-items: center;  const pageSize = 10;

  min-height: 300px;  const startIndex = (data.currentPage - 1) * pageSize + 1;

  background-color: var(--bg-lighter);  const endIndex = Math.min(data.currentPage * pageSize, data.totalItems);

}

  return (

.spinner {    <div className="table-wrapper">

  display: inline-block;      {/* Table Stats */}

  width: 40px;      <div className="table-stats">

  height: 40px;        <div className="stats-left">

  border: 4px solid var(--border-color);          <span className="stat-label">

  border-top-color: var(--primary-color);            Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{data.totalItems}</strong> records

  border-radius: 50%;          </span>

  animation: spin 0.8s linear infinite;        </div>

}        <div className="stats-right">

          <span className="stat-label">

@keyframes spin {            Page <strong>{data.currentPage}</strong> of <strong>{data.totalPages}</strong>

  to {          </span>

    import React from 'react';
    import { SalesRecord, PaginatedResponse } from '../services/salesAPI';

    interface SalesTableProps {
      data: PaginatedResponse<SalesRecord> | null;
      loading: boolean;
      error: string | null;
      onPageChange: (page: number) => void;
    }

    export const SalesTable: React.FC<SalesTableProps> = ({
      data,
      loading,
      error,
      onPageChange,
    }) => {
      if (loading) {
        return (
          <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex flex-col justify-center items-center min-h-96 bg-red-50 rounded-lg border border-red-200">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-lg font-bold text-red-800">Error Loading Data</p>
            <p className="text-sm text-red-600 mt-2">{error}</p>
          </div>
        );
      }

      if (!data || data.items.length === 0) {
        return (
          <div className="flex flex-col justify-center items-center min-h-96 bg-gray-50 rounded-lg">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-lg font-bold text-gray-800">No Records Found</p>
            <p className="text-sm text-gray-600 mt-2">Try adjusting your filters or search terms</p>
          </div>
        );
      }

      const pageSize = 10;
      const startIndex = (data.currentPage - 1) * pageSize + 1;
      const endIndex = Math.min(data.currentPage * pageSize, data.totalItems);

      return (
.sales-table {                <td className="col-age">{record.age}</td>

  width: 100%;                <td className="col-category">

  border-collapse: collapse;                  <span className="category-badge">{record.productCategory}</span>

}                </td>

                <td className="col-quantity">

.sales-table thead {                  <span className="quantity-value">{record.quantity}</span>

  background-color: var(--bg-lighter);                </td>

  position: sticky;                <td className="col-amount">

  top: 0;                  <strong className="amount-value">₹{record.finalAmount.toLocaleString()}</strong>

  z-index: 10;                </td>

}                <td className="col-region">

                  <span className="region-badge">{record.customerRegion}</span>

.sales-table th {                </td>

  padding: 0.875rem 1rem;                <td className="col-product-id">{record.productId}</td>

  text-align: left;                <td className="col-employee">{record.employeeName}</td>

  font-weight: 600;              </tr>

  font-size: 0.8rem;            ))}

  text-transform: uppercase;          </tbody>

  letter-spacing: 0.3px;        </table>

  color: var(--text-primary);      </div>

  border-bottom: 2px solid var(--border-color);

  white-space: nowrap;      {/* Pagination */}

}      <div className="pagination-container">

        <button

.sales-table tbody tr {          className={`btn-pagination btn-prev ${

  border-bottom: 1px solid var(--border-color);            data.currentPage === 1 ? 'disabled' : ''

  transition: background-color 0.2s ease;          }`}

}          onClick={() => onPageChange(data.currentPage - 1)}

          disabled={data.currentPage === 1}

.sales-table tbody tr:hover {        >

  background-color: var(--primary-light);          ← Previous

}        </button>



.sales-table td {        <div className="pagination-dots">

  padding: 0.875rem 1rem;          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(

  font-size: 0.875rem;            (page) => (

  color: var(--text-primary);              <button

}                key={page}

                className={`pagination-dot ${

/* Table Column Styles */                  page === data.currentPage ? 'active' : ''

.col-id {                }`}

  width: 80px;                onClick={() => onPageChange(page)}

  text-align: center;              >

}                {page}

              </button>

.transaction-id {            )

  background-color: var(--primary-light);          )}

  color: var(--primary-dark);        </div>

  padding: 0.25rem 0.5rem;

  border-radius: 0.25rem;        <button

  font-weight: 600;          className={`btn-pagination btn-next ${

  font-size: 0.75rem;            data.currentPage === data.totalPages ? 'disabled' : ''

}          }`}

          onClick={() => onPageChange(data.currentPage + 1)}

.col-date {          disabled={data.currentPage === data.totalPages}

  width: 100px;        >

  font-weight: 500;          Next →

}        </button>

      </div>

.col-customer-id {    </div>

  width: 100px;  );

  font-size: 0.8rem;};

  color: var(--text-tertiary);
}

.col-customer-name {
  width: 140px;
}

.col-phone {
  width: 130px;
}

.phone-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.phone-link:hover {
  text-decoration: underline;
}

.col-gender,
.col-age {
  width: 80px;
  text-align: center;
}

.col-category {
  width: 120px;
}

.col-quantity {
  width: 80px;
  text-align: center;
}

.quantity-value {
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.8rem;
}

.col-amount {
  width: 120px;
  font-weight: 600;
  color: var(--success-color);
}

.amount-value {
  background-color: var(--success-light);
  color: #15803d;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  display: inline-block;
}

.col-region {
  width: 120px;
}

.col-product-id {
  width: 100px;
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.col-employee {
  width: 130px;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-female {
  background-color: #fce7f3;
  color: #831843;
}

.badge-male {
  background-color: #dbeafe;
  color: #1e40af;
}

.category-badge {
  background-color: #f3e8ff;
  color: #6b21a8;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

.region-badge {
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background-color: var(--bg-lighter);
  border-top: 1px solid var(--border-color);
}

.btn-pagination {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: var(--bg-white);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-pagination:hover:not(.disabled) {
  background-color: var(--primary-light);
  border-color: var(--primary-color);
  color: var(--primary-dark);
}

.btn-pagination.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--border-color);
}

.pagination-dots {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-dot {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background-color: var(--bg-white);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.pagination-dot:hover {
  border-color: var(--primary-color);
  background-color: var(--primary-light);
}

.pagination-dot.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Responsive */
@media (max-width: 1024px) {
  .sales-table th,
  .sales-table td {
    padding: 0.625rem 0.75rem;
    font-size: 0.8rem;
  }

  .col-id,
  .col-customer-id,
  .col-product-id {
    display: none;
  }
}

@media (max-width: 768px) {
  .table-stats {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .sales-table th,
  .sales-table td {
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  .col-date,
  .col-gender,
  .col-age,
  .col-customer-id,
  .col-product-id,
  .col-employee {
    display: none;
  }

  .pagination-container {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pagination-dots {
    flex-basis: 100%;
    gap: 0.25rem;
  }

  .pagination-dot {
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
  }
}
