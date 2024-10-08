import React from "react";

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
    </div>
  );
};

export default MoodSlider;
