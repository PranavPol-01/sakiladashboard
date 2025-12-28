import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/RevenueDistribution.css";

const COLORS = [
  "#FF7A18", // Orange
  "#2EE6A6", // Mint
  "#EC4899", // Pink
  "#8B5CF6", // Violet
  "#FACC15", // Gold
  "#22D3EE", // Aqua
  "#94A3B8", // Gray
  "#FFA24C", // Soft Orange
];

const RevenueDistribution = ({ data }) => {
  return (
    <div className="dashboard-card">
      <h2>Revenue Distribution by Category</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={({ categoryName, percentage }) =>
              `${categoryName}: ${percentage}%`
            }
            outerRadius={90}
            fill="#8884d8"
            dataKey="revenue"
            nameKey="categoryName"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #2A3147",
              color: "#ededed",
              
            }}
            labelStyle={{ color: "#FFFFFF" }}
          />
          <Legend
            verticalAlign="bottom"
            height={70}
            formatter={(value) => value}
            wrapperStyle={{ color: "#EDEDED" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueDistribution;
