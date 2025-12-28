# Sakila Analytics Dashboard

A full-stack Single Page Application (SPA) that visualizes business metrics from the Sakila DVD rental store database.

## Tech Stack

- **Frontend**: React + Vite, Recharts for data visualization, Apollo Client for GraphQL
- **Backend**: Node.js + Express, Apollo Server for GraphQL
- **Database**: PostgreSQL (Sakila Sample Database)

## Features

- 📊 **Global Filters**: Filter by store and date range
- 💰 **Key Business Metrics**: Total Revenue and Active Rentals
- 📈 **Top 5 Rented Films**: Interactive bar chart
- 🥧 **Revenue Distribution**: Pie chart by film category
- 👥 **Top 10 Customers**: Sortable data table
- 📝 **Recent Transactions**: Real-time transaction feed

## Prerequisites

1. **Node.js** (v14 or higher)
2. **PostgreSQL** (v12 or higher)
3. **Sakila Database** installed in PostgreSQL

## Database Setup

1. Download the Sakila PostgreSQL database from:

   - Official PostgreSQL Tutorial: https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/
   - Or search for "Sakila PostgreSQL sample database"

2. Create a database and import the schema:

   ```bash
   psql -U postgres
   CREATE DATABASE sakila;
   \q
   psql -U postgres -d sakila -f sakila-schema.sql
   psql -U postgres -d sakila -f sakila-data.sql
   ```

3. Update database credentials in `backend/.env`:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=sakila
   ```

## Installation

### Backend Setup

```bash
cd backend
npm install
node index.js
```

The GraphQL server will start at `http://localhost:4000/graphql`

### Frontend Setup

```bash
cd frontend/sakiladash
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

## Usage

1. Start the backend server first
2. Start the frontend development server
3. Open your browser to `http://localhost:5173`
4. Use the filter bar to:
   - Select a specific store (1 or 2) or view all stores
   - Set date range 

## GraphQL API

The backend provides the following queries:

- `getTopRentedFilms(storeId, startDate, endDate)` - Top 5 most rented films
- `getRevenueByCategory(storeId, startDate, endDate)` - Revenue distribution by category
- `getTopCustomers(storeId, startDate, endDate)` - Top 10 customers by spending
- `getKeyMetrics(storeId, startDate, endDate)` - Total revenue and active rentals
- `getRecentTransactions(storeId, startDate, endDate)` - Latest 20 transactions

All queries support filtering by:

- `storeId`: Integer (1 or 2, or null for all)
- `startDate`: String (YYYY-MM-DD format)
- `endDate`: String (YYYY-MM-DD format)


## Features Implementation

### 1. Top 5 Rented Films (Bar Chart)

- X-Axis: Film titles
- Y-Axis: Rental count
- Interactive tooltips

### 2. Revenue Distribution (Pie Chart)

- Shows percentage of revenue by category
- Interactive hover states
- Color-coded slices

### 3. Top 10 Customers (Data Table)

- Sortable by Total Spent and Total Rentals
- Click column headers to sort
- Shows Customer ID, Name, Rentals, and Spending

### 4. Business KPIs (Scorecards)

- Total Revenue with dollar formatting
- Active Rentals count
- Updates based on filters

### 5. Recent Transactions (Feed)

- Latest 20 transactions
- Displays: "[Name] rented [Title] for $X.XX"
- Includes timestamp
- Scrollable list


This project is for Careflux Fullstack Intern Assignment.
