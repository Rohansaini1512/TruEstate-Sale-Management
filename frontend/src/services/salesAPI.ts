import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface SalesRecord {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string[];
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;
  date: string;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface SalesQueryParams {
  search?: string;
  customerRegions?: string[];
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  productCategories?: string[];
  tags?: string[];
  paymentMethods?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'date' | 'quantity' | 'customerName';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FilterOptions {
  customerRegions: string[];
  genders: string[];
  productCategories: string[];
  paymentMethods: string[];
  tags: string[];
  ageRange: { min: number; max: number };
  dateRange: { min: string; max: string };
}

class SalesAPI {
  /**
   * Fetch sales records with filters, sorting, and pagination
   */
  async fetchSalesRecords(
    params: SalesQueryParams
  ): Promise<PaginatedResponse<SalesRecord>> {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append('search', params.search);
    if (params.customerRegions?.length) {
      params.customerRegions.forEach((region) =>
        queryParams.append('customerRegions', region)
      );
    }
    if (params.gender) queryParams.append('gender', params.gender);
    if (params.ageMin !== undefined) queryParams.append('ageMin', String(params.ageMin));
    if (params.ageMax !== undefined) queryParams.append('ageMax', String(params.ageMax));
    if (params.productCategories?.length) {
      params.productCategories.forEach((cat) =>
        queryParams.append('productCategories', cat)
      );
    }
    if (params.tags?.length) {
      params.tags.forEach((tag) => queryParams.append('tags', tag));
    }
    if (params.paymentMethods?.length) {
      params.paymentMethods.forEach((method) =>
        queryParams.append('paymentMethods', method)
      );
    }
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.page) queryParams.append('page', String(params.page));
    if (params.limit) queryParams.append('limit', String(params.limit));

    const response = await axios.get(`${API_BASE_URL}/sales`, { params: queryParams });
    return response.data.data;
  }

  /**
   * Fetch available filter options
   */
  async fetchFilterOptions(): Promise<FilterOptions> {
    const response = await axios.get(`${API_BASE_URL}/sales/filters`);
    return response.data.data;
  }
}

export default new SalesAPI();
