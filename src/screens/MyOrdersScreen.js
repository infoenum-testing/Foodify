
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { FirebaseAuth, db } from "../../FirebaseManager/firebaseConfig";

export default function MyOrdersScreen() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const user = FirebaseAuth.currentUser;
        if (!user) return;

        const ordersRef = db.ref(`/users/${user.uid}/orders`);

        ordersRef.on("value", (snapshot) => {
            const data = snapshot.val() || {};
            const orderList = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setOrders(orderList.reverse());
        });

        return () => ordersRef.off();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "#f0ad4e";
            case "Shipped":
                return "#007bff";
            case "Delivered":
                return "#28a745";
            case "Cancelled":
                return "#dc3545";
            default:
                return "#6c757d";
        }
    };

    const renderOrder = ({ item }) => {
        const firstItem = item.items[0];
        const extraItems = item.items.length - 1;

        return (
            <View>
                <View style={styles.row}>
                    {/* Image */}
                    <Image
                        source={{ uri: firstItem?.image }}
                        style={styles.orderImage}
                    />

                    {/* Info */}
                    <View style={styles.info}>
                        <Text style={styles.orderTitle} numberOfLines={1}>
                            {firstItem?.name || "Order"}
                            {extraItems > 0 && (
                                <Text style={styles.moreItems}> +{extraItems} more</Text>
                            )}
                        </Text>
                        <Text style={styles.total}>₹{item.totalPrice}</Text>
                    </View>

                    {/* Status */}
                    <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                        {item.status || "Pending"}
                    </Text>
                </View>

                {/* Divider */}
                <View style={styles.divider} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {orders.length === 0 ? (
                <Text style={styles.emptyText}>No past orders found</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(order) => order.id}
                    renderItem={renderOrder}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 200,
        color: "#666",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    orderImage: {
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: "#f2f2f2",
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    moreItems: {
        fontSize: 13,
        color: "#666",
        fontWeight: "400",
    },
    total: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "500",
        color: "#28a745",
    },
    status: {
        fontSize: 14,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 12
    },
});
