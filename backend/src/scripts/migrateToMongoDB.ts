import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SalesRecordModel } from '../models/SalesRecord';
import { connectDB, disconnectDB } from '../config/database';

dotenv.config();


async function migrateData() {
  try {
    console.log('🚀 Starting data migration...\n');

    // Connect to MongoDB
    await connectDB();

    // Read JSON file
    const dataPath = path.join(__dirname, '../../data/sales.json');
    if (!fs.existsSync(dataPath)) {
      console.error(` Data file not found at ${dataPath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const salesData = JSON.parse(rawData);

    console.log(`📂 Found ${salesData.length} records in JSON file`);

    // Check if data already exists
    const existingCount = await SalesRecordModel.countDocuments();
    
    if (existingCount > 0) {
      console.log(`\n  Database already contains ${existingCount} records`);
      console.log('Options:');
      console.log('  1. Keep existing data and add new records');
      console.log('  2. Clear existing data and import fresh');
      console.log('\nTo clear and reimport, use: npm run migrate-data -- --clear\n');
      
      const shouldClear = process.argv.includes('--clear');
      
      if (shouldClear) {
        console.log(' Clearing existing data...');
        await SalesRecordModel.deleteMany({});
        console.log('✓ Existing data cleared\n');
      } else {
        console.log(' Keeping existing data, adding new records...\n');
      }
    }

    // Insert data
    console.log(' Inserting records into MongoDB...');
    const result = await SalesRecordModel.insertMany(salesData, { ordered: false });
    
    console.log(`\n Migration completed successfully!`);
    console.log(`   Records inserted: ${result.length}`);
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
      console.log(`\n Database Statistics:`);
      console.log(`   Total Sales: $${stats[0].totalSales.toFixed(2)}`);
      console.log(`   Average Sale: $${stats[0].avgSales.toFixed(2)}`);
      console.log(`   Total Records: ${stats[0].totalRecords}`);
    }

    await disconnectDB();
    console.log('\n Migration complete!\n');
    
  } catch (error: any) {
    console.error('\n Migration failed:', error.message);
    
    if (error.code === 11000) {
      console.error('\n Duplicate key error. Some records may already exist.');
      console.error('   Use --clear flag to clear existing data first.\n');
    }
    
    await disconnectDB();
    process.exit(1);
  }
}

// Run migration
migrateData();
