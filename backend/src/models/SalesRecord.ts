import mongoose, { Schema, Document } from 'mongoose';

export interface ISalesRecord extends Document {
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
  date: Date;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SalesRecordSchema: Schema = new Schema(
  {
    // Customer Information
    customerId: { type: String, required: true, index: true },
    customerName: { type: String, required: true, index: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    age: { type: Number, required: true, min: 0, max: 150 },
    customerRegion: { type: String, required: true, index: true },
    customerType: { type: String, required: true, enum: ['Regular', 'Premium', 'VIP'] },

    // Product Information
    productId: { type: String, required: true, index: true },
    productName: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    productCategory: { type: String, required: true, index: true },
    tags: [{ type: String }],

    // Sales Information
    quantity: { type: Number, required: true, min: 1 },
    pricePerUnit: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    totalAmount: { type: Number, required: true, min: 0 },
    finalAmount: { type: Number, required: true, min: 0 },

    // Operational Information
    date: { type: Date, required: true, index: true },
    paymentMethod: { 
      type: String, 
      required: true, 
      enum: ['Credit Card', 'Debit Card', 'Cash', 'PayPal', 'Bank Transfer'] 
    },
    orderStatus: { 
      type: String, 
      required: true, 
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] 
    },
    deliveryType: { 
      type: String, 
      required: true, 
      enum: ['Standard', 'Express', 'Next Day', 'Same Day'] 
    },
    storeId: { type: String, required: true, index: true },
    storeLocation: { type: String, required: true },
    salespersonId: { type: String, required: true },
    employeeName: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'sales_records',
  }
);

// Indexes for better query performance
SalesRecordSchema.index({ date: -1 }); // For date sorting
SalesRecordSchema.index({ customerName: 'text', productName: 'text' }); // For text search
SalesRecordSchema.index({ finalAmount: 1 }); // For amount filtering

export const SalesRecordModel = mongoose.model<ISalesRecord>('SalesRecord', SalesRecordSchema);
