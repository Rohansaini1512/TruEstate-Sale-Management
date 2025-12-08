import { SalesRecord, QueryFilters, QueryOptions, PaginatedResponse } from '../types';
import { getAllSalesData } from '../utils/dataStore';

/**
 * Service for handling all query operations: filtering, searching, sorting, and pagination
 */

/**
 * Normalize text for case-insensitive search
 */
function normalizeText(text: string | undefined): string {
  if (!text) return '';
  return text.toString().toLowerCase().trim();
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

/**
 * Check if text matches search term (case-insensitive full-text search)
 */
function matchesSearchTerm(text: string | undefined, searchTerm: string): boolean {
  const normalizedText = normalizeText(text);
  const normalizedSearch = normalizeText(searchTerm);
  return normalizedText.includes(normalizedSearch);
}

/**
 * Apply search filters (customerName, phoneNumber)
 */
function applySearchFilters(records: SalesRecord[], search?: string): SalesRecord[] {
  if (!search || search.trim() === '') {
    return records;
  }

  return records.filter((record) => {
    return (
      matchesSearchTerm(record.customerName, search) ||
      matchesSearchTerm(record.phoneNumber, search)
    );
  });
}

/**
 * Apply multi-select filters
 */
function applyMultiSelectFilters(
  records: SalesRecord[],
  filterKey: keyof SalesRecord,
  values?: string[] | string
): SalesRecord[] {
  // If no values provided, return all records
  if (!values || (Array.isArray(values) && values.length === 0)) {
    return records;
  }

  const filterValues = Array.isArray(values) ? values : [values];
  const normalizedValues = filterValues.map(normalizeText);

  return records.filter((record) => {
    const recordValue = normalizeText(record[filterKey] as string);
    return normalizedValues.includes(recordValue);
  });
}

/**
 * Apply tags filter (matches if record contains ANY of the selected tags)
 */
function applyTagsFilter(records: SalesRecord[], tags?: string[]): SalesRecord[] {
  if (!tags || tags.length === 0) {
    return records;
  }

  const normalizedTags = tags.map(normalizeText);

  return records.filter((record) => {
    // Check if record has tags and if any of them match
    if (!record.tags || record.tags.length === 0) {
      return false;
    }

    return record.tags.some((tag) =>
      normalizedTags.includes(normalizeText(tag))
    );
  });
}

/**
 * Apply age range filter
 */
function applyAgeRangeFilter(
  records: SalesRecord[],
  ageMin?: number,
  ageMax?: number
): SalesRecord[] {
  return records.filter((record) => {
    if (ageMin !== undefined && record.age < ageMin) {
      return false;
    }
    if (ageMax !== undefined && record.age > ageMax) {
      return false;
    }
    return true;
  });
}

/**
 * Apply date range filter
 */
function applyDateRangeFilter(
  records: SalesRecord[],
  dateFrom?: string,
  dateTo?: string
): SalesRecord[] {
  const from = dateFrom ? parseDate(dateFrom) : null;
  const to = dateTo ? parseDate(dateTo) : null;

  return records.filter((record) => {
    const recordDate = parseDate(record.date);

    if (!recordDate) {
      // If record date is invalid, exclude it
      return false;
    }

    if (from && recordDate < from) {
      return false;
    }

    if (to) {
      // Set time to end of day for inclusive range
      const toEndOfDay = new Date(to);
      toEndOfDay.setHours(23, 59, 59, 999);
      if (recordDate > toEndOfDay) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Apply all filters to records
 */
function applyFilters(
  records: SalesRecord[],
  filters: QueryFilters
): SalesRecord[] {
  let filtered = records;

  // Apply search filter
  if (filters.search) {
    filtered = applySearchFilters(filtered, filters.search);
  }

  // Apply multi-select filters
  if (filters.customerRegions && filters.customerRegions.length > 0) {
    filtered = filtered.filter((record) =>
      filters.customerRegions!.some(
        (region) => normalizeText(record.customerRegion) === normalizeText(region)
      )
    );
  }

  if (filters.gender) {
    filtered = applyMultiSelectFilters(filtered, 'gender', filters.gender);
  }

  if (filters.productCategories && filters.productCategories.length > 0) {
    filtered = filtered.filter((record) =>
      filters.productCategories!.some(
        (category) =>
          normalizeText(record.productCategory) === normalizeText(category)
      )
    );
  }

  // Apply tags filter (ANY match)
  if (filters.tags && filters.tags.length > 0) {
    filtered = applyTagsFilter(filtered, filters.tags);
  }

  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    filtered = filtered.filter((record) =>
      filters.paymentMethods!.some(
        (method) =>
          normalizeText(record.paymentMethod) === normalizeText(method)
      )
    );
  }

  // Apply age range filter
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    filtered = applyAgeRangeFilter(filtered, filters.ageMin, filters.ageMax);
  }

  // Apply date range filter
  if (filters.dateFrom || filters.dateTo) {
    filtered = applyDateRangeFilter(filtered, filters.dateFrom, filters.dateTo);
  }

  return filtered;
}

/**
 * Apply sorting to records
 */
function applySorting(
  records: SalesRecord[],
  sortBy?: string,
  sortOrder?: string
): SalesRecord[] {
  if (!sortBy) {
    // Default: sort by date (newest first)
    return records.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }

  const order = sortOrder === 'asc' ? 1 : -1;

  const sorted = [...records].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return (dateB - dateA) * order;

      case 'quantity':
        return (a.quantity - b.quantity) * order;

      case 'customerName':
        return normalizeText(a.customerName).localeCompare(
          normalizeText(b.customerName)
        ) * order;

      default:
        // Default to date sorting
        const d1 = new Date(a.date).getTime();
        const d2 = new Date(b.date).getTime();
        return (d2 - d1) * order;
    }
  });

  return sorted;
}

/**
 * Apply pagination to records
 */
function applyPagination<T>(
  records: T[],
  page: number,
  limit: number
): { items: T[]; totalItems: number; totalPages: number; currentPage: number } {
  const totalItems = records.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Ensure page is valid
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    items: records.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage,
  };
}

/**
 * Query sales records with filtering, sorting, and pagination
 */
export function querySalesRecords(
  filters: QueryFilters,
  options: QueryOptions
): PaginatedResponse<SalesRecord> {
  // Get all data
  const allRecords = getAllSalesData();

  // Apply filters
  let filtered = applyFilters(allRecords, filters);

  // Apply sorting
  const sorted = applySorting(filtered, options.sortBy, options.sortOrder);

  // Apply pagination
  const paginated = applyPagination(sorted, options.page, options.limit);

  return {
    items: paginated.items,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
    currentPage: paginated.currentPage,
    limit: options.limit,
  };
}

/**
 * Get available filter options (distinct values)
 */
export function getFilterOptions() {
  const records = getAllSalesData();

  const customerRegions = [...new Set(records.map((r) => r.customerRegion))].sort();
  const genders = [...new Set(records.map((r) => r.gender))].sort();
  const productCategories = [...new Set(records.map((r) => r.productCategory))].sort();
  const paymentMethods = [...new Set(records.map((r) => r.paymentMethod))].sort();
  const allTags = [
    ...new Set(records.flatMap((r) => r.tags || []))
  ].sort();

  const ages = records.map((r) => r.age).filter((a) => !isNaN(a));
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  const dates = records
    .map((r) => new Date(r.date).getTime())
    .filter((d) => !isNaN(d));
  const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];

  return {
    customerRegions,
    genders,
    productCategories,
    paymentMethods,
    tags: allTags,
    ageRange: { min: minAge, max: maxAge },
    dateRange: { min: minDate, max: maxDate },
  };
}
