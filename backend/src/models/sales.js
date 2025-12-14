const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  customerId: String,
  customerName: String,
  phoneNumber: String,
  gender: String,
  age: Number,
  customerRegion: String,
  customerType: String,

  productId: String,
  productName: String,
  brand: String,
  productCategory: String,
  tags: [String],

  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,

  date: Date,
  paymentMethod: String,
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String,
}, {
  collection: 'sales_records'  
});

// Add indexes for better query performance
SalesSchema.index({ customerName: 1 });
SalesSchema.index({ phoneNumber: 1 });
SalesSchema.index({ date: -1 });
SalesSchema.index({ customerRegion: 1 });
SalesSchema.index({ productCategory: 1 });
SalesSchema.index({ tags: 1 });

module.exports = mongoose.model("Sales", SalesSchema);