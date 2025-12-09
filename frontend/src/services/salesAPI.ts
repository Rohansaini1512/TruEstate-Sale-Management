import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Sale {
  transactionId?: string;
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

// Backwards-compatible alias
export type SalesRecord = Sale;

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

    // Defensive mapping: backend is expected to return camelCase fields, but
    // accept several variants (snake_case, spaced headers) and normalize to our
    // frontend `Sale` shape. This ensures the UI won't break if keys differ.
    // Cast to any so we can tolerate alternate response property names (e.g. totalItemsCount).
    const raw = response.data.data as any;
    const mapItem = (item: any): Sale => {
      return {
        customerId: item.customerId ?? item.customer_id ?? item['Customer ID'] ?? item['CustomerId'] ?? '',
        customerName: item.customerName ?? item.customer_name ?? item['Customer Name'] ?? item['CustomerName'] ?? '',
        phoneNumber: item.phoneNumber ?? item.phone_number ?? item['Phone Number'] ?? item['PhoneNumber'] ?? '',
        gender: item.gender ?? item.Gender ?? '',
        age: typeof item.age === 'number' ? item.age : (item.age ? Number(item.age) : 0),
        customerRegion: item.customerRegion ?? item.customer_region ?? item['Customer Region'] ?? '',
        customerType: item.customerType ?? item.customer_type ?? item['Customer Type'] ?? '',
        productId: item.productId ?? item.product_id ?? item['Product ID'] ?? item['Transaction ID'] ?? '',
        productName: item.productName ?? item.product_name ?? item['Product Name'] ?? '',
        brand: item.brand ?? item.Brand ?? '',
        productCategory: item.productCategory ?? item.product_category ?? item['Product Category'] ?? '',
        tags: Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split('|').map((s: string) => s.trim()) : []),
        quantity: typeof item.quantity === 'number' ? item.quantity : (item.quantity ? Number(item.quantity) : 0),
        pricePerUnit: typeof item.pricePerUnit === 'number' ? item.pricePerUnit : (item.pricePerUnit ? Number(item.pricePerUnit) : 0),
        discountPercentage: typeof item.discountPercentage === 'number' ? item.discountPercentage : (item.discountPercentage ? Number(item.discountPercentage) : 0),
        totalAmount: typeof item.totalAmount === 'number' ? item.totalAmount : (item.totalAmount ? Number(item.totalAmount) : 0),
        finalAmount: typeof item.finalAmount === 'number' ? item.finalAmount : (item.finalAmount ? Number(item.finalAmount) : 0),
        date: item.date ?? item.Date ?? item.transactionDate ?? '',
        paymentMethod: item.paymentMethod ?? item.payment_method ?? item['Payment Method'] ?? '',
        orderStatus: item.orderStatus ?? item.order_status ?? item['Order Status'] ?? '',
        deliveryType: item.deliveryType ?? item.delivery_type ?? item['Delivery Type'] ?? '',
        storeId: item.storeId ?? item.store_id ?? '',
        storeLocation: item.storeLocation ?? item.store_location ?? item['Store Location'] ?? '',
        salespersonId: item.salespersonId ?? item.salesperson_id ?? item['Salesperson ID'] ?? '',
        employeeName: item.employeeName ?? item.employee_name ?? item['Employee Name'] ?? '',
      };
    };

    const mapped: PaginatedResponse<Sale> = {
      items: (raw.items || []).map(mapItem),
      totalItems: raw.totalItems ?? raw.totalItemsCount ?? 0,
      totalPages: raw.totalPages ?? Math.ceil((raw.totalItems ?? 0) / (raw.limit ?? 10)),
      currentPage: raw.currentPage ?? raw.page ?? 1,
      limit: raw.limit ?? 10,
    };

    return mapped as unknown as PaginatedResponse<SalesRecord>;
  }

  /**
   * Fetch available filter options
   */
  async fetchFilterOptions(): Promise<FilterOptions> {
    const response = await axios.get(`${API_BASE_URL}/sales/filters`);
    return response.data.data;
  }
}

const salesAPI = new SalesAPI();
export default salesAPI;
