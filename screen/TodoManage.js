import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { storeTodo } from "../Util/Http";

function TodoManage() {
  const [todo, setTodo] = useState({
    todoList: "",
    todoDescription: "",
    todoName: "",
  });

  function inputChangeHandler(inputIdetifier, enteredValue) {
    setTodo((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdetifier]: enteredValue,
      };
    });
    console.log(todo);
  }

  const handleCreateTodo = () => {
    storeTodo(todo);
  };
  return (
    <View>
      <View>
        <TextInput placeholder="todoList" onChangeText={(value) => inputChangeHandler("todoList", value)}></TextInput>
      </View>

      <View>
        <TextInput placeholder="todoDescription" onChangeText={(value) => inputChangeHandler("todoDescription", value)}></TextInput>
      </View>
      <View>
        <TextInput placeholder="todoName" onChangeText={(value) => inputChangeHandler("todoName", value)}></TextInput>
      </View>
      <Button title="Save" onPress={handleCreateTodo}></Button>
    </View>
  );
}

export default TodoManage;
