import * as fs from 'fs';
import * as path from 'path';
import { SalesRecord } from '../types';

/**
 * In-memory data store for sales records
 */
let salesData: SalesRecord[] = [];

/**
 * Load sales data from JSON file
 */
export function loadSalesData(): SalesRecord[] {
  try {
    const dataPath = path.join(__dirname, '../../data/sales.json');
    
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      salesData = JSON.parse(rawData);
      console.log(`✓ Loaded ${salesData.length} sales records from JSON`);
    } else {
      console.warn(`⚠ Data file not found at ${dataPath}`);
      // Initialize with empty array if file doesn't exist
      salesData = [];
    }
  } catch (error) {
    console.error('Error loading sales data:', error);
    salesData = [];
  }
  
  return salesData;
}

/**
 * Get all sales data
 */
export function getAllSalesData(): SalesRecord[] {
  return salesData;
}

/**
 * Set sales data (useful for testing or data loading)
 */
export function setSalesData(data: SalesRecord[]): void {
  salesData = data;
}

/**
 * Save sales data to JSON file
 */
export function saveSalesData(): void {
  try {
    const dataPath = path.join(__dirname, '../../data/sales.json');
    fs.writeFileSync(dataPath, JSON.stringify(salesData, null, 2), 'utf-8');
    console.log('✓ Sales data saved');
  } catch (error) {
    console.error('Error saving sales data:', error);
  }
}

/**
 * Add a new sales record
 */
export function addSalesRecord(record: SalesRecord): void {
  salesData.push(record);
}

/**
 * Clear all sales data
 */
export function clearSalesData(): void {
  salesData = [];
}
