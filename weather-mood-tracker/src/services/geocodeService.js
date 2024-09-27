// src/services/geocodeService.js
import axios from "axios";

// https://opencagedata.com/dashboard#geocoding

/*
We’re making a GET request to OpenCage’s reverse geocoding API, passing the lat and lon as parameters.
The formatted field from the API response contains the human-readable location (e.g., "London, United Kingdom").
If no results are found or an error occurs, it returns "Unknown Location."
*/

const GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json";
const API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY; // Access the API key from the .env

export const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: `${lat},${lon}`,
        key: API_KEY,
        limit: 1
      }
    });
    const results = response.data.results;
    if (results && results.length > 0) {
      return results[0].formatted; // Return the formatted location name
    } else {
      console.warn("No results found for the location");
      return "Unknown Location";
    }
  } catch (error) {
    console.error("Error fetching location name:", error.response || error.message);
    return "Unknown Location";
  }
};

