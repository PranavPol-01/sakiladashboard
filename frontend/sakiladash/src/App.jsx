import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import FilterBar from "./components/FilterBar";
import TopRentedFilms from "./components/TopRentedFilms";
import RevenueDistribution from "./components/RevenueDistribution";
import TopCustomers from "./components/TopCustomers";
import KeyMetrics from "./components/KeyMetrics";
import RecentTransactions from "./components/RecentTransactions";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($storeId: Int, $startDate: String, $endDate: String) {
    topRentedFilms: getTopRentedFilms(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      filmId
      title
      rentalCount
    }
    revenueByCategory: getRevenueByCategory(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      categoryName
      revenue
      percentage
    }
    topCustomers: getTopCustomers(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      customerId
      fullName
      totalRentals
      totalSpent
    }
    keyMetrics: getKeyMetrics(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      totalRevenue
      activeRentals
    }
    recentTransactions: getRecentTransactions(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      paymentId
      customerName
      filmTitle
      amount
      paymentDate
    }
  }
`;

function Dashboard() {
  const [filters, setFilters] = useState({
    storeId: null,
    startDate: "2005-01-01",
    endDate: "2006-12-31",
  });

  const { loading, error, data, refetch } = useQuery(GET_DASHBOARD_DATA, {
    variables: filters,
  });

  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title">
        <h1 className="logo">S</h1>
        <h1> Sakila Analytics Dashboard</h1>
        </div>
        <p className="subtitle">DVD Rental Store Business Intelligence</p>
      </header>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="dashboard-container">
        <KeyMetrics data={data.keyMetrics} />

        <div className="charts-row">
          <TopRentedFilms data={data.topRentedFilms} />
          <RevenueDistribution data={data.revenueByCategory} />
        </div>

        <div className="data-row">
          <TopCustomers data={data.topCustomers} />
          <RecentTransactions data={data.recentTransactions} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App;
