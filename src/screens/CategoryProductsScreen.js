// src/screens/CategoryProductsScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const CategoryProductsScreen = ({ route, navigation }) => {
  const { category } = route.params;

  // Products for this category
  const products = category.products || []; 

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.header}>{category.name}</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
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
      )}
    </SafeAreaProvider>
  );
};

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#222",
  },
  shopName: {
    fontSize: 13,
    color: "#666",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    color: "#28a745",
  },
});
