// src/App.js
import React, { useEffect, useState } from "react";
import { auth } from "./components/firebaseConfig"; // Firebase configuration and auth instance
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth method
import Weather from "./components/Weather"; // Your Weather component (or other authenticated components)
import Auth from "./components/Auth"; // Your Auth component (Login/Sign Up form)

const App = () => {
  const [user, setUser] = useState(null); // State to store the authenticated user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
        console.log("User signed in:", user); // Log user info
      } else {
        setUser(null); // No user is signed in
        console.log("User signed out"); // Log user sign out
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Render the Auth component if no user is logged in, otherwise render Weather or other protected routes
  return (
    <div>
      {user ? (
        <Weather user={user} /> // Render the Weather component if user is signed in
      ) : (
        <Auth user={user} /> // Pass user to Auth component
      )}
    </div>
  );
};

export default App;
