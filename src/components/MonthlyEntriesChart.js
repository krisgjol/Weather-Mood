// src/components/MonthlyEntriesChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";

const MonthlyEntriesChart = ({ user }) => {
  const [labels, setLabels] = useState([]);
  const [entryCounts, setEntryCounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entriesQuery = query(
          collection(db, "moods"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(entriesQuery);
        
        const monthlyData = {}; // e.g., { "January": 5, "February": 3 }

        snapshot.forEach((doc) => {
          const data = doc.data();
          let date;

          // Check if timestamp is a Firestore Timestamp object
          if (data.timestamp instanceof Timestamp) {
            date = data.timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
          } else if (typeof data.timestamp === "string") {
            date = new Date(data.timestamp); // Handle if timestamp is stored as a string
          } else {
            console.error("Invalid timestamp format:", data.timestamp);
            return; // Skip the document if timestamp is not in a recognized format
          }

          const month = date.toLocaleString("default", { month: "long" });

          if (monthlyData[month]) {
            monthlyData[month] += 1;
          } else {
            monthlyData[month] = 1;
          }
        });

        setLabels(Object.keys(monthlyData));
        setEntryCounts(Object.values(monthlyData));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const data = {
    labels,
    datasets: [
      {
        label: "Entries per Month",
        data: entryCounts,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,  // Ensures that the x-axis starts from 0
      },
      y: {
        beginAtZero: true,  // Ensures that the y-axis starts from 0
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px", // Adjust this based on your desired chart size
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <h3>Entries per Month</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default MonthlyEntriesChart;
