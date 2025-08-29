import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../components/Button"; 

const PIZZA_URL =
  "https://png.pngtree.com/png-clipart/20240831/original/pngtree-sliced-pizza-png-image_15897645.png";

export default function ItemDetailsScreen() {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const price = 299;
  const total = price * quantity;

  const handleAddToCart = () => {
    Alert.alert("Added to Cart", `You added ${quantity} pizza(s) to cart.`);
  };

  const handleBuyNow = () => {
    Alert.alert("Buy Now", `Proceeding to buy ${quantity} pizza(s).`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.icon}>♡</Text>
          <Text style={styles.icon}>↗</Text>
        </View>
      </View>

      {/* Pizza Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: PIZZA_URL }} style={styles.image} />
      </View>

      {/* Title + Price */}
      <View style={styles.rowBetween}>
        <Text style={styles.title}>Classic Margherita Pizza</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.rating}>4.5</Text>
        <Text style={styles.reviews}>324 reviews</Text>
      </View>

      <View style={styles.divider} />

      {/* Quantity */}
      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.qtyRow}>
        <Button title="-" onPress={decreaseQty} />
        <Text style={styles.qtyValue}>{quantity}</Text>
        <Button title="+" onPress={increaseQty} />
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        Fresh tomatoes, mozzarella, basil and extra virgin olive oil baked to
        perfection. Thin crust, wood-fired, and super flavorful.
      </Text>

      <View style={styles.divider} />

      {/* Total + Buttons */}
      <View style={styles.rowBetween}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>₹{total}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="Add to Cart" onPress={handleAddToCart} />
        <Button title="Buy Now" onPress={handleBuyNow} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerIcons: { flexDirection: "row", gap: 12 },
  icon: { fontSize: 20 },
  imageWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  title: { fontSize: 20, fontWeight: "bold", flex: 1, marginRight: 10 },
  price: { fontSize: 20, fontWeight: "600", color: "#000" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  star: { fontSize: 16, marginRight: 4 },
  rating: { fontWeight: "600", marginRight: 6 },
  reviews: { color: "#777" },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  qtyRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  qtyValue: { fontSize: 18, fontWeight: "600", marginHorizontal: 12 },
  description: { fontSize: 14, color: "#444", marginBottom: 16 },
  
  totalText: { fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontSize: 18, fontWeight: "bold" },
  buttonRow: {
    marginTop: 16,
  },
});
