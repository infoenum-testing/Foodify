// src/Screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
  },
  {
    id: 2,
    name: "Clothes",
    image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://cdn-icons-png.flaticon.com/512/1165/1165674.png",
  },
  {
    id: 4,
    name: "Furniture",
    image: "https://cdn-icons-png.flaticon.com/512/679/679922.png",
  },
  {
    id: 5,
    name: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
  },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaProvider style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <View>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              activeOpacity={0.7}
              onPress={() => console.log("Pressed:", cat.name)}
            >
              <View style={styles.categoryCircle}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 10,
    color: "#222",
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    marginRight: 20,
    alignItems: "center",
  },
  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});