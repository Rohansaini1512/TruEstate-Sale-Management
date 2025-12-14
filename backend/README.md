# Retail Sales Management System - Backend

A robust Express.js REST API for managing retail sales data with advanced filtering, sorting, and pagination capabilities.

## Features

✨ **Advanced Query Capabilities:**
- Full-text search (case-insensitive) on customer names and phone numbers
- Multi-select filters for regions, categories, payment methods, tags
- Age range filtering
- Date range filtering
- Multiple sorting options (date, quantity, customer name)
- Pagination with configurable page size

🔧 **Clean Architecture:**
- Modular code structure (controllers, services, utils)
- Type-safe TypeScript implementation
- Reusable query logic with no duplication
- Comprehensive error handling

📊 **Data Management:**
- JSON-based data storage
- Sample data loading script
- Filter options endpoint for dynamic UI

## Live Demo

This application is deployed and accessible at: http://13.60.213.199/

Note: The backend uses MongoDB via Mongoose for persistent storage. Configure your connection string using the `MONGODB_URI` (or `MONGO_URI`) environment variable.

Example `.env` (do NOT commit secrets):
```
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/truestate-sales

# Or MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/truestate-sales?retryWrites=true&w=majority
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── controllers/
│   │   └── salesController.ts   # Request handlers
│   ├── services/
│   │   └── queryService.ts      # Business logic (filtering, sorting, pagination)
│   ├── routes/
│   │   └── salesRoutes.ts       # API routes
│   ├── utils/
│   │   └── dataStore.ts         # Data persistence
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── scripts/
│       └── loadData.ts          # Data loading script
├── data/
│   └── sales.json              # Sales data storage
├── dist/                       # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Load Sample Data
```bash
npm run load-data
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. **GET /api/sales** - Query Sales Records

The main endpoint for retrieving sales records with filtering, sorting, and pagination.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search in customerName or phoneNumber (case-insensitive) | `search=john` |
| `customerRegions` | string[] | Filter by customer regions (multi-select) | `customerRegions=North America&customerRegions=Europe` |
| `gender` | string | Filter by gender | `gender=Male` |
| `ageMin` | number | Minimum age filter | `ageMin=25` |
| `ageMax` | number | Maximum age filter | `ageMax=45` |
| `productCategories` | string[] | Filter by product categories (multi-select) | `productCategories=Electronics&productCategories=Accessories` |
| `tags` | string[] | Filter by tags (matches ANY tag) | `tags=laptop&tags=wireless` |
| `paymentMethods` | string[] | Filter by payment methods (multi-select) | `paymentMethods=Credit Card&paymentMethods=PayPal` |
| `dateFrom` | string | Start date (ISO 8601 format) | `dateFrom=2024-12-01` |
| `dateTo` | string | End date (ISO 8601 format) | `dateTo=2024-12-31` |
| `sortBy` | string | Sort field: `date`, `quantity`, `customerName` | `sortBy=date` |
| `sortOrder` | string | Sort order: `asc`, `desc` | `sortOrder=desc` |
| `page` | number | Page number (default: 1) | `page=2` |
| `limit` | number | Records per page (default: 10, max: 100) | `limit=20` |

**Response Example:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "customerId": "CUST001",
        "customerName": "John Smith",
        "phoneNumber": "+1-555-0001",
        "gender": "Male",
        "age": 32,
        "customerRegion": "North America",
        "customerType": "Premium",
        "productId": "PROD001",
        "productName": "Laptop Pro",
        "brand": "TechCorp",
        "productCategory": "Electronics",
        "tags": ["computer", "laptop", "professional"],
        "quantity": 1,
        "pricePerUnit": 1200,
        "discountPercentage": 10,
        "totalAmount": 1200,
        "finalAmount": 1080,
        "date": "2024-12-01T10:30:00Z",
        "paymentMethod": "Credit Card",
        "orderStatus": "Delivered",
        "deliveryType": "Express",
        "storeId": "STORE001",
        "storeLocation": "New York",
        "salespersonId": "EMP001",
        "employeeName": "Alice Johnson"
      }
    ],
    "totalItems": 42,
    "totalPages": 5,
    "currentPage": 1,
    "limit": 10
  },
  "message": "Sales records retrieved successfully"
}
```

### 2. **GET /api/sales/filters** - Get Available Filter Options

Returns all distinct values for filterable fields, useful for building dynamic filter UI.

**Response Example:**
```json
{
  "success": true,
  "data": {
    "customerRegions": ["Asia", "Europe", "North America", "South America"],
    "genders": ["Female", "Male"],
    "productCategories": ["Accessories", "Electronics"],
    "paymentMethods": ["Bank Transfer", "Credit Card", "Debit Card", "PayPal"],
    "tags": ["4k", "affordable", "cable", "charging", "computer", ...],
    "ageRange": {
      "min": 24,
      "max": 52
    },
    "dateRange": {
      "min": "2024-12-01",
      "max": "2024-12-08"
    }
  },
  "message": "Filter options retrieved successfully"
}
```

### 3. **GET /health** - Health Check

Returns server health status.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Usage Examples

### Basic Query (First 10 records, newest first)
```bash
curl "http://localhost:5000/api/sales"
```

### Search by Customer Name
```bash
curl "http://localhost:5000/api/sales?search=john"
```

### Filter by Region and Date Range
```bash
curl "http://localhost:5000/api/sales?customerRegions=North%20America&customerRegions=Europe&dateFrom=2024-12-01&dateTo=2024-12-15"
```

### Complex Query with All Filters
```bash
curl "http://localhost:5000/api/sales?search=smith&customerRegions=North%20America&ageMin=25&ageMax=40&productCategories=Electronics&paymentMethods=Credit%20Card&sortBy=quantity&sortOrder=desc&page=1&limit=20"
```

### Get Distinct Filter Options
```bash
curl "http://localhost:5000/api/sales/filters"
```

## Data Schema

### Sales Record
```typescript
interface SalesRecord {
  // Customer
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;

  // Product
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string[];

  // Sales
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;

  // Operational
  date: string;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}
```

## Edge Cases Handled

✅ **No Results:** Returns empty items array with correct pagination info
✅ **Invalid Ranges:** Validates ageMin/ageMax and dateFrom/dateTo
✅ **Conflicting Filters:** Applies all filters with AND logic between filter types, ANY logic within multi-select
✅ **Missing Optional Fields:** All filters are optional and handled gracefully
✅ **Invalid Dates:** Excludes records with unparseable dates
✅ **Case Sensitivity:** All text searches and comparisons are case-insensitive
✅ **Pagination Bounds:** Ensures page number stays within valid range
✅ **Limit Boundaries:** Enforces minimum (1) and maximum (100) limit values

## Filtering Logic

- **Search & Region & Category, etc.:** AND logic (all must match)
- **Multiple Regions:** OR logic (any region matches)
- **Tags:** OR logic (record matches if it contains ANY selected tag)
- **Age Range:** Both min and max are inclusive
- **Date Range:** Inclusive on both ends (entire end date included)

## Performance Considerations

- All filtering, sorting, and pagination is done in-memory
- For large datasets (>100k records), consider implementing database pagination
- Search is optimized with case-insensitive comparison
- Filter options are computed on-demand

## Future Enhancements

- [ ] MongoDB integration for production data
- [ ] Advanced analytics endpoints (revenue trends, top products, etc.)
- [ ] CSV/Excel export functionality
- [ ] Data validation and sanitization
- [ ] Request logging and monitoring
- [ ] Rate limiting
- [ ] Authentication and authorization
- [ ] Bulk operations support

## License

ISC
