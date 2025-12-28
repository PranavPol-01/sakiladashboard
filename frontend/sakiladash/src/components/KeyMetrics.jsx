import React from "react";
import "../styles/KeyMetrics.css";
import { HiCurrencyDollar, HiChartBar } from "react-icons/hi";

const KeyMetrics = ({ data }) => {
  return (
    <div className="metrics-container">
      <div className="metric-card">
        <HiCurrencyDollar className="metric-icon" />
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
        <HiChartBar className="metric-icon" />
        <div className="metric-content">
          <h3>Active Rentals</h3>
          <p className="metric-value">{data.activeRentals.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
