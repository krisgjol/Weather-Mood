// src/Components/Weather.js
import React, { useState, useEffect } from "react";
import { fetchWeather } from "../Services/WeatherService";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        // Example coordinates for Lillestrøm, Norway
        const lat = 59.95;
        const lon = 11.0;
        const data = await fetchWeather(lat, lon);
        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return weatherData ? (
    <div>
      <h2>Weather Forecast for {weatherData.geometry?.coordinates.join(", ")}</h2>
      <p>Temperature: {weatherData.properties.timeseries[0].data.instant.details.air_temperature}°C</p>
      <p>Humidity: {weatherData.properties.timeseries[0].data.instant.details.relative_humidity}%</p>
    </div>
  ) : (
    <p>No weather data available</p>
  );
};

export default Weather;
