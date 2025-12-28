import React from "react";
import "../styles/KeyMetrics.css";

const KeyMetrics = ({ data }) => {
  return (
    <div className="metrics-container">
      <div className="metric-card">
        <div className="metric-icon">💰</div>
        <div className="metric-content">
          <h3>Total Revenue</h3>
          <p className="metric-value">
            $
            {data.totalRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon">📊</div>
        <div className="metric-content">
          <h3>Active Rentals</h3>
          <p className="metric-value">{data.activeRentals.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
