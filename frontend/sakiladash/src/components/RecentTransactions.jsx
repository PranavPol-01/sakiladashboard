import React from "react";
import "../styles/RecentTransactions.css";

const RecentTransactions = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dashboard-card">
      <h2>Recent Transactions</h2>
      <div className="transactions-feed">
        {data.map((transaction) => (
          <div key={transaction.paymentId} className="transaction-item">
            <div className="transaction-content">
              <p className="transaction-text">
                <strong>{transaction.customerName}</strong> rented{" "}
                <em>{transaction.filmTitle}</em> for{" "}
                <strong className="amount">
                  ${transaction.amount.toFixed(2)}
                </strong>
              </p>
              <p className="transaction-date">
                {formatDate(transaction.paymentDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
