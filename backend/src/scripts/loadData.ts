import * as fs from 'fs';
import * as path from 'path';
import { setSalesData, saveSalesData } from '../utils/dataStore';
import { SalesRecord } from '../types';


const SAMPLE_DATA: SalesRecord[] = [
  {
    // Customer
    customerId: 'CUST001',
    customerName: 'John Smith',
    phoneNumber: '+1-555-0001',
    gender: 'Male',
    age: 32,
    customerRegion: 'North America',
    customerType: 'Premium',

    // Product
    productId: 'PROD001',
    productName: 'Laptop Pro',
    brand: 'TechCorp',
    productCategory: 'Electronics',
    tags: ['computer', 'laptop', 'professional'],

    // Sales
    quantity: 1,
    pricePerUnit: 1200,
    discountPercentage: 10,
    totalAmount: 1200,
    finalAmount: 1080,

    // Operational
    date: '2024-12-01T10:30:00Z',
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    deliveryType: 'Express',
    storeId: 'STORE001',
    storeLocation: 'New York',
    salespersonId: 'EMP001',
    employeeName: 'Alice Johnson',
  },
  {
    customerId: 'CUST002',
    customerName: 'Sarah Williams',
    phoneNumber: '+1-555-0002',
    gender: 'Female',
    age: 28,
    customerRegion: 'Europe',
    customerType: 'Regular',

    productId: 'PROD002',
    productName: 'Wireless Mouse',
    brand: 'TechCorp',
    productCategory: 'Accessories',
    tags: ['mouse', 'wireless', 'affordable'],

    quantity: 3,
    pricePerUnit: 25,
    discountPercentage: 5,
    totalAmount: 75,
    finalAmount: 71.25,

    date: '2024-12-02T14:15:00Z',
    paymentMethod: 'PayPal',
    orderStatus: 'Delivered',
    deliveryType: 'Standard',
    storeId: 'STORE002',
    storeLocation: 'London',
    salespersonId: 'EMP002',
    employeeName: 'Bob Wilson',
  },
  {
    customerId: 'CUST003',
    customerName: 'Michael Chen',
    phoneNumber: '+1-555-0003',
    gender: 'Male',
    age: 45,
    customerRegion: 'Asia',
    customerType: 'Premium',

    productId: 'PROD003',
    productName: 'USB-C Cable',
    brand: 'ProTech',
    productCategory: 'Accessories',
    tags: ['cable', 'usb', 'charging'],

    quantity: 10,
    pricePerUnit: 15,
    discountPercentage: 15,
    totalAmount: 150,
    finalAmount: 127.5,

    date: '2024-12-03T09:00:00Z',
    paymentMethod: 'Bank Transfer',
    orderStatus: 'Processing',
    deliveryType: 'Express',
    storeId: 'STORE003',
    storeLocation: 'Tokyo',
    salespersonId: 'EMP003',
    employeeName: 'Carol Lee',
  },
  {
    customerId: 'CUST004',
    customerName: 'Emily Brown',
    phoneNumber: '+1-555-0004',
    gender: 'Female',
    age: 24,
    customerRegion: 'South America',
    customerType: 'Regular',

    productId: 'PROD004',
    productName: 'Monitor Stand',
    brand: 'DeskPro',
    productCategory: 'Accessories',
    tags: ['monitor', 'stand', 'ergonomic'],

    quantity: 2,
    pricePerUnit: 50,
    discountPercentage: 0,
    totalAmount: 100,
    finalAmount: 100,

    date: '2024-12-04T16:45:00Z',
    paymentMethod: 'Credit Card',
    orderStatus: 'Delivered',
    deliveryType: 'Standard',
    storeId: 'STORE004',
    storeLocation: 'São Paulo',
    salespersonId: 'EMP004',
    employeeName: 'David Martinez',
  },
  {
    customerId: 'CUST005',
    customerName: 'James Anderson',
    phoneNumber: '+1-555-0005',
    gender: 'Male',
    age: 35,
    customerRegion: 'North America',
    customerType: 'Regular',

    productId: 'PROD005',
    productName: 'Mechanical Keyboard',
    brand: 'KeyMaster',
    productCategory: 'Electronics',
    tags: ['keyboard', 'mechanical', 'gaming'],

    quantity: 1,
    pricePerUnit: 150,
    discountPercentage: 20,
    totalAmount: 150,
    finalAmount: 120,

    date: '2024-12-05T11:20:00Z',
    paymentMethod: 'Debit Card',
    orderStatus: 'Delivered',
    deliveryType: 'Express',
    storeId: 'STORE001',
    storeLocation: 'New York',
    salespersonId: 'EMP001',
    employeeName: 'Alice Johnson',
  },
  {
    customerId: 'CUST006',
    customerName: 'Lisa Zhang',
    phoneNumber: '+1-555-0006',
    gender: 'Female',
    age: 29,
    customerRegion: 'Asia',
    customerType: 'Premium',

    productId: 'PROD006',
    productName: '4K Webcam',
    brand: 'VisionPro',
    productCategory: 'Electronics',
    tags: ['webcam', 'video', '4k'],

    quantity: 1,
    pricePerUnit: 200,
    discountPercentage: 10,
    totalAmount: 200,
    finalAmount: 180,

    date: '2024-12-06T13:30:00Z',
    paymentMethod: 'Credit Card',
    orderStatus: 'Shipped',
    deliveryType: 'Standard',
    storeId: 'STORE003',
    storeLocation: 'Tokyo',
    salespersonId: 'EMP003',
    employeeName: 'Carol Lee',
  },
  {
    customerId: 'CUST007',
    customerName: 'Robert Johnson',
    phoneNumber: '+1-555-0007',
    gender: 'Male',
    age: 52,
    customerRegion: 'Europe',
    customerType: 'Regular',

    productId: 'PROD007',
    productName: 'Desk Lamp',
    brand: 'LightWorks',
    productCategory: 'Accessories',
    tags: ['lamp', 'lighting', 'desk'],

    quantity: 2,
    pricePerUnit: 45,
    discountPercentage: 5,
    totalAmount: 90,
    finalAmount: 85.5,

    date: '2024-12-07T10:00:00Z',
    paymentMethod: 'PayPal',
    orderStatus: 'Delivered',
    deliveryType: 'Standard',
    storeId: 'STORE002',
    storeLocation: 'London',
    salespersonId: 'EMP002',
    employeeName: 'Bob Wilson',
  },
  {
    customerId: 'CUST008',
    customerName: 'Jessica Davis',
    phoneNumber: '+1-555-0008',
    gender: 'Female',
    age: 31,
    customerRegion: 'North America',
    customerType: 'Premium',

    productId: 'PROD008',
    productName: 'Portable SSD',
    brand: 'StoragePro',
    productCategory: 'Electronics',
    tags: ['storage', 'ssd', 'portable'],

    quantity: 1,
    pricePerUnit: 300,
    discountPercentage: 15,
    totalAmount: 300,
    finalAmount: 255,

    date: '2024-12-08T15:30:00Z',
    paymentMethod: 'Credit Card',
    orderStatus: 'Processing',
    deliveryType: 'Express',
    storeId: 'STORE001',
    storeLocation: 'New York',
    salespersonId: 'EMP001',
    employeeName: 'Alice Johnson',
  },
];


function loadSampleData(): void {
  console.log('📦 Loading sample sales data...');
  setSalesData(SAMPLE_DATA);
  saveSalesData();
  console.log(`✅ Successfully loaded ${SAMPLE_DATA.length} sample records`);
}


function loadCSVData(filePath: string): void {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  CSV file not found at ${filePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    console.warn('⚠️  CSV loading not implemented. Using sample data instead.');
  } catch (error) {
    console.error('Error loading CSV data:', error);
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log('\n🚀 Data Loading Script\n');

  const csvPath = path.join(__dirname, '../../data/sales.csv');

  // Try to load CSV first
  loadCSVData(csvPath);

  // Fallback to sample data
  loadSampleData();

  console.log('\n✨ Data loading complete!\n');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
