# Retail Sales Management System - Frontend

A modern React application for viewing and analyzing retail sales data with advanced filtering, searching, and pagination capabilities.

## Features

✨ **Modern UI Design**
- Clean, intuitive interface inspired by Figma design standards
- Responsive layout that works on desktop, tablet, and mobile
- Real-time filter application and instant results
- Smooth animations and transitions

🔍 **Advanced Search & Filtering**
- Full-text search by customer name or phone number
- Multi-select filters for regions, categories, payment methods
- Tag-based filtering (matches any tag)
- Age range and date range selectors
- Expandable/collapsible filter sections
- Active filter counter badge

📊 **Data Display**
- Comprehensive sales transactions table
- Color-coded badges for gender, status, and category
- Formatted currency values and dates
- Transaction ID and record counting
- Hover effects for better interactivity

🎯 **Smart Pagination**
- Page size of 10 records per page
- Visual page numbers with quick navigation
- Previous/Next buttons with disabled states
- Page info display (showing X-Y of Z records)
- Auto-scroll to top on page change

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # React entry point
│   ├── components/
│   │   ├── SalesFilters.tsx    # Filter panel component
│   │   └── SalesTable.tsx      # Data table component
│   ├── hooks/
│   │   └── useSalesData.ts     # Custom React hooks for data fetching
│   ├── services/
│   │   └── salesAPI.ts         # API client and TypeScript types
│   └── styles/
│       ├── global.css          # Global styles and utilities
│       ├── app.css             # App layout styles
│       ├── filters.css         # Filter panel styles
│       └── table.css           # Data table styles
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Configure API URL** (Optional)
   
   By default, the app connects to `http://localhost:5000/api`
   
   To use a different API URL, create a `.env` file:
   ```bash
   echo "REACT_APP_API_URL=http://your-api-url:port/api" > .env
   ```

3. **Start the development server:**
```bash
npm start
```

   The app will open at `http://localhost:3000`

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm run test

# Eject configuration (⚠️ irreversible)
npm run eject
```

## Usage

### Searching for Sales Records

1. **Text Search**: Enter a customer name or phone number in the search box at the top
2. **Apply**: Click "Apply Filters" to search
3. **Clear**: Click "Clear All" to reset all filters

### Filtering Data

1. **Expand Filter Sections**: Click on section headers to expand/collapse filters
2. **Select Filters**:
   - **Customer Region**: Check multiple regions (multi-select)
   - **Gender**: Select from dropdown
   - **Age Range**: Enter min and max ages
   - **Product Category**: Check multiple categories
   - **Tags**: Click tags to toggle selection (any match)
   - **Payment Method**: Check payment methods
   - **Date Range**: Select start and end dates

3. **Apply Filters**: Click the blue "Apply Filters" button
4. **Clear Filters**: Click "Clear All" to reset everything

### Sorting Results

1. **Sort By**: Select sorting field (Date, Quantity, Customer Name)
2. **Sort Order**: Choose Ascending (↑) or Descending (↓)
3. Sorting applies automatically when "Apply Filters" is clicked

### Pagination

- **Page Navigation**: Use Previous/Next buttons or click page numbers
- **Page Info**: View current page and total number of pages
- **Record Info**: See count of displayed records (e.g., "Showing 1-10 of 42 records")
- **Auto-Scroll**: Page automatically scrolls to top when changing pages

## Component Architecture

### App Component
- Main application shell
- State management for query parameters
- Header and footer layout
- Sidebar + main content layout

### SalesFilters Component
- Filter panel with collapsible sections
- Local state for all filter values
- Multi-select handlers for checkbox groups
- Active filter counter
- Apply and Clear actions

### SalesTable Component
- Display sales records in a responsive table
- Loading, error, and empty states
- Pagination controls
- Row hover effects
- Formatted data display

### useSalesData Hook
- Fetches sales records from API
- Manages loading and error states
- Provides fetchData function for manual refetch
- Initial data load on mount

### useFilterOptions Hook
- Fetches available filter options from API
- Returns distinct values for all filterable fields
- Used to populate filter dropdowns and checkboxes

## Styling System

### CSS Architecture
- **global.css**: Base styles, typography, utilities
- **app.css**: Layout and structure (header, footer, grid)
- **filters.css**: Filter panel component styles
- **table.css**: Data table component styles

### Color Palette
```css
--primary-color: #3b82f6 (Blue)
--primary-dark: #1e40af
--primary-light: #dbeafe
--success-color: #10b981 (Green)
--error-color: #ef4444 (Red)
--border-color: #e2e8f0
--bg-light: #f8fafc
--text-primary: #1e293b
--text-secondary: #64748b
```

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## API Integration

### API Endpoints Used

**1. Get Sales Records**
```
GET /api/sales?page=1&limit=10&sortBy=date&sortOrder=desc&search=john
```

**2. Get Filter Options**
```
GET /api/sales/filters
```

### Query Parameters

| Parameter | Type | Example |
|-----------|------|---------|
| search | string | "john" |
| customerRegions | string[] | "North America", "Europe" |
| gender | string | "Male" |
| ageMin | number | "25" |
| ageMax | number | "45" |
| productCategories | string[] | "Electronics" |
| tags | string[] | "laptop", "wireless" |
| paymentMethods | string[] | "Credit Card" |
| dateFrom | string | "2024-12-01" |
| dateTo | string | "2024-12-31" |
| sortBy | string | "date", "quantity", "customerName" |
| sortOrder | string | "asc", "desc" |
| page | number | "1" |
| limit | number | "10" |

## State Management

### Query State
```typescript
{
  search?: string
  customerRegions?: string[]
  gender?: string
  ageMin?: number
  ageMax?: number
  productCategories?: string[]
  tags?: string[]
  paymentMethods?: string[]
  dateFrom?: string
  dateTo?: string
  sortBy?: 'date' | 'quantity' | 'customerName'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
```

### Data State
```typescript
{
  items: SalesRecord[]
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}
```

## Error Handling

- **API Errors**: Displays user-friendly error message with reason
- **Empty Results**: Shows friendly "No records found" message
- **Loading States**: Spinner animation during data fetch
- **Invalid Filters**: API validates and handles invalid filter combinations

## Performance Optimizations

- **Memoization**: useCallback for event handlers
- **Code Splitting**: Components loaded on demand
- **Lazy Loading**: Filter options fetched on component mount
- **Debouncing**: Could be added for search input
- **Caching**: Could be implemented for frequently used queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### API Connection Issues
```bash
# Check if backend is running on port 5000
curl http://localhost:5000/health

# Update API URL in .env if needed
REACT_APP_API_URL=http://your-server:5000/api
```

### No Data Displayed
- Ensure backend server is running: `npm run dev` in backend folder
- Check browser console for API errors
- Verify data is loaded: `curl http://localhost:5000/api/sales`

### Styling Issues
- Clear browser cache: Ctrl+Shift+Delete
- Restart dev server: Kill process and run `npm start` again

## Future Enhancements

- [ ] Advanced charts and analytics views
- [ ] CSV/Excel export functionality
- [ ] Column visibility toggle
- [ ] Custom column sorting (click headers)
- [ ] Row selection and bulk actions
- [ ] Save filter presets/favorites
- [ ] Real-time data updates (WebSockets)
- [ ] Dark mode support
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Performance monitoring and logging

## Development Tips

### Adding New Filters
1. Add to `SalesFilters` component state
2. Update API parameter building in `handleMultiSelectToggle`
3. Ensure backend supports the filter

### Customizing Table Columns
1. Edit `SalesTable` component `<th>` and `<td>` elements
2. Update column CSS classes in `table.css`
3. Adjust responsive breakpoints as needed

### Modifying Styles
- Global changes: Edit `global.css`
- Component-specific: Edit respective CSS files
- Use CSS variables for consistent theming

## License

ISC

## Support

For issues or questions, contact the development team or check the backend documentation for API-related questions.
