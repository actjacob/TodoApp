// CustomAlert.js
import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const CustomAlert = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Delete List</Text>
          <Text style={styles.alertMessage}>
            Silmek istediğine emin misin Badem Gözlü?
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#999" />
            <Button title="Delete" onPress={onConfirm} color="#d9534f" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)", // Koyu gölge
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CustomAlert;
