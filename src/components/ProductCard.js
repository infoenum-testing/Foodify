// src/components/ProductCard.js

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";

const ProductCard = ({ item, width, onPress, horizontal = false }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <TouchableOpacity
            style={[
                styles.productCard,
                horizontal ? styles.horizontalCard : { width },
            ]}
            onPress={onPress}
        >
            <View style={horizontal ? styles.imageWrapperHorizontal : styles.imageWrapper}>
                {loading && !error && (
                    <ActivityIndicator size="small" color="#2382AA" style={styles.loader} />
                )}

                {!error ? (
                    <Image
                        source={{ uri: item.image }}
                        style={horizontal ? styles.productImageHorizontal : styles.productImage}
                        onLoadStart={() => {
                            setLoading(true);
                            setError(false);
                        }}
                        onLoadEnd={() => setLoading(false)}
                        onError={() => {
                            setLoading(false);
                            setError(true);
                        }}
                    />
                ) : (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>No Image</Text>
                    </View>
                )}
            </View>

            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.shopName} numberOfLines={1}>
                    {item.shop}
                </Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    horizontalCard: {
        width: 140,
        marginRight: 12,
    },
    imageWrapper: {
        width: "100%",
        height: 140,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    imageWrapperHorizontal: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    productImage: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productImageHorizontal: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    loader: {
        position: "absolute",
        zIndex: 1,
    },
    errorBox: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    errorText: {
        fontSize: 12,
        color: "#555",
    },
    productInfo: {
        padding: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
        color: "#222",
    },
    shopName: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: "700",
        color: "#28a745",
    },
});
