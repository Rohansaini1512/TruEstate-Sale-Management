# 🛒 Retail Sales Management System

A full-stack web application for managing and analyzing retail sales data with advanced filtering, searching, and analytics capabilities.

## 🎯 Project Overview

This is a complete Retail Sales Management System built with modern web technologies. It allows users to search, filter, sort, and analyze sales transactions with a clean, intuitive user interface.

### Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript for type safety
- RESTful API design
- JSON-based data storage
- CORS enabled

**Frontend:**
- React 18 with Hooks
- TypeScript for type safety
- Axios for HTTP requests
- CSS for styling (no heavy frameworks)
- Responsive design

## 📁 Project Structure

```
TruEstate/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── index.ts        # Express app entry point
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   ├── types/          # TypeScript interfaces
│   │   └── scripts/        # Utility scripts
│   ├── data/
│   │   └── sales.json      # Sample data
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── frontend/                # React application
    ├── public/
    │   └── index.html      # HTML entry point
    ├── src/
    │   ├── App.tsx         # Main component
    │   ├── index.tsx       # React entry point
    │   ├── components/     # UI components
    │   ├── hooks/          # Custom hooks
    │   ├── services/       # API client
    │   └── styles/         # CSS files
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Load sample data
npm run load-data

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Application opens at `http://localhost:3000`

## 📊 Features

### Backend API

✅ **Search Functionality**
- Full-text search on customer names
- Phone number search support
- Case-insensitive matching

✅ **Advanced Filtering**
- Multi-select customer regions
- Gender filtering
- Age range filtering
- Product category filtering
- Tag-based filtering (ANY match logic)
- Payment method filtering
- Date range filtering

✅ **Sorting Options**
- Sort by date (newest first)
- Sort by quantity
- Sort by customer name (A-Z)
- Configurable sort order (ASC/DESC)

✅ **Pagination**
- 10 items per page (configurable)
- Page parameter for navigation
- Total count metadata
- Page information in response

✅ **Edge Case Handling**
- No results handling
- Invalid range validation
- Conflicting filter resolution
- Missing field handling

### Frontend UI

✨ **Modern Interface**
- Clean, professional design
- Responsive layout (desktop, tablet, mobile)
- Intuitive filter panel with collapsible sections
- Real-time data loading indicators

🔍 **Search & Filter**
- Instant filter application
- Active filter counter
- Clear all filters option
- Filter state persistence

📋 **Data Display**
- Comprehensive transactions table
- Color-coded status badges
- Formatted currency and dates
- Transaction counting

🎯 **Navigation**
- Smooth pagination
- Quick page selection
- Auto-scroll to results
- Previous/Next buttons

## 🔗 API Endpoints

### Main Endpoints

**Get Sales Records**
```
GET /api/sales
?search=john
&customerRegions=North America
&gender=Male
&ageMin=25&ageMax=45
&productCategories=Electronics
&tags=laptop
&paymentMethods=Credit Card
&dateFrom=2024-12-01&dateTo=2024-12-31
&sortBy=date&sortOrder=desc
&page=1&limit=10
```

**Get Filter Options**
```
GET /api/sales/filters
```

**Health Check**
```
GET /health
```

## 📝 Sample Data

The project includes 8 sample sales records covering:
- Various customers across different regions (North America, Europe, Asia, South America)
- Multiple products in Electronics and Accessories categories
- Different payment methods (Credit Card, PayPal, Bank Transfer, Debit Card)
- Various order statuses (Delivered, Processing, Shipped)
- Range of quantities and prices

Data is stored in `backend/data/sales.json` and can be loaded via:
```bash
npm run load-data
```

## 🎨 UI Design Specifications

### Color Palette
- Primary: #3b82f6 (Blue)
- Success: #10b981 (Green)
- Error: #ef4444 (Red)
- Background: #f8fafc (Light Gray)
- Text: #1e293b (Dark)

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

### Components
- Header with statistics
- Filter sidebar (collapsible)
- Data table with sorting
- Pagination controls
- Loading and error states

## 🔄 Data Flow

```
User Input
    ↓
React State Update
    ↓
API Request (with query params)
    ↓
Express Backend Processing
    ↓
Filter → Sort → Paginate
    ↓
JSON Response with metadata
    ↓
Frontend State Update
    ↓
UI Re-render
```

## 🛠️ Development Workflow

### Making Changes to Filters

1. **Backend**: Update `src/services/queryService.ts`
2. **Frontend**: Update `SalesFilters.tsx` component
3. **Types**: Ensure types match in `src/types/index.ts`

### Adding New Endpoints

1. Create handler in `controllers/`
2. Add route in `routes/`
3. Update frontend API client in `services/salesAPI.ts`

### Styling Changes

- Global styles: `frontend/src/styles/global.css`
- Component styles: Individual CSS files
- Colors: Update CSS variables in `:root`

## 📚 Documentation

- [Backend README](./backend/README.md) - API details and implementation
- [Frontend README](./frontend/README.md) - UI/UX guide and components

## 🧪 Testing the System

### Backend Testing

```bash
cd backend

# Test data loading
npm run load-data

# Test API
curl http://localhost:5000/api/sales

# Test with filters
curl "http://localhost:5000/api/sales?search=john&page=1"
```

### Frontend Testing

1. Open `http://localhost:3000` in browser
2. Verify filters load and are clickable
3. Test search functionality
4. Verify pagination works
5. Check responsive design (use DevTools)

## 🚀 Deployment

### Backend Deployment

1. Build: `npm run build`
2. Copy `dist/` folder to server
3. Set environment variables
4. Run: `node dist/index.js`

### Frontend Deployment

1. Build: `npm run build`
2. Serve `build/` folder as static files
3. Configure environment for production API URL

## 📋 Checklist

- [x] Backend API with filtering, sorting, pagination
- [x] Frontend React app with hooks and state management
- [x] Type-safe implementation with TypeScript
- [x] Responsive UI matching Figma design
- [x] Sample data and data loading script
- [x] Comprehensive documentation
- [x] Error handling and edge cases
- [x] Clean, modular code architecture

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check port 5000 is available
lsof -i :5000

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend can't connect to API
```bash
# Verify backend is running
curl http://localhost:5000/health

# Check .env file has correct API URL
cat frontend/.env
```

### Data not loading
```bash
# Verify data file exists
ls -la backend/data/sales.json

# Reload sample data
npm run load-data
```

## 📞 Support

For issues or questions:
1. Check the relevant README file
2. Review error messages in console
3. Check network tab in DevTools for API responses
4. Verify all dependencies are installed

## 📄 License

ISC

## 👨‍💻 Contributors

Built as a comprehensive retail sales management solution for a coding assignment.

---

**Happy coding! 🎉**
