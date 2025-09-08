
import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
