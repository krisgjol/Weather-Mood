// src/components/Auth.js
import React from "react";
import { auth } from "./firebaseConfig"; // Import the Firebase auth instance
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import required Firebase Auth methods

const Auth = ({ user }) => {
  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create a new instance of the Google provider
    try {
      await signInWithPopup(auth, provider); // Sign in with a popup window
      console.log("Google sign-in successful!"); // Log success
    } catch (error) {
      console.error("Error during Google sign-in:", error); // Log error if any
    }
  };

  // Function to handle Sign Out
//   const handleSignOut = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       console.log("Sign-out successful!"); // Log success
//     } catch (error) {
//       console.error("Error during sign-out:", error); // Log error if any
//     }
//   };

  return (
    <div>
      <h2>{user ? "Welcome!" : "Login"}</h2>
      {user ? (
        <div>
          <p>Signed in as: {user.email}</p> {/* Show the signed-in user's email */}
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button> // Button to sign in
      )}
    </div>
  );
};

export default Auth;
