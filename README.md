# 🛒 TruEstate - Retail Sales Management System

> A full-stack web application for managing and analyzing retail sales data with advanced filtering, searching, sorting, and real-time analytics.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)
![React Version](https://img.shields.io/badge/react-18-blue.svg)

Live Demo: http://13.60.213.199/  


---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Component Architecture](#-component-architecture)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

**TruEstate Sales Management System** is a modern, full-stack web application designed to help businesses efficiently manage and analyze their retail sales data. Built with Node.js, React, and TypeScript, it provides powerful search, filtering, sorting, and analytics capabilities through an intuitive and responsive user interface.

### Key Highlights
- 📊 **Real-time Analytics**: Live statistics cards (Total Units, Revenue, Discounts)
- 🔍 **Advanced Search**: Full-text search across customer names, phones, product IDs
- 🎛️ **Smart Filtering**: Multi-parameter filtering with intelligent query building
- 📈 **Sorting**: Sortable columns (Customer Name, Date, Quantity, Amount)
- 📄 **Pagination**: Efficient data loading with configurable page sizes
- 🎨 **Responsive UI**: Desktop, tablet, and mobile-friendly design
- 🔐 **Type-Safe**: Built entirely with TypeScript for reliability

---

## ✨ Features - Detailed

### Backend Features
- ✅ Full-text search on customer names, phone numbers, product IDs
- ✅ Multi-region filtering with OR logic
- ✅ Age range filtering with preset bands (18-25, 26-35, 36-50, 50+)
- ✅ Product category filtering
- ✅ Payment method filtering
- ✅ Date range filtering
- ✅ Sortable by: date, quantity, customerName, totalAmount
- ✅ Pagination with configurable items per page
- ✅ Real-time stat aggregation (total units, revenue, discount)

### Frontend Features
- ✅ Left sidebar navigation with collapsible menus (Services, Invoices)
- ✅ Horizontal filter navbar with all search options
- ✅ Summary stats cards showing key metrics
- ✅ Sortable data table with 13+ columns
- ✅ Clickable menu items with selection state
- ✅ Smooth pagination and auto-scroll
- ✅ Loading states and error handling
- ✅ Responsive design (desktop, tablet, mobile)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** v14+ - Runtime environment
- **Express.js** 4.x - Web framework
- **TypeScript** 4.x - Type safety
- **In-Memory Data Store** - JSON file-based storage
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** 18.x - UI library with Hooks
- **TypeScript** 4.x - Type safety
- **Tailwind CSS** 3.x - Utility-first CSS
- **Axios** 1.x - HTTP client
- **React Icons** 4.x - Icon library

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **Create React App** - Frontend scaffold

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- Git latest version

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Rohansaini1512/TruEstate-Sale-Management.git
cd TruEstate
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Load sample data (optional)
npm run load-data

# Start development server
npm run dev
```

**Backend runs on**: `http://localhost:5000`

#### 3. Frontend Setup (in new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend runs on**: `http://localhost:3000`

#### 4. Verify Installation

Visit `http://localhost:3000` - you should see the complete sales dashboard with:
- Left sidebar navigation
- Filter panel above the table
- Statistics cards
- Sales data table with pagination

---

## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get Sales Records
```
GET /sales?search=john&page=1&limit=10&sortBy=customerName&sortOrder=asc
```

**Query Parameters**:
| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `search` | string | "john" | Search query |
| `customerRegions` | string[] | "North" | Filter by region |
| `gender` | string | "Male" | Filter by gender |
| `ageMin` | number | 25 | Minimum age |
| `ageMax` | number | 45 | Maximum age |
| `productCategories` | string[] | "Electronics" | Filter by category |
| `paymentMethods` | string[] | "Credit Card" | Filter by payment |
| `dateFrom` | string | "2024-12-01" | Start date |
| `dateTo` | string | "2024-12-31" | End date |
| `sortBy` | string | "date" | Sort field |
| `sortOrder` | string | "asc" | Sort order |
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "items": [...],
    "totalItems": 150,
    "totalPages": 15,
    "currentPage": 1,
    "limit": 10
  }
}
```

#### 2. Get Filter Options
```
GET /sales/filters
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "customerRegions": ["North", "South", "East", "West", "Central"],
    "genders": ["Male", "Female", "Other"],
    "productCategories": ["Clothing", "Electronics", "Grocery"],
    "paymentMethods": ["Credit Card", "Debit Card", "Cash", "PayPal"],
    "ageRange": { "min": 18, "max": 75 },
    "dateRange": { "min": "2024-01-01", "max": "2024-12-31" }
  }
}
```

---

## 🎨 Component Architecture

### Component Hierarchy

```
App (Main Container)
├── Sidebar (Left Navigation)
│   ├── Dashboard Button
│   ├── Nexus Button
│   ├── Intake Button
│   ├── Services (Dropdown)
│   │   ├── Pre-active
│   │   ├── Active
│   │   ├── Blocked
│   │   └── Closed
│   └── Invoices (Dropdown)
│       ├── Proforma Invoices
│       └── Final Invoices
├── Header (with Total Records)
├── SalesFilters (Navbar)
│   ├── Search Input
│   ├── Region Dropdown
│   ├── Gender Dropdown
│   ├── Age Range Dropdown
│   ├── Category Dropdown
│   ├── Payment Method Dropdown
│   ├── Date Range Inputs
│   ├── Apply Button
│   └── Reset Button
├── StatsHeader (Statistics Cards)
│   ├── Total Units Card
│   ├── Total Amount Card
│   └── Total Discount Card
└── SalesTable (Data Display)
    ├── Sortable Headers
    ├── Table Rows
    └── Pagination Controls
```

### Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| App | `src/App.tsx` | Main container & state management |
| Sidebar | `src/components/Sidebar.tsx` | Navigation menu with dropdowns |
| SalesFilters | `src/components/SalesFilters.tsx` | Filter controls |
| SalesTable | `src/components/SalesTable.tsx` | Data display & pagination |
| StatsHeader | `src/components/StatsHeader.tsx` | Summary statistics |
| useSalesData | `src/hooks/useSalesData.ts` | Data fetching hook |
| salesAPI | `src/services/salesAPI.ts` | API client |

---

## 🗄️ Database Schema

### Sale Record Structure
```typescript
interface Sale {
  transactionId?: string;     // Transaction ID
  customerId: string;         // Customer ID
  customerName: string;       // Full name
  phoneNumber: string;        // Contact number
  gender: string;             // Male, Female, Other
  age: number;                // Customer age
  customerRegion: string;     // Geographic region
  customerType: string;       // Premium, Regular, etc.
  
  productId: string;          // Product ID
  productName: string;        // Product name
  brand: string;              // Brand name
  productCategory: string;    // Category
  tags: string[];             // Tags array
  
  quantity: number;           // Quantity purchased
  pricePerUnit: number;       // Unit price
  discountPercentage: number; // Discount %
  totalAmount: number;        // Total before discount
  finalAmount: number;        // Total after discount
  
  date: string;               // ISO 8601 timestamp
  paymentMethod: string;      // Payment type
  orderStatus: string;        // Order status
  deliveryType: string;       // Delivery method
  
  storeId: string;            // Store ID
  storeLocation: string;      // Store location
  salespersonId: string;      // Salesperson ID
  employeeName: string;       // Employee name
}
```

---

## 🚀 Deployment

### Backend Deployment

**Build**:
```bash
npm run build
```

**Environment (.env)**:
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

**Run**:
```bash
npm start
```

### Frontend Deployment

**Build**:
```bash
npm run build
```

**Deploy to**:
- Vercel: `vercel deploy`
- Netlify: Drag & drop `build/` folder
- GitHub Pages: `npm run deploy`
- Traditional server: Copy `build/` to web root

---

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use**:
```bash
lsof -i :5000
kill -9 <PID>
```

**Cannot find module**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database connection error**:
```bash
# Verify MongoDB URI in .env
cat .env
```

### Frontend Issues

**Blank page**:
1. Check browser console (F12) for errors
2. Verify backend is running: `curl http://localhost:5000/health`
3. Check network tab for failed requests

**API not loading**:
```bash
# Verify API URL
echo $REACT_APP_API_URL
# Restart frontend
npm start
```

**Build errors**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Additional Resources

- [Architecture Documentation](./docs/architecture.md) - Detailed system design
- [Backend README](./backend/README.md) - API implementation
- [Frontend README](./frontend/README.md) - UI/UX guide
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📝 Project Structure

```
TruEstate/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── index.ts           # Server entry
│   │   ├── config/            # Configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   ├── types/             # TypeScript types
│   │   └── scripts/           # Utility scripts
│   ├── data/sales.json        # Sample data
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API client
│   │   ├── styles/            # CSS files
│   │   ├── App.tsx            # Main component
│   │   └── index.tsx          # Entry point
│   └── package.json
│
├── docs/
│   └── architecture.md        # Architecture docs
│
└── README.md                  # This file
```

---

## ✅ Completed Features

- [x] Backend API with filtering, sorting, pagination
- [x] Frontend React app with hooks and state management
- [x] Type-safe implementation with TypeScript
- [x] Responsive UI with Tailwind CSS
- [x] Sample data and data loading script
- [x] Left sidebar navigation with dropdowns
- [x] Filter navbar with search and filters
- [x] Statistics cards with real-time data
- [x] Sortable data table
- [x] Clickable menu items
- [x] Comprehensive documentation

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Rohan Saini**
- GitHub: [@Rohansaini1512](https://github.com/Rohansaini1512)
- Repository: [TruEstate-Sale-Management](https://github.com/Rohansaini1512/TruEstate-Sale-Management)

---

## 📞 Support

For support, open an issue in the [GitHub repository](https://github.com/Rohansaini1512/TruEstate-Sale-Management/issues).

---

**Last Updated**: December 9, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

```
