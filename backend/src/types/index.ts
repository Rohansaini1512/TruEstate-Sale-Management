/**
 * Type definitions for the Retail Sales Management System
 */

export interface Customer {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;
}

export interface Product {
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string[];
}

export interface Sales {
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;
}

export interface Operational {
  date: string;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

export interface SalesRecord extends Customer, Product, Sales, Operational {}

export interface QueryFilters {
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
}

export interface QueryOptions {
  page: number;
  limit: number;
  sortBy?: 'date' | 'quantity' | 'customerName';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
