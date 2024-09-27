// src/App.js
import React from "react";
import Weather from "./components/Weather";

// responsible for rendering your entire application. 
// Here, we just import the Weather component and render it inside a basic layout. 
// You can later extend this to include a form for user mood input, or other components.
function App() {
  return (
    <div className="App">
      <h1>Weather & Mood Tracker</h1>
      <Weather />
    </div>
  );
}

export default App;
