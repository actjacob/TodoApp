import axios from "axios";

const Base_Url = "https://todoapp-39c94-default-rtdb.firebaseio.com";

export function storeTodo(todoData) {
  axios.post(`${Base_Url}/todoapps.json`, todoData);
}

export async function fetchTodos() {
  var response = await axios.get(Base_Url + "/todoapps.json");
  const todoapps = [];
  for (var key in response.data) {
    todoapps = {
      key: key,
    };
  }
}
