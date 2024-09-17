import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ToDoModal from "./ToDoModal";
import CustomAlert from "./CustomAlert";
import Colors from "../Colors";

const TodoList = ({ list, updateList, deleteList }) => {
  const [showListVisible, setShowListVisible] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const toggleListModal = () => {
    setShowListVisible((prev) => !prev);
  };

  const handleLongPress = () => {
    setShowCustomAlert(true);
  };

  const handleConfirmDelete = () => {
    deleteList(list.id);
    setShowCustomAlert(false); // Close the custom alert
  };

  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={toggleListModal}
      >
        <ToDoModal
          list={list}
          closeModal={toggleListModal}
          updateList={updateList}
        />
      </Modal>

      <CustomAlert
        visible={showCustomAlert}
        onClose={() => setShowCustomAlert(false)}
        onConfirm={handleConfirmDelete}
      />

      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={toggleListModal}
        onLongPress={handleLongPress}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={styles.statsContainer}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 40,
    fontWeight: "200",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.white,
  },
  statsContainer: {
    alignItems: "center",
  },
});

export default TodoList;
