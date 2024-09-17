import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";

const STORAGE_KEY = "@todo_lists";

const App = () => {
  const [lists, setLists] = useState([]);
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const storedLists = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load lists");
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);
  const saveLists = async (newLists) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLists));
    } catch (error) {
      Alert.alert("Error", "Failed to save lists");
    }
  };

  const toggleAddTodoModal = () => {
    setAddTodoVisible((prevState) => !prevState);
  };

  const renderList = ({ item }) => {
    return (
      <TodoList list={item} updateList={updateList} deleteList={deleteList} />
    );
  };

  const addList = (list) => {
    const updatedLists = [
      ...lists,
      {
        ...list,
        id: lists.length + 1,
        todos: [],
      },
    ];
    setLists(updatedLists);
    saveLists(updatedLists);
  };

  const updateList = (updatedList) => {
    const updatedLists = lists.map((item) =>
      item.id === updatedList.id ? updatedList : item
    );
    setLists(updatedLists);
    saveLists(updatedLists);
  };

  const deleteList = (listId) => {
    const filteredLists = lists.filter((list) => list.id !== listId);
    setLists(filteredLists);
    saveLists(filteredLists);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleAddTodoModal}
      >
        <AddListModal closeModal={toggleAddTodoModal} addList={addList} />
      </Modal>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo
          <Text
            style={{
              fontWeight: "300",
              color: colors.blue,
            }}
          >
            Lists
          </Text>
        </Text>

        <View style={styles.divider} />
      </View>
      <View
        style={{
          marginVertical: 48,
        }}
      >
        <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
          <AntDesign name="plus" size={16} color={colors.blue}></AntDesign>
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>

      <View
        style={{
          height: 275,
          paddingLeft: 32,
        }}
      >
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderList}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
