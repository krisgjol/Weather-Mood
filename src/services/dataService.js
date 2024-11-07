// src/services/dataService.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";

export const fetchMonthlyMoodData = async (userId) => {
  const moodsRef = collection(db, "moods");
  const userQuery = query(moodsRef, where("userId", "==", userId));
  const moodDocs = await getDocs(userQuery);

  const moodCounts = {};
  moodDocs.forEach((doc) => {
    const timestamp = doc.data().timestamp.toDate();
    const month = timestamp.toISOString().substring(0, 7); // Format as "YYYY-MM"
    moodCounts[month] = (moodCounts[month] || 0) + 1;
  });

  return moodCounts;
};
