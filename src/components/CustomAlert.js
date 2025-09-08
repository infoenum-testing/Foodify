import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomAlert = ({ visible, title, message, onClose, onConfirm, showCancel = true }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttons}>
                        {showCancel && (
                            <TouchableOpacity
                                style={[styles.button, styles.cancelBtn]}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        )}

                        {onConfirm && (
                            <TouchableOpacity
                                style={[styles.button, styles.okBtn]}
                                onPress={() => {
                                    onConfirm();
                                    onClose && onClose();
                                }}
                            >
                                <Text style={styles.okText}>OK</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    container: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        color: "#1a1a1a",
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        color: "#444",
        marginBottom: 20,
        lineHeight: 22,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        flex: 1, // equal width for both
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelBtn: {
        backgroundColor: "#f0f0f0",
    },
    okBtn: {
        backgroundColor: "#2382AA",
    },

    okText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default CustomAlert;
