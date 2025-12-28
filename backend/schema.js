const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Film {
    filmId: Int!
    title: String!
    rentalCount: Int!
  }

  type Category {
    categoryName: String!
    revenue: Float!
    percentage: Float!
  }

  type Customer {
    customerId: Int!
    fullName: String!
    totalRentals: Int!
    totalSpent: Float!
  }

  type KeyMetrics {
    totalRevenue: Float!
    activeRentals: Int!
  }

  type Transaction {
    paymentId: Int!
    customerName: String!
    filmTitle: String!
    amount: Float!
    paymentDate: String!
  }

  type Query {
    getTopRentedFilms(
      storeId: Int
      startDate: String
      endDate: String
    ): [Film!]!
    getRevenueByCategory(
      storeId: Int
      startDate: String
      endDate: String
    ): [Category!]!
    getTopCustomers(
      storeId: Int
      startDate: String
      endDate: String
    ): [Customer!]!
    getKeyMetrics(storeId: Int, startDate: String, endDate: String): KeyMetrics!
    getRecentTransactions(
      storeId: Int
      startDate: String
      endDate: String
    ): [Transaction!]!
  }
`;

module.exports = typeDefs;
