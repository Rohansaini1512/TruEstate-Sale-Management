import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SalesRecordModel } from '../models/SalesRecord';
import { connectDB, disconnectDB } from '../config/database';

dotenv.config();

interface CSVRow {
  [key: string]: any;
}

/**
 * Map CSV column names to database field names
 * Customize this mapping based on your CSV structure
 */
function mapCSVRowToSalesRecord(row: CSVRow): any {
  // Helper to map gender values
  const mapGender = (value: string): string => {
    if (!value) return 'Other';
    const genderMap: Record<string, string> = {
      'male': 'Male',
      'm': 'Male',
      'female': 'Female',
      'f': 'Female',
      'other': 'Other',
      'o': 'Other',
    };
    return genderMap[value.toLowerCase().trim()] || 'Other';
  };

  // Helper to map customer type values
  const mapCustomerType = (value: string): string => {
    if (!value) return 'Regular';
    const typeMap: Record<string, string> = {
      'regular': 'Regular',
      'premium': 'Premium',
      'vip': 'VIP',
    };
    return typeMap[value.toLowerCase().trim()] || 'Regular';
  };

  // Helper to map payment method values
  const mapPaymentMethod = (value: string): string => {
    if (!value) return 'Cash';
    const methodMap: Record<string, string> = {
      'credit': 'Credit Card',
      'credit card': 'Credit Card',
      'debit': 'Debit Card',
      'debit card': 'Debit Card',
      'cash': 'Cash',
      'paypal': 'PayPal',
      'bank': 'Bank Transfer',
      'bank transfer': 'Bank Transfer',
    };
    return methodMap[value.toLowerCase().trim()] || 'Cash';
  };

  // Helper to map order status values
  const mapOrderStatus = (value: string): string => {
    if (!value) return 'Delivered';
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    return statusMap[value.toLowerCase().trim()] || 'Delivered';
  };

  // Helper to map delivery type values
  const mapDeliveryType = (value: string): string => {
    if (!value) return 'Standard';
    const typeMap: Record<string, string> = {
      'standard': 'Standard',
      'express': 'Express',
      'next': 'Next Day',
      'next day': 'Next Day',
      'same': 'Same Day',
      'same day': 'Same Day',
    };
    return typeMap[value.toLowerCase().trim()] || 'Standard';
  };

  return {
    // Transaction/Customer Information
    transactionId: row['Transaction ID'] || row.transactionId || row.transaction_id || `TXN${Date.now()}`,
    customerId: row['Customer ID'] || row.customerId || row.customer_id || row.CustomerID || `CUST${Date.now()}`,
    customerName: row['Customer Name'] || row.customerName || row.customer_name || row.CustomerName || 'Unknown',
    phoneNumber: row['Phone Number'] || row.phoneNumber || row.phone_number || row.Phone || '',
    gender: mapGender(row.Gender || row.gender),
    age: Math.max(0, Math.min(150, parseInt(row.Age || row.age) || 0)),
    customerRegion: row['Customer Region'] || row.customerRegion || row.customer_region || row.Region || 'Unknown',
    customerType: mapCustomerType(row['Customer Type'] || row.customerType || row.customer_type || row.Type),

    // Product Information
    productId: row['Product ID'] || row.productId || row.product_id || row.ProductID || `PROD${Date.now()}`,
    productName: row['Product Name'] || row.productName || row.product_name || row.ProductName || 'Unknown Product',
    brand: row.Brand || row.brand || 'Unknown',
    productCategory: row['Product Category'] || row.productCategory || row.product_category || row.Category || 'General',
    tags: parseArray(row.Tags || row.tags || ''),

    // Sales Information
    quantity: Math.max(1, parseInt(row.Quantity || row.quantity) || 1),
    pricePerUnit: Math.max(0, parseFloat(row['Price per Unit'] || row.pricePerUnit || row.price_per_unit || row.Price) || 0),
    discountPercentage: Math.max(0, Math.min(100, parseFloat(row['Discount Percentage'] || row.discountPercentage || row.discount_percentage || row.Discount) || 0)),
    totalAmount: Math.max(0, parseFloat(row['Total Amount'] || row.totalAmount || row.total_amount || row.Total) || 0),
    finalAmount: Math.max(0, parseFloat(row['Final Amount'] || row.finalAmount || row.final_amount || row.FinalAmount) || 0),

    // Operational Information
    date: parseDate(row.Date || row.date || row.order_date || row.OrderDate),
    paymentMethod: mapPaymentMethod(row['Payment Method'] || row.paymentMethod || row.payment_method || row.PaymentMethod),
    orderStatus: mapOrderStatus(row['Order Status'] || row.orderStatus || row.order_status || row.Status),
    deliveryType: mapDeliveryType(row['Delivery Type'] || row.deliveryType || row.delivery_type || row.DeliveryType),
    storeId: row['Store ID'] || row.storeId || row.store_id || row.StoreID || 'STORE001',
    storeLocation: row['Store Location'] || row.storeLocation || row.store_location || row.Location || 'Unknown',
    salespersonId: row['Salesperson ID'] || row.salespersonId || row.salesperson_id || row.SalespersonID || 'EMP001',
    employeeName: row['Employee Name'] || row.employeeName || row.employee_name || row.EmployeeName || 'Unknown',
  };
}

/**
 * Parse array from string (comma-separated or JSON)
 */
function parseArray(value: string): string[] {
  if (!value) return [];
  
  try {
    // Try parsing as JSON array
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // Not JSON, try comma-separated
  }
  
  // Split by comma and clean up
  return value.split(',').map(item => item.trim()).filter(item => item);
}

/**
 * Parse date from various formats
 */
function parseDate(value: string): Date {
  if (!value) return new Date();
  
  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date;
  }
  
  // Return current date if parsing fails
  return new Date();
}

/**
 * Read CSV file and return records
 */
function readCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const records: any[] = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: CSVRow) => {
        try {
          const record = mapCSVRowToSalesRecord(row);
          records.push(record);
        } catch (error) {
          console.warn('⚠️  Error parsing row:', error);
        }
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Main migration function
 */
async function migrateCSVToMongoDB() {
  try {
    console.log('🚀 Starting CSV to MongoDB migration...\n');

    // Get CSV file path from command line argument
    const csvFilePath = process.argv[2];
    
    if (!csvFilePath) {
      console.error('❌ Please provide CSV file path as argument');
      console.log('\nUsage:');
      console.log('  npm run migrate-csv /path/to/your/file.csv');
      console.log('  npm run migrate-csv /path/to/your/file.csv --clear\n');
      process.exit(1);
    }

    // Check if file exists
    const absolutePath = path.isAbsolute(csvFilePath) 
      ? csvFilePath 
      : path.join(process.cwd(), csvFilePath);

    if (!fs.existsSync(absolutePath)) {
      console.error(`❌ CSV file not found at: ${absolutePath}\n`);
      process.exit(1);
    }

    console.log(`📂 Reading CSV file: ${absolutePath}`);

    // Connect to MongoDB
    await connectDB();

    // Read CSV file
    console.log('📖 Parsing CSV data...');
    const salesData = await readCSVFile(absolutePath);
    
    if (salesData.length === 0) {
      console.log('⚠️  No records found in CSV file\n');
      await disconnectDB();
      process.exit(0);
    }

    console.log(`✓ Parsed ${salesData.length} records from CSV\n`);

    // Check if data already exists
    const existingCount = await SalesRecordModel.countDocuments();
    
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} records`);
      
      const shouldClear = process.argv.includes('--clear');
      
      if (shouldClear) {
        console.log('🗑️  Clearing existing data...');
        await SalesRecordModel.deleteMany({});
        console.log('✓ Existing data cleared\n');
      } else {
        console.log('📊 Adding new records to existing data...');
        console.log('   (Use --clear flag to clear existing data first)\n');
      }
    }

    // Insert data in batches (to handle large files)
    const batchSize = 1000;
    let totalInserted = 0;
    
    console.log('💾 Inserting records into MongoDB...');
    
    for (let i = 0; i < salesData.length; i += batchSize) {
      const batch = salesData.slice(i, i + batchSize);
      try {
        const result = await SalesRecordModel.insertMany(batch, { ordered: false });
        totalInserted += result.length;
        console.log(`   Inserted ${totalInserted}/${salesData.length} records...`);
      } catch (error: any) {
        // Handle duplicate key errors
        if (error.code === 11000) {
          console.log(`   Skipped some duplicate records in batch ${i / batchSize + 1}`);
        } else if (error.writeErrors && error.writeErrors.length > 0) {
          const validCount = batch.length - error.writeErrors.length;
          totalInserted += validCount;
          console.log(`   Batch ${i / batchSize + 1}: ${validCount} inserted, ${error.writeErrors.length} failed`);
          
          // Log first error for debugging
          if (error.writeErrors[0]) {
            console.warn(`   First error: ${error.writeErrors[0].errmsg}`);
          }
        } else {
          console.error(`   Error inserting batch: ${error.message}`);
          throw error;
        }
      }
    }

    console.log(`\n✅ Migration completed successfully!`);
    console.log(`   Records processed: ${salesData.length}`);
    console.log(`   Total records in database: ${await SalesRecordModel.countDocuments()}`);

    // Show some statistics
    const stats = await SalesRecordModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$finalAmount' },
          avgSales: { $avg: '$finalAmount' },
          totalRecords: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      console.log(`\n📊 Database Statistics:`);
      console.log(`   Total Sales: $${stats[0].totalSales.toFixed(2)}`);
      console.log(`   Average Sale: $${stats[0].avgSales.toFixed(2)}`);
      console.log(`   Total Records: ${stats[0].totalRecords}`);
    }

    // Show sample of first record
    const sampleRecord = await SalesRecordModel.findOne();
    if (sampleRecord) {
      console.log(`\n📝 Sample Record:`);
      console.log(`   Customer: ${sampleRecord.customerName}`);
      console.log(`   Product: ${sampleRecord.productName}`);
      console.log(`   Amount: $${sampleRecord.finalAmount}`);
      console.log(`   Date: ${sampleRecord.date.toLocaleDateString()}`);
    }

    await disconnectDB();
    console.log('\n✨ Migration complete!\n');
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\nError details:', error);
    await disconnectDB();
    process.exit(1);
  }
}

// Run migration
migrateCSVToMongoDB();
