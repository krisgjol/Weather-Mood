# Weather Mood Tracker

Weather Mood Tracker is a React app that lets users track their daily mood alongside the weather at their current location. The app integrates with Firebase for authentication (including Google sign-in) and Firestore to store mood and weather data.

## Features

### Current Functionality

- **User Authentication**: 
  - Users can sign up, log in, and log out of the app.
  - Google Authentication is supported, making sign-in seamless for users with a Google account.
  
- **Weather Data Fetching**: 
  - Upon logging in, the app automatically fetches your current location’s weather data (temperature, humidity) using the user's geolocation.
  
- **Mood Tracking**: 
  - Users can select their mood using a simple mood slider (1-5 scale).
  - Moods are represented with corresponding emojis:
    - 1: 😢 (Sad)
    - 2: 😟 (Disappointed)
    - 3: 😐 (Neutral)
    - 4: 😊 (Happy)
    - 5: 😁 (Very Happy)
  
- **Daily Mood Entries**: 
  - Each day, users can submit their mood alongside the weather data.
  - If a mood has already been submitted for the current day, the app will replace the existing entry with the new one, ensuring only one mood entry per day.

- **Firebase Firestore Integration**: 
  - Weather and mood data are stored in Firebase Firestore for future retrieval and analysis.

### Coming Soon

- **User Dashboard**: 
  - A dashboard where users can view their past mood entries and analyze their mood trends over time.
  
- **Mood-Weather Correlation**: 
  - Insights into how the weather might be affecting the user's mood, with visual graphs showing trends over time.
  
- **Notifications & Reminders**: 
  - Push notifications to remind users to log their daily mood.

- **Mobile Responsiveness**: 
  - Improve UI/UX for mobile devices to ensure a seamless experience across platforms.

- **Analytics & Data Visualization**: 
  - Display mood and weather trends with charts and graphs for easier tracking.

## How to Run Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/weather-mood-tracker.git
   cd weather-mood-tracker
   ```

2. **Install Dependencies**:

   Make sure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

3. **Set Up Firebase**:

   You need to create a Firebase project to get started:
   
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Set up Firebase Authentication and Firestore.
   - Copy your Firebase config and update the `firebaseConfig.js` file.

4. **Run the App**:

   Once everything is set up, run the development server:

   ```bash
   npm start
   ```

   The app should be running locally on [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Frontend**: React
- **Authentication**: Firebase Authentication (with Google sign-in)
- **Database**: Firebase Firestore
- **Weather API**: [Your Weather API Provider] (e.g., OpenWeatherMap, Met.no, etc.)
- **Hosting**: Firebase Hosting (or another CI/CD service, depending on deployment)


## Future Ideas

- **Social Sharing**: Allow users to share their mood-weather reports with friends.
- **Location-based Analytics**: Compare mood trends across different regions.
- **Custom Reminders**: Allow users to set custom reminders for mood tracking.
- **Dark Mode**: Add a dark mode toggle for better UI accessibility.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.