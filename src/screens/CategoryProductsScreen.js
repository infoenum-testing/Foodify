
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";

const CategoryProductsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const products = category.products || [];
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const cardWidth = (screenWidth - 48) / 2;

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.header}>{category.name}</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              width={cardWidth}
              onPress={() => navigation.navigate("ItemDetails", { item })}
              horizontal={false} 
            />
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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 10
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#222"
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 40
  },
  list: {
    paddingBottom: 20
  },
});
