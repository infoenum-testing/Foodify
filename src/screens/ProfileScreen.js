import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";


export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = FirebaseAuth.currentUser;
    if (!user) return;

    const profileRef = db.ref(`/users/${user.uid}/profile`);

    profileRef.on("value", (snapshot) => {
      setProfile(snapshot.val());
      setLoading(false);
    });

    return () => profileRef.off();
  }, []);

  const handleHelp = () => {
    Alert.alert("Help & Support", "Contact support at support@example.com");
  };

  const handleDeleteAccount = async () => {
    const user = FirebaseAuth.currentUser;
    if (!user) return;

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await db.ref(`/users/${user.uid}`).remove();
              await user.delete();
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await FirebaseAuth.signOut();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              profile?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{profile?.name || "Guest User"}</Text>
        <Text style={{ color: "#666" }}>{profile?.email}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem
          icon={require("../../Assets/Images/edit.png")}
          label="Edit Profile"
          onPress={() => navigation.navigate("EditProfile", { profile })}
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
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuRow}>
        <Image source={icon} style={[styles.menuIcon, isDanger && { tintColor: "red" }]} />
        <Text style={[styles.menuText, isDanger && { color: "red" }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6f8"
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222"
  },
  menu: {
    marginHorizontal: 20
  },
  menuItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuIcon: {
    width: 22,
    height: 22,
    tintColor: "#28a745",
    marginRight: 12
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600"
  },
});
