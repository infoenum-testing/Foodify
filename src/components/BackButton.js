// src/components/BackButton.js
import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={require('../../Assets/Images/back.png')}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
