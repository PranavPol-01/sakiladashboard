import React from "react";
import "../styles/FilterBar.css";

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-item">
          <label htmlFor="store">Store:</label>
          <select
            id="store"
            value={filters.storeId || ""}
            onChange={(e) =>
              onFilterChange(
                "storeId",
                e.target.value ? parseInt(e.target.value) : null
              )
            }
          >
            <option value="">All Stores</option>
            <option value="1">Store 1</option>
            <option value="2">Store 2</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => onFilterChange("startDate", e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => onFilterChange("endDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
