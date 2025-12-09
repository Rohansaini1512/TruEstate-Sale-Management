import { SalesRecordModel, ISalesRecord } from '../models/SalesRecord';
import { SalesRecord } from '../types';

export class SalesService {
  async getAllSales(params: {
    page?: number;
    limit?: number;
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
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    items: ISalesRecord[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }> {
    const {
      page = 1,
      limit = 10,
      search,
      customerRegions,
      gender,
      ageMin,
      ageMax,
      productCategories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy = 'date',
      sortOrder = 'desc',
    } = params;

    // Build query
    const query: any = {};

    // Text search
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } },
        { customerId: { $regex: search, $options: 'i' } },
        { productId: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { employeeName: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by customer regions
    if (customerRegions && customerRegions.length > 0) {
      query.customerRegion = { $in: customerRegions };
    }

    // Filter by gender
    if (gender) {
      query.gender = gender;
    }

    // Filter by age range
    if (ageMin !== undefined || ageMax !== undefined) {
      query.age = {};
      if (ageMin !== undefined) query.age.$gte = ageMin;
      if (ageMax !== undefined) query.age.$lte = ageMax;
    }

    // Filter by product categories
    if (productCategories && productCategories.length > 0) {
      query.productCategory = { $in: productCategories };
    }

    // Filter by tags
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    // Filter by payment methods
    if (paymentMethods && paymentMethods.length > 0) {
      query.paymentMethod = { $in: paymentMethods };
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const [items, totalItems] = await Promise.all([
      SalesRecordModel.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      SalesRecordModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
      limit,
    };
  }

  /**
   * Get filter options (unique values for dropdowns)
   */
  async getFilterOptions(): Promise<{
    customerRegions: string[];
    genders: string[];
    productCategories: string[];
    tags: string[];
    paymentMethods: string[];
  }> {
    const [customerRegions, genders, productCategories, tags, paymentMethods] = await Promise.all([
      SalesRecordModel.distinct('customerRegion'),
      SalesRecordModel.distinct('gender'),
      SalesRecordModel.distinct('productCategory'),
      SalesRecordModel.distinct('tags'),
      SalesRecordModel.distinct('paymentMethod'),
    ]);

    return {
      customerRegions: customerRegions.sort(),
      genders: genders.sort(),
      productCategories: productCategories.sort(),
      tags: tags.sort(),
      paymentMethods: paymentMethods.sort(),
    };
  }

  /**
   * Add a new sales record
   */
  async addSalesRecord(record: SalesRecord): Promise<ISalesRecord> {
    const salesRecord = new SalesRecordModel(record);
    return await salesRecord.save();
  }

  /**
   * Add multiple sales records (bulk insert)
   */
  async addMultipleSalesRecords(records: SalesRecord[]): Promise<any[]> {
    return await SalesRecordModel.insertMany(records);
  }

  /**
   * Get sales record by ID
   */
  async getSalesRecordById(id: string): Promise<ISalesRecord | null> {
    return await SalesRecordModel.findById(id);
  }

  /**
   * Update sales record
   */
  async updateSalesRecord(id: string, updates: Partial<SalesRecord>): Promise<ISalesRecord | null> {
    return await SalesRecordModel.findByIdAndUpdate(id, updates, { new: true });
  }

  /**
   * Delete sales record
   */
  async deleteSalesRecord(id: string): Promise<boolean> {
    const result = await SalesRecordModel.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Clear all sales records (use with caution!)
   */
  async clearAllSalesRecords(): Promise<void> {
    await SalesRecordModel.deleteMany({});
  }

  /**
   * Get total count
   */
  async getTotalCount(): Promise<number> {
    return await SalesRecordModel.countDocuments();
  }
}

export const salesService = new SalesService();
