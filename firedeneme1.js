// Fire.js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase config'i buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyA9xl6NBNcirYbYEnVbnLYUSerD37lAnkk",
  authDomain: "todoapp-39c94.firebaseapp.com",
  projectId: "todoapp-39c94",
  storageBucket: "todoapp-39c94.appspot.com",
  messagingSenderId: "631333258609",
  appId: "1:631333258609:web:11b08461cea46b1673a2d0",
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

  getLists(callback) {
    let ref = firebase.firestore().collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      let lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = firebase.firestore().collection("lists");
    ref.add(list);
  }

  deleteList(list) {
    let ref = firebase.firestore().collection("lists");
    ref.doc(list.id).delete();
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
