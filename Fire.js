// import   firebase from "firebase";
import "@firebase/firestore";
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9xl6NBNcirYbYEnVbnLYUSerD37lAnkk",
  authDomain: "todoapp-39c94.firebaseapp.com",
  databaseURL: "https://todoapp-39c94-default-rtdb.firebaseio.com",
  projectId: "todoapp-39c94",
  storageBucket: "todoapp-39c94.appspot.com",
  messagingSenderId: "631333258609",
  appId: "1:631333258609:web:eec92067c3fd771173a2d0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("User is signed in:", user);
    //   } else {
    //     // Anonim olarak oturum aç
    //     signInAnonymously(auth)
    //       .then(() => {
    //         console.log("Signed in anonymously");
    //       })
    //       .catch((error) => {
    //         console.error("Error signing in anonymously:", error);
    //       });
    //   }
    // });
  }
}

export default Fire;
