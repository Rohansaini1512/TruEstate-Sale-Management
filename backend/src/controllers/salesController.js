import { Request, Response } from 'express';
import { salesService } from '../services/salesService';
import { QueryFilters, QueryOptions } from '../types';


function parseQueryParams(query: any): { filters: QueryFilters; options: QueryOptions } {
  const filters: QueryFilters = {};
  const options: QueryOptions = {
    page: Math.max(1, parseInt(query.page) || 1),
    limit: Math.min(100, Math.max(1, parseInt(query.limit) || 10)),
  };

  // Parse search
  if (query.search && typeof query.search === 'string') {
    filters.search = query.search.trim();
  }

  // Parse customer regions (array)
  if (query.customerRegions) {
    const regions = Array.isArray(query.customerRegions)
      ? query.customerRegions
      : [query.customerRegions];
    filters.customerRegions = regions.filter((r: any) => typeof r === 'string' && r.trim());
  }

  // Parse gender
  if (query.gender && typeof query.gender === 'string') {
    filters.gender = query.gender.trim();
  }

  // Parse age range
  if (query.ageMin !== undefined) {
    const ageMin = parseInt(query.ageMin);
    if (!isNaN(ageMin) && ageMin >= 0) {
      filters.ageMin = ageMin;
    }
  }

  if (query.ageMax !== undefined) {
    const ageMax = parseInt(query.ageMax);
    if (!isNaN(ageMax) && ageMax >= 0) {
      filters.ageMax = ageMax;
    }
  }

  // Parse product categories (array)
  if (query.productCategories) {
    const categories = Array.isArray(query.productCategories)
      ? query.productCategories
      : [query.productCategories];
    filters.productCategories = categories.filter(
      (c: any) => typeof c === 'string' && c.trim()
    );
  }

  // Parse tags (array)
  if (query.tags) {
    const tags = Array.isArray(query.tags) ? query.tags : [query.tags];
    filters.tags = tags.filter((t: any) => typeof t === 'string' && t.trim());
  }

  // Parse payment methods (array)
  if (query.paymentMethods) {
    const methods = Array.isArray(query.paymentMethods)
      ? query.paymentMethods
      : [query.paymentMethods];
    filters.paymentMethods = methods.filter((m: any) => typeof m === 'string' && m.trim());
  }

  // Parse date range
  if (query.dateFrom && typeof query.dateFrom === 'string') {
    filters.dateFrom = query.dateFrom.trim();
  }

  if (query.dateTo && typeof query.dateTo === 'string') {
    filters.dateTo = query.dateTo.trim();
  }

  // Parse sorting
  if (query.sortBy) {
    const validSortFields = ['date', 'quantity', 'customerName'];
    if (validSortFields.includes(query.sortBy)) {
      options.sortBy = query.sortBy as any;
    }
  }

  if (query.sortOrder) {
    const validOrders = ['asc', 'desc'];
    if (validOrders.includes(query.sortOrder)) {
      options.sortOrder = query.sortOrder;
    }
  }

  return { filters, options };
}


export async function getSalesRecords(req: Request, res: Response): Promise<void> {
  try {
    const { filters, options } = parseQueryParams(req.query);

    const result = await salesService.getAllSales({ ...filters, ...options });

    res.json({
      success: true,
      data: result,
      message: 'Sales records retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching sales records:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch sales records',
    });
  }
}


export async function getFilterOptionsHandler(req: Request, res: Response): Promise<void> {
  try {
    const options = await salesService.getFilterOptions();
    res.json({
      success: true,
      data: options,
      message: 'Filter options retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch filter options',
    });
  }
}
