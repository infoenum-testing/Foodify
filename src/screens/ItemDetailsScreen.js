import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";
import { showError, showSuccess } from "../utils/alerts";

export default function ItemDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const price = item.price;
  const total = price * quantity;

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    try {
      const user = FirebaseAuth.currentUser;
      if (!user) {
        showError("You must be logged in to add to cart.");
        return;
      }

      // Save to Realtime DB
      await db.ref(`/carts/${user.uid}/${item.id}`).set({
        ...item,
        quantity,
      });

      showSuccess(`${quantity} ${item.name}(s) added to cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showError("Could not add to cart.");
    }
  };

  const handleBuyNow = () => {
    const user = FirebaseAuth.currentUser;
    if (!user) {
      showError("You must be logged in to continue.");
      return;
    }

    // Prepare item with selected quantity
    const buyNowItem = {
      ...item,
      quantity,
    };

    // Navigate directly to Checkout screen
    navigation.navigate("Checkout", {
      totalPrice: buyNowItem.price * buyNowItem.quantity,
      cartItems: [buyNowItem],
    });
  };


  return (
    <ScrollView style={styles.container}>
      {/* Item Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      {/* Title + Price */}
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>

      {/* Rating (static for now) */}
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
        {item.description ||
          "Delicious food freshly prepared with the best ingredients."}
      </Text>

      <View style={styles.divider} />

      {/* Total + Actions */}
      <View style={styles.rowBetween}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>₹{total}</Text>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Buy Now" onPress={handleBuyNow} />
        </View>
      </View>
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  imageWrapper: {
    alignItems: "center",
    marginVertical: 16
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#28a745",

  },

  //  Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4
  },
  star: {
    fontSize: 16,
    marginRight: 4
  },
  rating: {
    fontWeight: "600",
    marginRight: 6
  },
  reviews: {
    color: "#777"
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12
  },

  // Quantity
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 12
  },

  // Description
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16
  },

  totalText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",

  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 16
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
});
