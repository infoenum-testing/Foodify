import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user);

  const handleOrders = () => {
    Alert.alert("My Orders", "Here you can see your past orders.");
  };

  const handleHelp = () => {
    Alert.alert("Help & Support", "Contact support at support@example.com");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Account Deleted") },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logged Out") },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <MenuItem
          label="Edit Profile"
          onPress={() => navigation.navigate("EditProflie")}
        />
        <MenuItem label="My Orders" onPress={handleOrders} />
        <MenuItem label="Help & Support" onPress={handleHelp} />
        <MenuItem label="Delete Account" onPress={handleDeleteAccount} isLogout />
        <MenuItem label="Logout" onPress={handleLogout} isLogout />
      </View>
    </ScrollView>
  );
}

function MenuItem({ label, onPress, isLogout }) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isLogout && { backgroundColor: "#fff", borderColor: "#eee" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.menuText, isLogout && { color: "red" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  headerCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 30,
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 25,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },
  menu: {
    marginHorizontal: 20,
  },
  menuItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});