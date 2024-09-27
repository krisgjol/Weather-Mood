# Weather-Mood

App Initialization: The application starts by rendering the 'App' component, which in turn renders the Weather component.

API Call in useEffect: When the 'Weather' component mounts, the useEffect() hook triggers, calling the getWeather() function to fetch weather data.

Fetching Weather Data:
The fetchWeather() function in weatherService.js sends a GET request to the MET Weather API, including the User-Agent header and latitude/longitude as query parameters.
The weather data is returned by the API and passed back to the Weather component.

Display Data or Error:
While the data is being fetched, a loading message is displayed.
If the API call succeeds, the weather data (temperature and humidity) is displayed.
If the API call fails, an error message is shown.