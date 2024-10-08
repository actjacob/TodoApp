import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../Colors";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default class ToDoModal extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({
        title: this.state.newTodo,
        completed: false,
      });
      this.props.updateList(list);
    }

    this.setState({
      newTodo: "",
    });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <Swipeable
        renderRightActions={(progress) => this.rightActions(progress, index)}
      >
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? "square" : "square-outline"}
              size={24}
              color={colors.gray}
              style={{
                width: 32,
              }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: todo.completed ? "line-through" : "none",
                color: todo.completed ? colors.gray : colors.white, // Change text color
                textShadowColor: "rgba(0, 0, 0, 1)", // Add text shadow
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,

                // color: todo.completed ? colors.gray : colors.black,
                // //this.state.color
              },
            ]}
          >
            {todo.title}{" "}
          </Text>
        </View>
      </Swipeable>
    );
  };

  rightActions = (progress, index) => {
    const scale = progress.interpolate({
      inputRange: [-10, 1],
      outputRange: [1, 0.95],
      extrapolate: "clamp",
    });

    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.99],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <Animated.View
          style={[
            styles.deleteButton,
            {
              opacity: opacity,
            },
          ]}
        >
          <Animated.Text
            style={{
              color: Colors.white,
              fontWeight: "800",
              transform: [
                {
                  scale,
                },
              ],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <ImageBackground
        source={require("../image/fairy_bulutumsu.jpg")}
        style={styles.backgroundImage} // 4. Apply style for background image
      >
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior="height"
          >
            <SafeAreaView style={styles.container}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 24,
                  right: 32,
                  zIndex: 10,
                }}
                onPress={this.props.closeModal}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={Colors.black}
                ></AntDesign>
              </TouchableOpacity>

              <View
                style={[
                  styles.section,
                  styles.header,
                  {
                    borderBottomColor: list.color,
                  },
                ]}
              >
                <View>
                  <Text style={styles.title}> {list.name} </Text>
                  <Text style={styles.taskCount}>
                    {completedCount} of {taskCount} tasks{" "}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.section,
                  {
                    flex: 3,
                    marginVertical: 16,
                  },
                ]}
              >
                <FlatList
                  data={list.todos}
                  renderItem={({ item, index }) => this.renderTodo(item, index)}
                  keyExtractor={(item) => item.title}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View style={[styles.section, styles.footer]}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: list.color,
                    },
                  ]}
                  onChangeText={(text) =>
                    this.setState({
                      newTodo: text,
                    })
                  }
                  value={this.state.newTodo}
                />
                <TouchableOpacity
                  style={[
                    styles.addTodo,
                    {
                      backgroundColor: list.color,
                    },
                  ]}
                  onPress={() => this.addTodo()}
                >
                  <AntDesign name="plus" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    marginBottom: 18,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center  ",
    marginBottom: 18,
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
  },

  todo: {
    color: colors.red,
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
