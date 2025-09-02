
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import CartItem from "../components/CartItem";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";

export default function CartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const user = FirebaseAuth.currentUser;
        if (!user) return;

        const cartRef = db.ref(`/carts/${user.uid}`);

        cartRef.on("value", (snapshot) => {
            const data = snapshot.val() || {};
            const items = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setCartItems(items);
        });

        return () => cartRef.off();
    }, []);

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        const user = FirebaseAuth.currentUser;
        if (!user) return;

        db.ref(`/carts/${user.uid}/${id}`).update({ quantity: newQty });
    };

    const deleteItem = (id) => {
        const user = FirebaseAuth.currentUser;
        if (!user) return;

        db.ref(`/carts/${user.uid}/${id}`).remove();
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        navigation.navigate("Checkout", { totalPrice, cartItems });
    };


    const filteredItems = cartItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder="Search in cart..."
            />

            {filteredItems.length === 0 ? (
                <Text style={{ fontSize: 18, textAlign: "center", marginTop: 200 }}>
                    {search ? "No items match your search" : "Your cart is empty"}
                </Text>
            ) : (
                <>
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CartItem
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onDelete={deleteItem}
                            />
                        )}
                    />

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
                        <Button title="Checkout" onPress={handleCheckout} />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
