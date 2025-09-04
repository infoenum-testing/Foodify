import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Button from "../components/Button";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";

export default function CheckoutScreen({ route, navigation }) {
  const { totalPrice, cartItems } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


  const handlePlaceOrder = async () => {
    if (!name || !address || !phone) {
      Alert.alert("Error", "Please fill all details");
      return;
    }

    try {
      const user = FirebaseAuth.currentUser;
      if (!user) {
        Alert.alert("Error", "User not logged in!");
        return;
      }

      const userId = user.uid;

      // Create a unique orderId
      const newOrderRef = db.ref(`/orders`).push();
      const orderId = newOrderRef.key;

      const orderData = {
        orderId,
        userId,
        customer: { name, address, phone },
        items: cartItems,
        totalPrice,
        status: "Pending", // can later be updated by admin
        createdAt: new Date().toISOString(),
      };

      await newOrderRef.set(orderData);

      await db.ref(`/users/${userId}/orders/${orderId}`).set(orderData);

      await db.ref(`/carts/${userId}`).remove();

      setName("");
      setAddress("");
      setPhone("");

      Alert.alert("Success", "Your order has been placed!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error adding order: ", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
              <Text style={styles.itemDetails}>Price: ₹{item.price}</Text>
            </View>
            <Text style={styles.subtotal}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₹{totalPrice}</Text>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={[styles.input, styles.textArea]}
          multiline
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      {/* Checkout Button */}
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#444",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f2f2f2",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  itemDetails: {
    fontSize: 14,
    color: "#6666668c",
    marginTop: 2,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
});
