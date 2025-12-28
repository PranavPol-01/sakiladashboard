import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/TopRentedFilms.css";

const TopRentedFilms = ({ data }) => {
  return (
    <div className="dashboard-card">
      <h2>Top 5 Rented Films</h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
          />
          <XAxis
            dataKey="title"
            angle={-45}
            textAnchor="end"
            height={120}
            interval={0}
            stroke="#A1A1AA"
          />
          <YAxis stroke="#A1A1AA" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1B2030",
              border: "1px solid #2A3147",
              color: "#EDEDED",
            }}
            labelStyle={{ color: "#FFFFFF" }}
          />
          <Bar dataKey="rentalCount" fill="#2EE6A6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRentedFilms;
