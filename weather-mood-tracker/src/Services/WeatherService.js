// src/services/WeatherService.js
import axios from "axios";

// Load the User-Agent from environment variables
const userAgent = process.env.REACT_APP_USER_AGENT;

// Base URL for the MET Weather API
const BASE_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

// Function to fetch weather data based on latitude and longitude

/*
Axios for HTTP Requests: We're using Axios here to send a GET request to the MET Weather API. 
  Axios is easier to work with than the native fetch() API, especially when dealing with headers and error handling.

User-Agent: The MET Weather API requires that every request includes a User-Agent header. 
  This is a string that identifies your application (as mentioned in their terms of service). 
  We load this string from the .env file (process.env.REACT_APP_USER_AGENT).

fetchWeather() Function:
Parameters: Takes lat (latitude) and lon (longitude) as arguments to dynamically fetch weather data for any location.
API Call: We use axios.get() to make a GET request to the MET Weather API endpoint. 
  The coordinates are passed as query parameters (lat and lon), and the User-Agent header is added to the request.
Error Handling: If the request fails, we catch and log the error, 
  and throw it again so that calling components can handle it as needed.
*/
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
