
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import { launchImageLibrary } from "react-native-image-picker";

export default function EditProfileScreen({ navigation, route }) {
  const profile = route.params?.profile || {};

  const [name, setName] = useState(profile.name || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setAvatar(response.assets[0].uri);
      }
    });
  };

  const handleSave = async () => {
    const user = FirebaseAuth.currentUser;
    if (!user) return;

    try {
      await db.ref(`/users/${user.uid}/profile`).update({
        name,
        avatar,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not update profile.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        <Image
          source={{
            uri:
              avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {/* Name Input */}
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      {/* Save Button */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  changePhoto: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 8,
    fontSize: 14,
  },
});
