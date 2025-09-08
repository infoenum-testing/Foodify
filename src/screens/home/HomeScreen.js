// src/screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import { fetchMenu } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import styles from "./HomeScreenStyles";

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load menu data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const menuData = await fetchMenu();

      setCategories(menuData.categories);
      setProductsByCategory(menuData.productsByCategory);

      // Flatten products for "All"
      const flatProducts = [];
      Object.values(menuData.productsByCategory).forEach((arr) => {
        arr.forEach((p) => flatProducts.push(p));
      });
      setAllProducts(flatProducts);

      setLoading(false);
    };

    loadData();
  }, []);

  // --- Search filter logic ---
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredResults([]);
    } else {
      const results = allProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchQuery, allProducts]);

  if (loading) {
    return (
      <SafeAreaProvider style={styles.center}>
        <ActivityIndicator size="large" color="#2382AA" />
      </SafeAreaProvider>
    );
  }

  // Reusable render
  const renderProduct = ({ item }, horizontal = true) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate("ItemDetails", { item })}
      horizontal={horizontal}
    />
  );

  return (
    <SafeAreaProvider style={styles.container}>
      {/*  Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search delicious food..."
      />

      {/* If search has results */}
      {searchQuery.length > 0 ? (
        filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => String(item.id)}
            numColumns={3}
            contentContainerStyle={styles.gridList}
            columnWrapperStyle={{ gap: 10, marginBottom: 16 }}

            renderItem={({ item }) => renderProduct({ item }, false)}
          />
        ) : (
          <View style={styles.center}>
            <Text style={{ fontSize: 16, color: "#666" }}>No items found</Text>
          </View>
        )
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*  Categories Chips */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {/* All Option */}
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  selectedCategory === "All" && styles.selectedCategoryChip,
                ]}
                onPress={() => setSelectedCategory("All")}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === "All" && styles.selectedCategoryText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.selectedCategoryChip,
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/*  Products Section */}
          {selectedCategory === "All"
            ? categories.map((cat) => (
              <View key={cat.id} style={styles.sectionWrapper}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{cat.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CategoryProducts", {
                        category: {
                          ...cat,
                          products: productsByCategory[cat.name] || [],
                        },
                      })
                    }
                  >
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={productsByCategory[cat.name] || []}
                  horizontal
                  keyExtractor={(item) => String(item.id)}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  renderItem={({ item }) => renderProduct({ item }, true)}
                />
              </View>
            ))
            : (
              <View style={styles.sectionWrapper}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{selectedCategory}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CategoryProducts", {
                        category: {
                          name: selectedCategory,
                          products: productsByCategory[selectedCategory] || [],
                        },
                      })
                    }
                  >
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={productsByCategory[selectedCategory] || []}
                  horizontal
                  keyExtractor={(item) => String(item.id)}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  renderItem={({ item }) => renderProduct({ item }, true)}
                />
              </View>
            )}
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
};

export default HomeScreen;
