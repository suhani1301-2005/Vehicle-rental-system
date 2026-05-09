# Rental Business Analytics System

A modern React-based frontend for managing and analyzing rental business operations.

## Features

✅ **Home Page** - Welcome screen with navigation to all main features
✅ **Add Customer** - Register new customers with name, phone, and address
✅ **Add Rental** - Record rental transactions with customer, item, and date ranges
✅ **View Data** - Browse all customers and rentals in tabular format with summary statistics
✅ **Analytics Dashboard** - Interactive charts showing:
   - Revenue by item (Bar Chart)
   - Rental trends over time (Line Chart)
   - Customer rental distribution (Pie Chart)
   - Revenue distribution by item (Pie Chart)
   - Key metrics (Total Revenue, Total Rentals, Average Cost, Daily Rate)

## Tech Stack

- **React 18** - Modern UI library
- **Material-UI (MUI)** - Professional component library
- **React Router 6** - Client-side routing
- **Recharts** - Data visualization charts
- **JavaScript (ES6+)** - Core language

## Project Structure

```
rental-analytics-system/
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Navigation header
│   │   ├── HomePage.js      # Landing page
│   │   ├── AddCustomerPage.js
│   │   ├── AddRentalPage.js
│   │   ├── ViewDataPage.js
│   │   └── AnalyticsPage.js # Main analytics dashboard
│   ├── App.js               # Main app component with routing
│   ├── index.js             # Entry point
│   ├── index.css            # Global styles
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Navigate to project directory:**
   ```bash
   cd "d:\DBMS SEM 2\Project"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate to that URL manually

## Usage Guide

### 1. **Home Page**
   - Landing page with overview of all features
   - Quick navigation buttons to main sections

### 2. **Add Customer**
   - Fill in customer details:
     - Name (required)
     - Phone number (required)
     - Address (required)
   - Click "Submit" to add customer
   - Automatically redirects to View Data page

### 3. **Add Rental**
   - Select a customer from dropdown
   - Enter item name (e.g., "Drill", "Pressure Washer")
   - Select start and end dates
   - Cost is automatically calculated ($50 per day)
   - Click "Submit" to add rental

### 4. **View Data**
   - **Customers Tab**: View all customers in table format
   - **Rentals Tab**: View all rentals with dates and costs
   - **Summary Tab**: Quick statistics
     - Total customers
     - Total rentals
     - Total revenue
     - Average rental cost

### 5. **Analytics Dashboard**
   - **Summary Cards**: Key metrics at a glance
   - **Revenue by Item**: Bar chart showing earnings per item
   - **Rental Trends**: Line chart showing rentals and revenue over time
   - **Rentals by Customer**: Pie chart showing distribution
   - **Revenue Distribution**: Pie chart by item type

## Current Features

### Mock Data
The app comes with sample data:
- 2 pre-loaded customers
- 3 pre-loaded rentals

All data is stored in React state (client-side), so it resets when page refreshes.

### Future Enhancements
- Connect to backend API for persistent data storage
- User authentication
- Export reports to PDF/Excel
- Monthly billing generation
- Customer ratings and reviews
- Inventory management

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (one-way operation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All data is stored in React component state and will be lost on page refresh
- For production, implement a backend API and persistent database
- The rental cost is calculated automatically at $50 per day
- Responsive design - works on desktop, tablet, and mobile devices

## Getting Help

If you encounter issues:
1. Ensure Node.js and npm are properly installed
2. Clear `node_modules` and reinstall: `rm -r node_modules && npm install`
3. Clear browser cache
4. Check console for error messages (F12 in browser)

Happy analyzing! 📊
