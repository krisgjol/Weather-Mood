// src/components/MoodWeatherCorrelation.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const MoodWeatherCorrelation = ({ user }) => {
  const [labels, setLabels] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entriesQuery = query(
          collection(db, "moods"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(entriesQuery);
        
        const days = [];
        const moods = [];
        const temperatures = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          days.push(data.date); // Assuming data.date is a formatted date string
          moods.push(data.mood);
          temperatures.push(data.temperature);
        });

        setLabels(days);
        setMoodData(moods);
        setTemperatureData(temperatures);
      } catch (err) {
        console.error("Error fetching data: ", err);
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
        label: "Mood (1-5)",
        data: moodData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Temperature (°C)",
        data: temperatureData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
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
      <h3>Mood and Temperature Correlation</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default MoodWeatherCorrelation;
