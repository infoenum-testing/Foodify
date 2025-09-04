// src/components/SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

const SearchBar = ({ value, onChangeText, placeholder = "Search..." }) => {
    return (
        <View style={styles.searchContainer}>
            <Image
                source={require('../../Assets/Images/search.png')}
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#888"
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 30,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        height: 48,
        paddingHorizontal: 12,
    },
    searchIcon: {
        width: 30,
        height: 30,
        tintColor: "#888",
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});
