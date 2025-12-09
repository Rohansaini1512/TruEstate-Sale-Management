# CSV Import Guide

This guide explains how to import your own CSV dataset into MongoDB.

## Quick Start

1. **Place your CSV file** anywhere on your system
2. **Run the import command**:
   ```bash
   cd backend
   npm run migrate-csv /path/to/your/file.csv
   ```

## CSV Format Requirements

### Required Columns

Your CSV should have columns for sales data. The script will automatically map common column names. Here are the fields it looks for:

#### Customer Information:
- `customerId`, `customer_id`, or `CustomerID`
- `customerName`, `customer_name`, or `CustomerName`
- `phoneNumber`, `phone_number`, or `Phone`
- `gender` or `Gender`
- `age` or `Age`
- `customerRegion`, `customer_region`, or `Region`
- `customerType`, `customer_type`, or `Type`

#### Product Information:
- `productId`, `product_id`, or `ProductID`
- `productName`, `product_name`, or `ProductName`
- `brand` or `Brand`
- `productCategory`, `product_category`, or `Category`
- `tags` or `Tags` (comma-separated: "tag1,tag2,tag3")

#### Sales Information:
- `quantity` or `Quantity`
- `pricePerUnit`, `price_per_unit`, or `Price`
- `discountPercentage`, `discount_percentage`, or `Discount`
- `totalAmount`, `total_amount`, or `Total`
- `finalAmount`, `final_amount`, or `FinalAmount`

#### Operational Information:
- `date`, `Date`, `order_date`, or `OrderDate`
- `paymentMethod`, `payment_method`, or `PaymentMethod`
- `orderStatus`, `order_status`, or `Status`
- `deliveryType`, `delivery_type`, or `DeliveryType`
- `storeId`, `store_id`, or `StoreID`
- `storeLocation`, `store_location`, or `Location`
- `salespersonId`, `salesperson_id`, or `SalespersonID`
- `employeeName`, `employee_name`, or `EmployeeName`

### Example CSV Format

```csv
customerId,customerName,phoneNumber,gender,age,customerRegion,customerType,productId,productName,brand,productCategory,tags,quantity,pricePerUnit,discountPercentage,totalAmount,finalAmount,date,paymentMethod,orderStatus,deliveryType,storeId,storeLocation,salespersonId,employeeName
CUST001,John Smith,+1-555-0001,Male,32,North America,Premium,PROD001,Laptop Pro,TechCorp,Electronics,"computer,laptop",1,1200,10,1200,1080,2024-12-01T10:30:00Z,Credit Card,Delivered,Express,STORE001,New York,EMP001,Alice Johnson
CUST002,Sarah Williams,+1-555-0002,Female,28,Europe,Regular,PROD002,Wireless Mouse,TechCorp,Accessories,"mouse,wireless",3,25,5,75,71.25,2024-12-01T11:45:00Z,Debit Card,Delivered,Standard,STORE002,London,EMP002,Bob Smith
```

## Usage Examples

### Basic Import
```bash
npm run migrate-csv data/sales.csv
```

### Import with Absolute Path
```bash
npm run migrate-csv /home/user/Documents/my_sales_data.csv
```

### Clear Existing Data and Import
```bash
npm run migrate-csv data/sales.csv --clear
```

### Import from Different Directory
```bash
npm run migrate-csv ../datasets/sales_2024.csv
```

## Customizing Column Mapping

If your CSV has different column names, you can edit the mapping function in:
`backend/src/scripts/migrateCSVToMongoDB.ts`

Look for the `mapCSVRowToSalesRecord` function and update the mappings:

```typescript
function mapCSVRowToSalesRecord(row: CSVRow): any {
  return {
    customerId: row.YOUR_COLUMN_NAME || row.customer_id || `CUST${Date.now()}`,
    customerName: row.YOUR_COLUMN_NAME || row.customer_name || 'Unknown',
    // ... customize other fields
  };
}
```

## Common Issues & Solutions

### Issue: "CSV file not found"
**Solution:** Check the file path. Use absolute path or relative path from backend folder.
```bash
# Absolute path
npm run migrate-csv /home/user/data/sales.csv

# Relative to backend folder
npm run migrate-csv ../data/sales.csv
```

### Issue: "No records found in CSV file"
**Solution:** 
- Check if CSV has headers in first row
- Ensure file is not empty
- Verify file encoding (UTF-8 is recommended)

### Issue: "Some records skipped"
**Solution:** This is normal for duplicate records. The script will skip duplicates and continue.

### Issue: Date parsing errors
**Solution:** Ensure dates are in ISO format (YYYY-MM-DD) or standard formats:
- `2024-12-01`
- `2024-12-01T10:30:00Z`
- `12/01/2024`
- `Dec 1, 2024`

## Verification Steps

After import, verify your data:

1. **Check record count:**
   ```bash
   mongosh
   use truestate-sales
   db.sales_records.countDocuments()
   ```

2. **View sample records:**
   ```bash
   db.sales_records.find().limit(5).pretty()
   ```

3. **Start backend and check API:**
   ```bash
   npm run dev
   # Visit: http://localhost:5000/api/sales
   ```

4. **View in frontend:**
   ```bash
   cd ../frontend
   npm start
   # Visit: http://localhost:3000
   ```

## Large File Import

For very large CSV files (100K+ rows):

1. **Split the file** into smaller chunks:
   ```bash
   split -l 10000 large_file.csv chunk_
   ```

2. **Import each chunk:**
   ```bash
   npm run migrate-csv chunk_aa
   npm run migrate-csv chunk_ab
   npm run migrate-csv chunk_ac
   ```

## Data Cleanup

To remove all imported data:
```bash
mongosh
use truestate-sales
db.sales_records.deleteMany({})
```

Or use the migration script with --clear:
```bash
npm run migrate-csv data/new_file.csv --clear
```

## Tips for Best Results

1. **Clean your CSV** before import:
   - Remove empty rows
   - Ensure consistent date formats
   - Verify numeric fields don't have special characters
   - Check for proper encoding (UTF-8)

2. **Test with small sample** first:
   - Export first 100 rows to a test CSV
   - Import test file
   - Verify data looks correct
   - Then import full dataset

3. **Backup before --clear**:
   - Export existing data before clearing
   - Keep original CSV files safe

4. **Monitor import progress**:
   - Script shows progress for large imports
   - Watch for any error messages
   - Check final statistics

## Need Help?

If your CSV format is very different or you need custom mapping:
1. Check the sample CSV format above
2. Modify the `mapCSVRowToSalesRecord` function
3. Test with a small sample first
4. Contact support if issues persist
