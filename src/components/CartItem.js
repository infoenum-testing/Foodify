
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CartItem = ({ item, onUpdateQuantity, onDelete }) => (
  <View style={styles.card}>
    {/* Product Image */}
    <Image source={{ uri: item.image }} style={styles.image} />

    {/* Product Info */}
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </View>

    {/* Quantity & Delete */}
    <View style={styles.quantityRow}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        <Text style={styles.quantityText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityNumber}>{item.quantity}</Text>

      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        <Text style={styles.quantityText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Image
          source={require("../../Assets/Images/delete.png")}
          style={{ width: 24, height: 24, tintColor: "red" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#2382AA",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityNumber: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  deleteButton: {
    paddingHorizontal: 8,
    marginLeft: 10,
  },
});
