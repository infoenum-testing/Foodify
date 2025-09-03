// src/utils/alerts.js
import { Alert } from "react-native";

export const showError = (message) => {
  Alert.alert("Error", message);
};

export const showSuccess = (message) => {
  Alert.alert("Success", message);
};

export const showConfirm = (title, message, onConfirm) => {
  Alert.alert(
    title,
    message,
    [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: onConfirm },
    ],
    { cancelable: true }
  );
};
