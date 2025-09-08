import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Button from "../../components/Button";
import { FirebaseAuth, db } from "../../../FirebaseManager/firebaseConfig";
import CustomAlert from "../../components/CustomAlert";
import styles from "./ItemDetailsScreenStyle";

export default function ItemDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const price = item.price;
  const total = price * quantity;

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const showAlert = (title, message, onConfirm = null) => {
    setAlertConfig({ visible: true, title, message, onConfirm });
  };
  const handleAddToCart = async () => {
    const user = FirebaseAuth.currentUser;
    if (!user) {
      showAlert("Error", "You must be logged in to add to cart.");
      return;
    }

    // Show confirmation alert first
    showAlert(
      `Do you want to add ${quantity} ${item.name}(s) to cart?`,
      "Confirm",
      async () => {
        try {
          await db.ref(`/carts/${user.uid}/${item.id}`).set({
            ...item,
            quantity,
          });

        } catch (error) {
          console.error("Error adding to cart:", error);
          showAlert("Could not add to cart.", "Error");
        }
      }
    );
  };

  const handleBuyNow = () => {
    const user = FirebaseAuth.currentUser;
    if (!user) {
      showAlert("You must be logged in to continue.");
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

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        onConfirm={
          alertConfig.onConfirm
            ? () => {
              alertConfig.onConfirm();
              setAlertConfig({ ...alertConfig, visible: false });
            }
            : null
        }
      />
    </ScrollView>
  );
}
