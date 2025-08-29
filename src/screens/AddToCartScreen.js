import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import Button from '../components/Button';

const productsData = [
    {
        id: "1",
        name: "Pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
        id: "2",
        name: "Burger",
        price: 150,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
];

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>

            {/* Quantity Row */}
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
                        source={require('../../Assets/Images/delete.png')}
                        style={{ width: 24, height: 24 , tintColor: 'red'}}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function CartScreen() {
    const [cartItems, setCartItems] = useState(
        productsData.map((p) => ({ ...p, quantity: 1 }))
    );

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQty } : item
            )
        );
    };

    const deleteItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        Alert.alert("Checkout", `Total amount: ₹${totalPrice}`);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {cartItems.length === 0 ? (
                <Text style={{ fontSize: 18, textAlign: "center", marginTop: 200 }}>
                    Your cart is empty
                </Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
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
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteText: {
        color: "#fff",
        fontSize: 12,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
