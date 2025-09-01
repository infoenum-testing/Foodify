// src/components/SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({ value, onChangeText, placeholder = "Search..." }) => {
    return (
        <View style={styles.searchContainer}>
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
        paddingHorizontal: 20,
        marginBottom: 15
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 48,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
});
