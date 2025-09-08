import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import Button from "../../components/Button";
import { FirebaseAuth, db } from "../../../FirebaseManager/firebaseConfig";
import CustomAlert from "../../components/CustomAlert";
import styles from "./CheckoutScreenStyle";



export default function CheckoutScreen({ route, navigation }) {
  const { totalPrice, cartItems } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // Show alert helper
  const showAlert = (title, message, onConfirm = null, showCancel = true) => {
    setAlertConfig({ visible: true, title, message, onConfirm, showCancel });
  };


  const handlePlaceOrder = async () => {
    if (!name || !address || !phone) {
      showAlert("Error", "Please fill all details");
      return;
    }

    const user = FirebaseAuth.currentUser;
    if (!user) {
      showAlert("Error", "User not logged in!");
      return;
    }

    const userId = user.uid;

    // Ask for confirmation before placing the order
    showAlert(
      `Do you want to place this order for ₹${totalPrice}?`,
      "Confirm Order",
      async () => {
        try {
          // Create a unique orderId
          const newOrderRef = db.ref(`/orders`).push();
          const orderId = newOrderRef.key;

          const orderData = {
            orderId,
            userId,
            customer: { name, address, phone },
            items: cartItems,
            totalPrice,
            status: "Pending",
            createdAt: new Date().toISOString(),
          };

          await newOrderRef.set(orderData);
          await db.ref(`/users/${userId}/orders/${orderId}`).set(orderData);
          await db.ref(`/carts/${userId}`).remove();

          setName("");
          setAddress("");
          setPhone("");

          showAlert(
            "Success",
            "Your order has been placed!",
            () => navigation.goBack(),
            false // hide Cancel button
          );
        } catch (error) {
          console.error("Error adding order: ", error);
          showAlert("Error", "Something went wrong. Please try again.");
        }
      }
    );
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
        showCancel={alertConfig.showCancel ?? true}
      />

    </ScrollView>
  );
}
