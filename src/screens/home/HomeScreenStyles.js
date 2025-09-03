import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- Categories ---
  sectionWrapper: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  seeAll: {
    fontSize: 14,
    color: "#2382AA",
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: 12,
  },
  selectedCategoryChip: {
    backgroundColor: "#FF6F61",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "700",
  },

  // --- Product Cards ---
  horizontalList: {
    paddingLeft: 20,
  },
  gridList: {
    padding: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    width: 160,
    marginRight: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#28a745",
    marginTop: 6,
  },
  shopName: {
    fontSize: 13,
    color: "#888",
  },
});
