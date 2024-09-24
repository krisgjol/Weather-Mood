// src/Services/WeatherService.js
import axios from "axios";

// Load the User-Agent from environment variables
const userAgent = process.env.REACT_APP_USER_AGENT;

// Base URL for the MET Weather API
const BASE_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

// Function to fetch weather data based on latitude and longitude
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}`, {
      headers: {
        'User-Agent': userAgent
      }
    });
    return response.data;  // Return the weather data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;  // Re-throw the error for handling
  }
};
