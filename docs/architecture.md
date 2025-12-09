# 🏗️ TruEstate Sales Management System - Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Data Flow](#data-flow)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Component Structure](#component-structure)
9. [State Management](#state-management)
10. [Security & Best Practices](#security--best-practices)

---

## System Overview

**TruEstate Sales Management System** is a full-stack web application designed to manage and analyze retail sales data with advanced filtering, searching, and analytics capabilities.

### Core Technologies
- **Backend**: Node.js, Express.js, TypeScript, MongoDB/JSON
- **Frontend**: React 18, TypeScript, Tailwind CSS, Axios
- **Architecture Pattern**: Client-Server (REST API)
- **Data Storage**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS + Custom CSS

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + TypeScript)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Sidebar    │  │   Filters    │  │   Stats      │          │
│  │  Navigation  │  │   Panel      │  │   Header     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Sales Data Table                          │   │
│  │  - Sortable Headers (Customer Name, Date, Amount)      │   │
│  │  - Pagination Controls                                 │   │
│  │  - Responsive Design                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    REST API (HTTP)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              API Routes (salesRoutes.ts)               │   │
│  │  - GET  /api/sales           (Fetch records)          │   │
│  │  - GET  /api/sales/filters   (Fetch filter options)   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │         Controllers (salesController.ts)              │   │
│  │  - Handles request validation                          │   │
│  │  - Calls service layer                                │   │
│  │  - Returns formatted responses                         │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │       Services Layer (salesService.ts)                │   │
│  │  - queryService: Filter, Sort, Search Logic           │   │
│  │  - Data transformation & aggregation                  │   │
│  │  - Business logic implementation                      │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │        Data Access Layer (dataStore.ts)               │   │
│  │  - MongoDB/JSON file operations                        │   │
│  │  - CRUD operations                                    │   │
│  │  - Data persistence                                  │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
    ┌─────────▼──────────┐  ┌──────▼─────────────┐
    │    MongoDB Atlas   │  │  JSON Data Files  │
    │    (Production)    │  │  (Development)    │
    └────────────────────┘  └───────────────────┘
```

---

## Backend Architecture

### Directory Structure
```
backend/
├── src/
│   ├── index.ts                    # Express app initialization
│   ├── config/
│   │   └── database.ts             # MongoDB/Database configuration
│   ├── controllers/
│   │   └── salesController.ts      # Request handlers
│   ├── routes/
│   │   └── salesRoutes.ts          # API route definitions
│   ├── services/
│   │   ├── salesService.ts         # Core business logic
│   │   └── queryService.ts         # Query building & filtering
│   ├── utils/
│   │   └── dataStore.ts            # Data persistence layer
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── scripts/
│       ├── loadData.ts             # Initial data loading
│       ├── migrateCSVToMongoDB.ts  # CSV to MongoDB migration
│       └── testInsert.ts           # Testing utilities
├── data/
│   └── sales.json                  # Sample data file
├── .env                            # Environment variables
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

### Key Components

#### 1. **Express Server (index.ts)**
```typescript
- Initializes Express app
- Configures CORS
- Mounts routes
- Error handling middleware
- Listens on port 5000
```

#### 2. **Database Configuration (config/database.ts)**
```typescript
- MongoDB connection setup
- Mongoose models (if using MongoDB)
- Connection pooling
- Error handling
```

#### 3. **Sales Service (services/salesService.ts)**
```typescript
- Fetch all sales records with filters
- Apply sorting (date, quantity, customerName)
- Handle pagination
- Perform full-text search
- Calculate aggregations (stats)
```

#### 4. **Query Service (services/queryService.ts)**
```typescript
- Build filter queries
- Apply search criteria
- Sort data
- Handle date ranges
- Validate filter parameters
```

#### 5. **Data Store (utils/dataStore.ts)**
```typescript
- Read/Write operations
- File-based or database operations
- Data validation
- Error handling
```

---

## Frontend Architecture

### Directory Structure
```
frontend/src/
├── App.tsx                         # Main app component
├── index.tsx                       # React entry point
├── components/
│   ├── Sidebar.tsx                 # Left navigation sidebar
│   ├── SalesFilters.tsx            # Filter panel (horizontal navbar)
│   ├── SalesTable.tsx              # Data table with sorting
│   └── StatsHeader.tsx             # Summary statistics cards
├── hooks/
│   └── useSalesData.ts             # Custom hook for API calls
├── services/
│   └── salesAPI.ts                 # Axios API client
├── styles/
│   ├── tailwind.css                # Tailwind CSS
│   └── global.css                  # Global styles
└── types/
    └── (TypeScript type definitions)
```

### Key Components

#### 1. **Sidebar Component (Sidebar.tsx)**
- **Purpose**: Left-side navigation menu
- **Features**:
  - Vault branding header
  - Main menu items (Dashboard, Nexus, Intake)
  - Collapsible Services dropdown
  - Collapsible Invoices dropdown
  - Clickable menu items with selection state

#### 2. **SalesFilters Component (SalesFilters.tsx)**
- **Purpose**: Horizontal filter navbar above data table
- **Features**:
  - Search input (customer, product, phone, ID)
  - Multi-select filters (Region, Gender, Category, Payment)
  - Date range picker
  - Age range selector
  - Apply & Reset buttons
  - Responsive grid layout

#### 3. **SalesTable Component (SalesTable.tsx)**
- **Purpose**: Display sales data in tabular format
- **Features**:
  - 13+ columns with data
  - Sortable headers (Customer Name, Date, Quantity, Amount)
  - Pagination controls
  - Loading states
  - Error handling
  - Empty state display
  - Responsive scrolling

#### 4. **StatsHeader Component (StatsHeader.tsx)**
- **Purpose**: Display summary statistics
- **Features**:
  - Total Units Sold card
  - Total Amount (Revenue) card
  - Total Discount card
  - Real-time calculations from API data

#### 5. **useSalesData Hook (hooks/useSalesData.ts)**
- **Purpose**: Custom React hook for data fetching
- **Features**:
  - Manages loading/error states
  - Fetches paginated data
  - Supports filtering and sorting
  - Re-fetches on parameter changes
  - Type-safe with TypeScript

#### 6. **Sales API Service (services/salesAPI.ts)**
- **Purpose**: Centralized API client
- **Features**:
  - Defensive data mapping
  - Handles backend variations
  - Type coercion and validation
  - Error handling
  - Query parameter encoding

---

## Data Flow

### Request Flow (User Action → Backend → Frontend Update)

```
User Interaction
    ↓
React Component (e.g., SalesFilters)
    ↓
State Update (filters, sort, page)
    ↓
useSalesData Hook triggered
    ↓
salesAPI.fetchSalesRecords() called
    ↓
Axios POST/GET to /api/sales
    ↓
Express Router (salesRoutes.ts)
    ↓
Controller (salesController.ts)
    ↓
Service Layer (salesService.ts)
    ↓
Query Building (queryService.ts)
    ↓
Data Access (dataStore.ts)
    ↓
MongoDB / JSON File Read
    ↓
Results Returned & Aggregated
    ↓
Response Formatted (200 OK)
    ↓
Axios receives response
    ↓
Data transformed with defensive mapping
    ↓
Component state updated
    ↓
UI Re-renders with new data
```

### Example: Filter Application Flow

```
User clicks "Apply" in SalesFilters
    ↓
onFiltersChange() handler called with filter state
    ↓
currentParams updated in App.tsx
    ↓
fetchData(newParams) triggered
    ↓
API endpoint: GET /api/sales?region=North&gender=Male&page=1&limit=10
    ↓
Backend queries data with filters
    ↓
Paginated response returned
    ↓
Frontend updates SalesTable with new data
    ↓
User sees filtered results
```

---

## Database Schema

### Sales Record Structure

```typescript
interface Sale {
  transactionId?: string;
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
  
  date: string;              // ISO 8601 format
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}
```

### Filter Options Structure

```typescript
interface FilterOptions {
  customerRegions: string[];
  genders: string[];
  productCategories: string[];
  paymentMethods: string[];
  tags: string[];
  ageRange: { min: number; max: number };
  dateRange: { min: string; max: string };
}
```

### Paginated Response Structure

```typescript
interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Fetch Sales Records

**Endpoint**: `GET /sales`

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Full-text search query |
| `customerRegions` | string[] | Filter by region(s) |
| `gender` | string | Filter by gender |
| `ageMin` | number | Minimum age filter |
| `ageMax` | number | Maximum age filter |
| `productCategories` | string[] | Filter by category(ies) |
| `tags` | string[] | Filter by tag(s) |
| `paymentMethods` | string[] | Filter by payment method(s) |
| `dateFrom` | string | Start date (ISO 8601) |
| `dateTo` | string | End date (ISO 8601) |
| `sortBy` | string | Sort field: `date`, `quantity`, `customerName` |
| `sortOrder` | string | Sort order: `asc` or `desc` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

**Example Request**:
```http
GET /sales?customerRegions=North&sortBy=customerName&sortOrder=asc&page=1&limit=10
```

**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "transactionId": "TXN001",
        "customerId": "C001",
        "customerName": "Alice Johnson",
        ...
      }
    ],
    "totalItems": 150,
    "totalPages": 15,
    "currentPage": 1,
    "limit": 10
  }
}
```

### 2. Fetch Filter Options

**Endpoint**: `GET /sales/filters`

**Response**:
```json
{
  "success": true,
  "data": {
    "customerRegions": ["North", "South", "East", "West", "Central"],
    "genders": ["Male", "Female", "Other"],
    "productCategories": ["Clothing", "Electronics", "Grocery", "Home", "Other"],
    "paymentMethods": ["Credit Card", "Debit Card", "Cash", "PayPal"],
    "tags": ["Sale", "New", "Featured"],
    "ageRange": { "min": 18, "max": 75 },
    "dateRange": { "min": "2024-01-01", "max": "2024-12-31" }
  }
}
```

---

## Component Structure

### Component Hierarchy

```
App.tsx
├── Sidebar.tsx
│   ├── Dashboard Button
│   ├── Nexus Button
│   ├── Intake Button
│   ├── Services Dropdown
│   │   ├── Pre-active (clickable)
│   │   ├── Active (clickable)
│   │   ├── Blocked (clickable)
│   │   └── Closed (clickable)
│   └── Invoices Dropdown
│       ├── Proforma Invoices (clickable)
│       └── Final Invoices (clickable)
│
├── Header (with branding)
│
├── SalesFilters.tsx
│   ├── Search Input
│   ├── Region Dropdown
│   ├── Gender Dropdown
│   ├── Age Range Dropdown
│   ├── Category Dropdown
│   ├── Payment Method Dropdown
│   ├── Date From Input
│   ├── Date To Input
│   ├── Apply Button
│   └── Reset Button
│
├── StatsHeader.tsx
│   ├── Total Units Sold Card
│   ├── Total Amount Card
│   └── Total Discount Card
│
└── SalesTable.tsx
    ├── Table Header
    │   ├── Transaction ID
    │   ├── Date (sortable)
    │   ├── Customer ID
    │   ├── Customer Name (sortable)
    │   ├── Phone Number
    │   ├── Gender
    │   ├── Age
    │   ├── Product Category
    │   ├── Quantity (sortable)
    │   ├── Total Amount (sortable)
    │   ├── Customer Region
    │   ├── Product ID
    │   ├── Employee Name
    │   └── Order Status
    ├── Table Body (with rows)
    └── Pagination
        ├── Previous Button
        ├── Page Buttons
        └── Next Button
```

### Props Flow

```
App.tsx
├── → Sidebar (static)
├── → SalesFilters
│   └── Props: onFiltersChange, filterOptions
├── → StatsHeader
│   └── Props: data (PaginatedResponse)
└── → SalesTable
    ├── Props: data, loading, error, onPageChange
    ├── Props: onSortChange, onCustomerNameSort
    ├── Props: currentSort
    └── Events: handlePageChange, handleSortChange, handleCustomerNameSort
```

---

## State Management

### Global State (App.tsx)

```typescript
const [currentParams, setCurrentParams] = useState<SalesQueryParams>({
  page: 1,
  limit: 10,
  sortBy: 'date',
  sortOrder: 'desc',
});
```

### Local Component States

**Sidebar.tsx**:
```typescript
const [expandedServices, setExpandedServices] = useState(false);
const [expandedInvoices, setExpandedInvoices] = useState(false);
const [selectedService, setSelectedService] = useState<string | null>(null);
const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
```

**SalesFilters.tsx**:
```typescript
const [searchQuery, setSearchQuery] = useState<string>('');
const [region, setRegion] = useState<string>('');
const [gender, setGender] = useState<string>('');
const [ageRange, setAgeRange] = useState<string>('');
const [productCategory, setProductCategory] = useState<string>('');
const [paymentMethod, setPaymentMethod] = useState<string>('');
const [dateFrom, setDateFrom] = useState<string>('');
const [dateTo, setDateTo] = useState<string>('');
const [isExpanded, setIsExpanded] = useState(true);
```

### Hook State (useSalesData)

```typescript
const [data, setData] = useState<PaginatedResponse<Sale> | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## Security & Best Practices

### Backend Security

1. **Input Validation**
   - Query parameters validated before processing
   - Type checking with TypeScript
   - Range validation for numeric inputs

2. **Error Handling**
   - Try-catch blocks in all async operations
   - Consistent error response format
   - No sensitive data in error messages

3. **CORS**
   - CORS enabled for frontend origin
   - Restricts API access to authorized domains

4. **Rate Limiting** (Recommended)
   - Implement rate limiting middleware
   - Prevent API abuse

### Frontend Security

1. **Type Safety**
   - TypeScript for compile-time type checking
   - Defensive data mapping
   - Input sanitization

2. **Error Handling**
   - Try-catch in API calls
   - User-friendly error messages
   - Graceful degradation

3. **Data Validation**
   - Query parameters validated
   - Filter values type-checked
   - Date range validation

### Best Practices

1. **Code Organization**
   - Separation of concerns (services, controllers, components)
   - Reusable hooks and utilities
   - Clear file naming conventions

2. **Performance**
   - Pagination prevents large data transfers
   - Memoization for expensive computations
   - Lazy loading where applicable

3. **Maintainability**
   - TypeScript interfaces for contracts
   - Clear documentation
   - Consistent naming conventions
   - Component modularity

4. **Testing** (Future Enhancement)
   - Unit tests for services
   - Integration tests for API endpoints
   - E2E tests for user flows

---

## Future Enhancements

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control
   - User management dashboard

2. **Advanced Analytics**
   - Charts and graphs
   - Sales trends
   - Customer behavior analysis

3. **Reporting**
   - PDF export functionality
   - Scheduled reports
   - Custom report builder

4. **Caching**
   - Redis integration
   - Client-side caching
   - API response caching

5. **Real-time Updates**
   - WebSocket integration
   - Live data notifications
   - Collaborative filtering

6. **Mobile App**
   - React Native version
   - Offline support
   - Push notifications

---

## Deployment

### Environment Variables

```env
# Backend
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key

# Frontend
REACT_APP_API_URL=https://api.example.com
```

### Docker Support

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### CI/CD Pipeline

- GitHub Actions for automated testing
- Automated deployment on main branch push
- Build verification before merge

---

**Last Updated**: December 9, 2025
**Version**: 1.0.0
