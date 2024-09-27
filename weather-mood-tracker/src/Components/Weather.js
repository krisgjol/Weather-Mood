// src/components/Weather.js
import React, { useState, useEffect } from "react";
import { fetchWeather } from "../services/WeatherService";
import { getLocationName } from "../services/geocodeService";

const Weather = () => {
  // Stores the fetched weather data. Initially null because the data is not loaded until the API call completes.
  const [weatherData, setWeatherData] = useState(null);
  // A boolean that indicates if the API call is still in progress. 
  // Initially true because we want to show a loading message until the data is received.
  const [loading, setLoading] = useState(true);
  // Stores any error message that occurs during the fetch process.
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("");

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
    </div>
  ) : (
    <p>No weather data available</p>
  );
};

export default Weather;
