import React from "react";

// Function to get emoji based on mood value
const getEmojiForMood = (mood) => {
  switch (mood) {
    case 1: return "😢"; // Sad
    case 2: return "😟"; // Disappointed
    case 3: return "😐"; // Neutral
    case 4: return "😊"; // Happy
    case 5: return "😁"; // Very Happy
    default: return "😐"; // Neutral as default
  }
};

const MoodSlider = ({ mood, setMood }) => {
  // Function to handle slider change
  const handleMoodChange = (event) => {
    const newMood = Number(event.target.value); // Convert the slider value to a number
    setMood(newMood); // Update the mood state
  };

  return (
    <div>
      <label htmlFor="mood-slider">Select Your Mood:</label>
      <input
        id="mood-slider"
        type="range"
        min="1"
        max="5"
        value={mood}
        onChange={handleMoodChange} // Call the change handler on slider change
      />
      <p>Current Mood: {mood} {getEmojiForMood(mood)}</p>
    </div>
  );
};

export default MoodSlider;
