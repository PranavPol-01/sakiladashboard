import React, { useState } from "react";
import "../styles/TopCustomers.css";

const TopCustomers = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "totalSpent",
    direction: "desc",
  });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] - b[sortConfig.key];
    }
    return b[sortConfig.key] - a[sortConfig.key];
  });

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="dashboard-card">
      <h2>Top 10 Customers</h2>
      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th
                onClick={() => handleSort("totalRentals")}
                className="sortable"
              >
                Total Rentals{" "}
                {sortConfig.key === "totalRentals" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("totalSpent")} className="sortable">
                Total Spent{" "}
                {sortConfig.key === "totalSpent" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.fullName}</td>
                <td>{customer.totalRentals}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCustomers;
