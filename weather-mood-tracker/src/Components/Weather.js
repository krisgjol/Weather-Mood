// src/components/Weather.js
import React, { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { getLocationName } from "../services/geocodeService";
import MoodSlider from "./MoodSlider"; // Import MoodInput
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore"; // Firestore methods 
import { auth } from "./firebaseConfig"; // Import auth for signing out
import { signOut } from "firebase/auth"; // Import signOut method

const Weather = ({ user }) => {
  // Stores the fetched weather data. Initially null because the data is not loaded until the API call completes.
  const [weatherData, setWeatherData] = useState(null);
  // A boolean that indicates if the API call is still in progress. 
  // Initially true because we want to show a loading message until the data is received.
  const [loading, setLoading] = useState(true);
  // Stores any error message that occurs during the fetch process.
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [mood, setMood] = useState(3); // State for mood, default to 3 (neutral)

  // What It Does: useEffect() is used to perform side effects in React, such as fetching data. 
  // In this case, we fetch the weather data when the component mounts (runs on first render).
  useEffect(() => {
    // API Call: Inside the useEffect, we define an async function getWeather() that calls fetchWeather() 
    // with the hardcoded latitude and longitude.
    const getLocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude;

            try {
              const data = await fetchWeather(lat, lon);
              setWeatherData(data);

              // Fetch location name using reverse geocoding
              const name = await getLocationName(lat, lon);
              setLocationName(name);
            } catch (err) {
              // Error Handling: If the API call fails, we set an error message that will be displayed in the UI. 
              // If successful, we store the fetched weather data in weatherData.
              setError("Failed to fetch weather data or location name");
            } finally {
              // Loading State: Once the API call is done (either successful or failed), we set loading to false.
              setLoading(false);
            }
          },
          (err) => {
            setError("Failed to get your location");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        setLoading(false);
      }
    };

    // Call the function to get the location and fetch weather data
    getLocationAndWeather();
  }, []);

  // Store mood and weather data in Firebase
  const storeMoodAndWeatherData = async (mood) => {
    const moodValue = Number(mood); // Convert to number just in case
    // Validate the mood value
    if (isNaN(moodValue) || moodValue < 1 || moodValue > 5) {
      console.error("Invalid mood value. Must be a number between 1 and 5.");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const existingMoodQuery = query(
      collection(db, "moods"),
      where("timestamp", ">=", new Date(today)) // Check for entries today
    );

    const existingMoodDocs = await getDocs(existingMoodQuery);
  
    if (!existingMoodDocs.empty) {
      // If an existing entry is found, delete it
      existingMoodDocs.forEach(async (doc) => {
        await deleteDoc(doc.ref); // Delete the existing document
      });
    }

    const weatherInfo = {
      userId: user.uid,
      location: locationName,
      lat: weatherData.geometry?.coordinates[1],
      lon: weatherData.geometry?.coordinates[0],
      temperature: weatherData.properties.timeseries[0].data.instant.details.air_temperature,
      humidity: weatherData.properties.timeseries[0].data.instant.details.relative_humidity,
      mood: moodValue, 
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "moods"), weatherInfo); // Store in Firestore
      console.log("Mood and weather data stored successfully!");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  // Function to sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Loading Message: While the data is being fetched (loading is true), we display a "Loading weather data..." message.
  if (loading) {
    return <p>Loading weather data...</p>;
  }

  // Error Handling: If an error occurred (error is not null), we display the error message
  if (error) {
    return <p>{error}</p>;
  }

  // Weather Data: Once the data is successfully fetched, we display the weather information. 
  // We extract temperature and humidity from the response and display it in the UI.
  return weatherData ? (
    <div>
      <h2>
        Weather Forecast for {locationName} ({weatherData.geometry?.coordinates.join(", ")})
      </h2>
      <p>Temperature: {weatherData.properties.timeseries[0].data.instant.details.air_temperature}°C</p>
      <p>Humidity: {weatherData.properties.timeseries[0].data.instant.details.relative_humidity}%</p>

      {/* Add the MoodSlider component below the weather data */}
      <MoodSlider mood={mood} setMood={setMood} /> {/* Update mood on slider change */}
      
      {/* Button to submit mood and weather data */}
      <button onClick={() => storeMoodAndWeatherData(mood)}>Submit Mood</button>

      {/* Sign Out Button */}
      <button onClick={handleSignOut}>Sign Out</button> {/* Button to sign out */}
    </div>
  ) : (
    <p>No weather data available</p>
  );
};

export default Weather;
