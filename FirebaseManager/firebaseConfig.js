// FirebaseManager/firebaseConfig.js
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

// Authentication
export const FirebaseAuth = auth();

// Realtime DB instance
export const db = database();
