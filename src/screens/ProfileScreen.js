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
import { FirebaseAuth } from "../../FirebaseManager/firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user);

  const handleHelp = () => {
    Alert.alert("Help & Support", "Contact support at support@example.com");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account Deleted"),
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await FirebaseAuth.signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.error("Logout Error: ", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name || "Guest User"}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem
          icon={require("../../Assets/Images/edit.png")}
          label="Edit Profile"
          onPress={() => navigation.navigate("EditProflie")}
        />
        <MenuItem
          icon={require("../../Assets/Images/order.png")}
          label="My Orders"
          onPress={() => navigation.navigate("MyOrders")}
        />
        <MenuItem
          icon={require("../../Assets/Images/help.png")}
          label="Help & Support"
          onPress={handleHelp}
        />
        <MenuItem
          icon={require("../../Assets/Images/deleteuser.png")}
          label="Delete Account"
          onPress={handleDeleteAccount}
          isDanger
        />
        <MenuItem
          icon={require("../../Assets/Images/logout.png")}
          label="Logout"
          onPress={handleLogout}
          isDanger
        />
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, label, onPress, isDanger }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuRow}>
        <Image
          source={icon}
          style={[styles.menuIcon, isDanger && { tintColor: "red" }]}
        />
        <Text style={[styles.menuText, isDanger && { color: "red" }]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.arrow, isDanger && { color: "red" }]}>{""}</Text>
    </TouchableOpacity>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6f8",
  },

  // Header Section
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 50,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginBottom: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#fff",
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
    letterSpacing: 0.5,
  },

  // Menu Section
  menu: {
    marginHorizontal: 18,
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // subtle shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 26,
    height: 26,
    tintColor: "#28a745",
    marginRight: 16,
  },
  menuText: {
    fontSize: 17,
    color: "#222",
    fontWeight: "600",
  },
  arrow: {
    fontSize: 20,
    color: "#bbb",
    fontWeight: "600",
  },
});

