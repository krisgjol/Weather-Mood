// src/components/MonthlyEntriesChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const MonthlyEntriesChart = () => {
  const labels = ["January", "February", "March", "April"];
  const data = {
    labels,
    datasets: [
      {
        label: "Entries per Month",
        data: [5, 10, 7, 12],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "20px auto" }}>
      <h3>Entries per Month</h3>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default MonthlyEntriesChart;
