import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "@firebase/firestore";
import getLists from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9xl6NBNcirYbYEnVbnLYUSerD37lAnkk",
  authDomain: "todoapp-39c94.firebaseapp.com",
  databaseURL: "https://todoapp-39c94-default-rtdb.firebaseio.com",
  projectId: "todoapp-39c94",
  storageBucket: "todoapp-39c94.appspot.com",
  messagingSenderId: "631333258609",
  appId: "1:631333258609:web:eec92067c3fd771173a2d0",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
}

export default Fire;
