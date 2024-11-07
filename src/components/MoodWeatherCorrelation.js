// src/components/MoodWeatherCorrelation.js
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MoodWeatherCorrelation = () => {
  const labels = ["Day 1", "Day 2", "Day 3", "Day 4"];
  const data = {
    labels,
    datasets: [
      {
        label: "Mood (1-5)",
        data: [3, 4, 2, 5],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Temperature (°C)",
        data: [10, 15, 13, 8],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "20px auto" }}>
      <h3>Mood and Temperature Correlation</h3>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default MoodWeatherCorrelation;
