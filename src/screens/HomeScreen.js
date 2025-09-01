// src/screens/HomeScreen.js

import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import { fetchMenu } from "../services/api";


const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Firebase Menu Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { categories, productsByCategory } = await fetchMenu();
      setCategories(categories);
      setProductsByCategory(productsByCategory);
      setLoading(false);
    };
    loadData();
  }, []);

  // Flatten all products for search
  const allProducts = useMemo(
    () => Object.values(productsByCategory).flat(),
    [productsByCategory]
  );

  if (loading) {
    return (
      <SafeAreaProvider style={styles.center}>
        <ActivityIndicator size="large" color="#2382AA" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {/*  Search Bar */}
      <SearchBar
        data={allProducts}
        filterKey="name"
        placeholder="Search delicious food..."
        onResults={setFilteredResults}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 📂 Categories */}
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
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("ItemDetails", { item })
                }
              >
                <View style={styles.categoryCircle}>
                  <Text style={styles.categoryInitial}>{cat.name[0]}</Text>
                </View>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products by Category */}
        {categories.map((cat) => (
          <View key={cat.id} style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{cat.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CategoryProducts", { category: cat })
                }
              >
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={productsByCategory[cat.name] || []}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productCard}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate("ItemDetails", { item })}
                >
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.shopName}>{item.shop}</Text>
                    <Text style={styles.productPrice}>₹{item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionWrapper: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  seeAll: {
    fontSize: 14,
    color: "#2382AA",
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryItem: {
    marginRight: 20,
    alignItems: "center",
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFEAE6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  categoryInitial: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6F61",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  horizontalList: {
    paddingLeft: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    width: 180,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#28a745",
    marginTop: 6,
  },
  shopName: {
    fontSize: 13,
    color: "#888",
  },
});
